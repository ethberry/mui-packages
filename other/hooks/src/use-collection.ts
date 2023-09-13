import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { get } from "react-hook-form";
import { parse, stringify } from "qs";

import { defaultItemsPerPage } from "@gemunion/constants";
import { ApiError } from "@gemunion/provider-api";
import { IIdBase, IPaginationResult, IPaginationDto, ISortDto, IMuiSortDto } from "@gemunion/types-collection";

import { useApiCall } from "./use-api-call";
import { useDeepCompareEffect } from "./use-deep-compare-effect";
import { decoder, deepEqual } from "./utils";

export interface IHandleChangePaginationModelProps {
  page: number;
  pageSize: number;
}

export interface ICollectionHook<T, S> {
  baseUrl: string;
  embedded?: boolean;
  empty?: Partial<T>;
  search?: Partial<S>;
  order?: ISortDto<T>[];
  filter?: (data: Partial<T>) => any;
  redirect?: (baseUrl: string, search: Omit<S, "skip" | "take" | "order">, id?: number) => string;
  awaitingFieldsNames?: string[];
}

const defaultFilter = <T extends IIdBase>({ id: _id, ...rest }: Partial<T>) => rest;
const defaultRedirect = <S extends IPaginationDto>(
  baseUrl: string,
  search: Omit<S, "skip" | "take" | "order">,
  id?: number,
) => (id ? `${baseUrl}/${id}` : `${baseUrl}?${stringify(search)}`);

export const useCollection = <
  T extends IIdBase = IIdBase,
  S extends IPaginationDto & Partial<IMuiSortDto<T>> = IPaginationDto & Partial<IMuiSortDto<T>>,
