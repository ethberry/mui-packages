import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { parse, stringify } from "qs";

import { defaultItemsPerPage } from "@gemunion/constants";
import { ApiError, useApi } from "@gemunion/provider-api";
import { useLicense } from "@gemunion/provider-license";
import { IIdBase, IPaginationResult, IPaginationDto } from "@gemunion/types-collection";

import { useDeepCompareEffect } from "./use-deep-compare-effect";
import { decoder, deepEqual } from "./utils";

export interface ICollectionHook<T, S> {
  baseUrl: string;
  embedded?: boolean;
  empty?: Partial<T>;
  search?: Partial<S>;
  filter?: (data: Partial<T>) => any;
  redirect?: (baseUrl: string, search: Omit<S, "skip" | "take">, id?: number) => string;
}

const defaultFilter = <T extends IIdBase>({ id: _id, ...rest }: Partial<T>) => rest;
const defaultRedirect = <S extends IPaginationDto>(baseUrl: string, search: Omit<S, "skip" | "take">, id?: number) =>
  id ? `${baseUrl}/${id}` : `${baseUrl}?${stringify(search)}`;

export const useCollection = <T extends IIdBase = IIdBase, S extends IPaginationDto = IPaginationDto>(
  options: ICollectionHook<T, S>,
) => {
  const {
    empty = {},
    search: data = {},
    baseUrl,
    embedded,
    filter = defaultFilter,
    redirect = defaultRedirect,
  } = options;

  const { id } = embedded ? { id: "" } : useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const license = useLicense();

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const api = useApi();

  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFilterOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const updateQS = (id?: number) => {
    const { skip: _skip, take: _take, ...rest } = search;
    const sameSearch = !id && location.search && deepEqual(rest, getSearchParams(data));

    if (embedded || sameSearch) {
      return;
    }

    const shouldReplace = !location.search || location.search === "?" || !id;

    navigate(redirect(baseUrl, rest, id), {
      replace: shouldReplace,
    });
  };

  const fetchByQuery = async (): Promise<void> => {
    return api
      .fetchJson({
        url: baseUrl,
        data: search,
      })
      .then((json: IPaginationResult<T>) => {
        setRows(json.rows);
        setCount(json.count);
        updateQS();
      });
  };

  const fetchById = async (id: string): Promise<void> => {
    return api
      .fetchJson({
        url: `${baseUrl}/${id}`,
      })
      .then((json: T) => {
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
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      })
      .finally(() => {
        setIsLoading(false);
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
      updateQS(item.id);
    };
  };

  const handleViewConfirm = (): void => {
    setIsViewDialogOpen(false);
    updateQS();
  };

  const handleViewCancel = (): void => {
    setIsViewDialogOpen(false);
    updateQS();
  };

  const handleEdit = (item: T): (() => void) => {
    return (): void => {
      setSelected(item);
      setCount(1);
      setIsEditDialogOpen(true);
      updateQS(item.id);
    };
  };

  const handleEditCancel = (): void => {
    setIsEditDialogOpen(false);
    updateQS();
  };

  const handleEditConfirm = async (values: Partial<T>, form: any): Promise<void> => {
    const { id } = values;

    return api
      .fetchJson({
        url: id ? `${baseUrl}/${id}` : baseUrl,
        method: id ? "PUT" : "POST",
        data: filter(values),
      })
      .then(() => {
        enqueueSnackbar(formatMessage({ id: id ? "snackbar.updated" : "snackbar.created" }), { variant: "success" });
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

  const handleDeleteConfirm = (item: T): Promise<void> => {
    return api
      .fetchJson({
        url: `${baseUrl}/${item.id}`,
        method: "DELETE",
      })
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

  const handleSearch = (values: S): Promise<void> => {
    setSearch({
      ...values,
      skip: 0,
      take: search.take,
    });

    // to promisify searching for the form onSubmit function
    return Promise.resolve();
  };

  const handleToggleFilters = () => {
    setIsFilterOpen(!isFiltersOpen);
  };

  useDeepCompareEffect(() => {
    if (!id) {
      setIsEditDialogOpen(false);
      setIsViewDialogOpen(false);
    }
    void fetch(id);
  }, [search, id]);

  useDeepCompareEffect(() => {
    setSearch(getSearchParams(search));
  }, [location]);

  if (!license.isValid()) {
    return null;
  }

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
    handleChangePage,
    handleChangeRowsPerPage,
    handleToggleFilters,
  };
};
