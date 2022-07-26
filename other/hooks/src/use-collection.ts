import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { parse, stringify } from "qs";

import { IIdBase, IPaginationResult, IPaginationDto } from "@gemunion/types-collection";
import { ApiError, useApi } from "@gemunion/provider-api";
import { defaultItemsPerPage } from "@gemunion/constants";

import { useDeepCompareEffect } from "./use-deep-compare-effect";
import { decoder } from "./utils";

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

  const [search, setSearch] = useState<S>({
    skip: 0,
    take: defaultItemsPerPage,
    ...data,
    ...parse(location.search.substring(1), { decoder }),
  } as unknown as S);

  const updateQS = (id?: number) => {
    if (embedded) {
      return;
    }
    const { skip: _skip, take: _take, ...rest } = search;
    navigate(redirect(baseUrl, rest, id));
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
        if (rows.length === 0) {
          setRows([json]);
          setCount(1);
        }
        setSelected(json);
        setIsEditDialogOpen(true);
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

  const handleView = (item: T): (() => Promise<void>) => {
    return async (): Promise<void> => {
      await fetchById(item.id.toString());
      setIsViewDialogOpen(true);
      updateQS(item.id);
    };
  };

  const handleViewConfirm = (): void => {
    setIsViewDialogOpen(false);
  };

  const handleViewCancel = (): void => {
    setIsViewDialogOpen(false);
    updateQS();
  };

  const handleEdit = (item: T): (() => Promise<void>) => {
    return async (): Promise<void> => {
      await fetchById(item.id.toString());
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
    void fetch(id);
  }, [search]);

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