>(
  options: ICollectionHook<T, S>,
) => {
  const {
    empty = {},
    search: data = {},
    baseUrl,
    embedded,
    filter = defaultFilter,
    redirect = defaultRedirect,
    awaitingFieldsNames,
  } = options;

  const { id } = embedded ? { id: "" } : useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFilterOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [didMount, setDidMount] = useState(false);

  const [rows, setRows] = useState<Array<T>>([]);
  const [count, setCount] = useState<number>(0);
  const [selected, setSelected] = useState<T>(empty as T);

  const getSearchParams = (data: Partial<S>) => {
    const search = parse(location.search.substring(1), { decoder });
    return Object.entries(data).reduce(
      (memo, [key, value]) => Object.assign(memo, { [key]: search[key] ?? value }),
      {} as S,
    );
  };

  const [search, setSearch] = useState<S>(
    getSearchParams({
      skip: 0,
      take: defaultItemsPerPage,
      ...data,
    } as Partial<S>),
  );

  const updateQS = async (id?: number) => {
    const { skip: _skip, take: _take, order: _order, ...rest } = search;
    const sameSearch = !id && location.search && deepEqual(rest, getSearchParams(data));
    const previousPathname = location.pathname;

    if (embedded || sameSearch) {
      return;
    }

    const shouldReplace = !location.search || location.search === "?" || !id;

    navigate(redirect(baseUrl, rest, id), {
      replace: shouldReplace,
    });

    return new Promise(resolve => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (location.pathname !== previousPathname) {
        resolve(true);
      }
    });
  };

  const { fn: fetchByQueryFn } = useApiCall(
    api => {
      return api.fetchJson({
        url: baseUrl,
        data: search,
      });
    },
    { success: false, error: false },
  );

  const fetchByQuery = async (): Promise<void> => {
    return fetchByQueryFn().then((json: IPaginationResult<T>) => {
      setRows(json.rows);
      setCount(json.count);
      void updateQS();
    });
  };

  const { fn: fetchByIdFn } = useApiCall(
    (api, id: string) => {
      return api.fetchJson({
        url: `${baseUrl}/${id}`,
      });
    },
    { success: false, error: false },
  );

  const fetchById = async (id: string): Promise<void> => {
    return fetchByIdFn(undefined, id).then((json: T) => {
      setRows([json]);
      setCount(1);
      setSelected(json);
      setIsEditDialogOpen(true);
      setIsViewDialogOpen(true);
    });
  };

  const fetch = async (id?: string): Promise<void> => {
    setIsLoading(true);
    return (id ? fetchById(id) : fetchByQuery())
      .catch((e: ApiError) => {
        if (e.status) {
          const errors = e.getLocalizedValidationErrors();

          Object.keys(errors).forEach((key: string) => {
            const label = formatMessage({ id: `form.labels.${key.split(".").pop() as string}` });
            const message = formatMessage({ id: errors[key] }, { label });
            enqueueSnackbar(message, { variant: "error" });
          });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      })
      .finally(() => {
        setIsLoading(false);
        setDidMount(true);
      });
  };

  const handleCreate = (): void => {
    setSelected(empty as T);
    setIsEditDialogOpen(true);
  };

  const handleView = (item: T): (() => void) => {
    return (): void => {
      setSelected(item);
      setCount(1);
      setIsViewDialogOpen(true);
      void updateQS(item.id);
    };
  };

  const handleViewConfirm = (): void => {
    setIsViewDialogOpen(false);
    void updateQS();
  };

  const handleViewCancel = (): void => {
    void updateQS().then(value => {
      if (value) {
        setIsViewDialogOpen(false);
      }
    });
  };

  const handleEdit = (item: T): (() => void) => {
    return (): void => {
      setSelected(item);
      setCount(1);
      setIsEditDialogOpen(true);
      void updateQS(item.id);
    };
  };

  const handleEditCancel = (): void => {
    void updateQS().then(value => {
      if (value) {
        setIsEditDialogOpen(false);
      }
    });
  };

  const { fn: handleEditConfirmFn } = useApiCall(
    (api, values: Partial<T>) => {
      const { id } = values;

      return api.fetchJson({
        url: id ? `${baseUrl}/${id}` : baseUrl,
        method: id ? "PUT" : "POST",
        data: filter(values),
      });
    },
    { success: false, error: false },
  );

  const handleEditConfirm = async (values: Partial<T>, form: any): Promise<void> => {
    return handleEditConfirmFn(form, values)
      .then(() => {
        enqueueSnackbar(formatMessage({ id: id || values.id ? "snackbar.updated" : "snackbar.created" }), {
          variant: "success",
        });
        setIsEditDialogOpen(false);
        form.reset(values);
        return fetch();
      })
      .catch((e: ApiError) => {
        if (e.status === 400) {
          const errors = e.getLocalizedValidationErrors();

          Object.keys(errors).forEach(key => {
            form.setError(key, { type: "custom", message: errors[key] }, { shouldFocus: true });
          });
        } else if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  const handleDelete = (item: T): (() => void) => {
    return (): void => {
      setSelected(item);
      setIsDeleteDialogOpen(true);
    };
  };

  const handleDeleteCancel = (): void => {
    setIsDeleteDialogOpen(false);
  };

  const { fn: handleDeleteConfirmFn } = useApiCall(
    (api, item: T) => {
      return api.fetchJson({
        url: `${baseUrl}/${item.id}`,
        method: "DELETE",
      });
    },
    { success: false, error: false },
  );

  const handleDeleteConfirm = (item: T): Promise<void> => {
    return handleDeleteConfirmFn(undefined, item)
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.deleted" }), { variant: "success" });
        return fetch();
      })
      .catch((e: ApiError) => {
        if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      })
      .finally(() => {
        setIsDeleteDialogOpen(false);
      });
  };

  const handleRefreshPage = async () => {
    if (didMount) {
      await fetch(id);
    }
  };

  const handleChangePage = (_e: ChangeEvent<unknown>, page: number) => {
    setSearch({
      ...search,
      skip: (page - 1) * search.take,
    });
  };

  const handleChangeRowsPerPage = (pageSize: number): void => {
    setSearch({
      ...search,
      skip: 0,
      take: pageSize,
    });
  };

  const handleChangePaginationModel = ({ page, pageSize }: IHandleChangePaginationModelProps): void => {
    setSearch({
      ...search,
      skip: page * pageSize,
      take: pageSize,
    });
  };

  const handleSearch = (values: S): Promise<void> => {
    setSearch({
      ...values,
      skip: 0,
      take: search.take,
    });

    // to promisify searching for the form onSubmit function
    return Promise.resolve();
  };

  const handleChangeSortModel = (sortModel: ISortDto<T>[]): void => {
    setSearch({
      ...search,
      order: sortModel,
    });
  };

  const handleToggleFilters = () => {
    setIsFilterOpen(!isFiltersOpen);
  };

  useDeepCompareEffect(() => {
    if (!id) {
      setIsEditDialogOpen(false);
      setIsViewDialogOpen(false);
    }

    if (awaitingFieldsNames && awaitingFieldsNames.some(fieldName => get(search, fieldName) === 0)) {
      return;
    }

    void fetch(id);
  }, [search, id, awaitingFieldsNames]);

  useDeepCompareEffect(() => {
    setSearch(getSearchParams(search));
  }, [location]);

  return {
    rows,
    count,
    search,
    selected,

    isLoading,
    isFiltersOpen,
    isViewDialogOpen,
    isDeleteDialogOpen,
    isEditDialogOpen,

    fetch,
    fetchById,
    fetchByQuery,

    handleCreate,
    handleView,
    handleViewCancel,
    handleViewConfirm,
    handleEdit,
    handleEditCancel,
    handleEditConfirm,
    handleDelete,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleSearch,
    handleRefreshPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangePaginationModel,
    handleChangeSortModel,
    handleToggleFilters,
  };
};
