import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router";
import { parse, stringify } from "qs";

import { defaultItemsPerPage } from "@gemunion/constants";
import { ApiError } from "@gemunion/provider-api";
import { collectionActions, useAppDispatch, useAppSelector } from "@gemunion/redux";
import { IIdBase, IPaginationResult, IPaginationDto, ISortDto, IMuiSortDto } from "@gemunion/types-collection";

import { useApiCall } from "./use-api-call";
import { useDeepCompareEffect } from "./use-deep-compare-effect";
import { decoder, deepEqual, hasAwaited } from "./utils";

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
  } = options;

  const { id } = embedded ? { id: "" } : useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const fetchByQueryAbortController = new AbortController();

  const getSearchParams = (data: Partial<S>) => {
    const search = parse(location.search.substring(1), { decoder });
    return Object.entries(data).reduce(
      (memo, [key, value]) => Object.assign(memo, { [key]: search[key] ?? value }),
      {} as S,
    );
  };

  const {
    setIsLoading,
    setIsFilterOpen,
    setIsViewDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
    setDidMount,
    setRows,
    setCount,
    setSelected,
    setSearch,
    setNeedRefresh,
    resetState,
  } = collectionActions;
  const dispatch = useAppDispatch();

  const {
    isLoading,
    isFiltersOpen,
    isViewDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    didMount,
    count,
    rows: stateRows,
    selected: stateSelected,
    search: stateSearch,
    needRefresh,
  } = useAppSelector(state => state.collection);

  const selected = (Object.entries(stateSelected).length ? stateSelected : empty) as T;
  const [search, setLocalSearch] = useState<S>(
    getSearchParams({
      skip: 0,
      take: defaultItemsPerPage,
      ...data,
      ...stateSearch,
    } as Partial<S>),
  );

  const updateQS = (id?: number) => {
    const { skip: _skip, take: _take, order: _order, ...rest } = search;
    const sameSearch = !id && location.search && deepEqual(rest, getSearchParams(data));

    if (embedded || sameSearch) {
      return;
    }

    const shouldReplace = !location.search || location.search === "?" || !id;

    navigate(redirect(baseUrl, rest, id), {
      replace: shouldReplace,
    });
  };

  const { fn: fetchByQueryFn } = useApiCall(
    api => {
      return api.fetchJson({
        url: baseUrl,
        data: search,
        signal: fetchByQueryAbortController.signal,
      });
    },
    { success: false, error: false },
  );

  const fetchByQuery = async (): Promise<void> => {
    return fetchByQueryFn().then((json: IPaginationResult<T>) => {
      dispatch(setRows(json.rows));
      dispatch(setCount(json.count));
      updateQS();
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
      dispatch(setRows([json]));
      dispatch(setCount(1));
      dispatch(setSelected(json));
      dispatch(setIsEditDialogOpen(true));
      dispatch(setIsViewDialogOpen(true));
    });
  };

  const fetch = async (id?: string): Promise<void> => {
    dispatch(setIsLoading(true));
    return (id ? fetchById(id) : fetchByQuery())
      .catch((e: ApiError) => {
        if (e.status) {
          const errors = e.getLocalizedValidationErrors();

          Object.keys(errors).forEach((key: string) => {
            const label = formatMessage({ id: `form.labels.${key.split(".").pop() as string}` });
            const message = formatMessage({ id: errors[key] }, { label });
            enqueueSnackbar(message, { variant: "error" });
          });
        } else if (!fetchByQueryAbortController.signal.aborted) {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      })
      .finally(() => {
        dispatch(setIsLoading(false));
        dispatch(setDidMount(true));
      });
  };

  const handleCreate = (): void => {
    dispatch(setSelected(empty as T));
    dispatch(setIsEditDialogOpen(true));
  };

  const handleView = (item: T): (() => void) => {
    return (): void => {
      dispatch(setSelected(item));
      dispatch(setCount(1));
      dispatch(setIsViewDialogOpen(true));
      updateQS(item.id);
    };
  };

  const handleViewConfirm = (): void => {
    dispatch(setIsViewDialogOpen(false));
    updateQS();
  };

  const handleViewCancel = (): void => {
    dispatch(setIsViewDialogOpen(false));
    updateQS();
  };

  const handleEdit = (item: T): (() => void) => {
    return (): void => {
      dispatch(setSelected(item));
      dispatch(setCount(1));
      dispatch(setIsEditDialogOpen(true));
      updateQS(item.id);
    };
  };

  const handleEditCancel = (): void => {
    dispatch(setIsEditDialogOpen(false));
    updateQS();
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
        dispatch(setIsEditDialogOpen(false));
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
      dispatch(setSelected(item));
      dispatch(setIsDeleteDialogOpen(true));
    };
  };

  const handleDeleteCancel = (): void => {
    dispatch(setIsDeleteDialogOpen(false));
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
        dispatch(setIsDeleteDialogOpen(false));
      });
  };

  const handleRefreshPage = async () => {
    if (didMount) {
      dispatch(setNeedRefresh(true));
    }

    return Promise.resolve();
  };

  const handleChangePage = (_e: ChangeEvent<unknown>, page: number) => {
    dispatch(
      setSearch({
        ...search,
        skip: (page - 1) * search.take,
      }),
    );
  };

  const handleChangeRowsPerPage = (pageSize: number): void => {
    dispatch(
      setSearch({
        ...search,
        skip: 0,
        take: pageSize,
      }),
    );
  };

  const handleChangePaginationModel = (model: IHandleChangePaginationModelProps): void => {
    const { page, pageSize } = model;
    dispatch(
      setSearch({
        ...search,
        skip: page * pageSize,
        take: pageSize,
      }),
    );
  };

  const handleSearch = (values: S): Promise<void> => {
    dispatch(
      setSearch({
        ...values,
        skip: 0,
        take: search.take,
      }),
    );

    // to promisify searching for the form onSubmit function
    return Promise.resolve();
  };

  const handleChangeSortModel = (sortModel: ISortDto<T>[]): void => {
    dispatch(
      setSearch({
        ...search,
        order: sortModel,
      }),
    );
  };

  const handleToggleFilters = () => {
    dispatch(setIsFilterOpen(!isFiltersOpen));
  };

  useDeepCompareEffect(() => {
    setLocalSearch({
      ...getSearchParams({
        skip: 0,
        take: defaultItemsPerPage,
        ...data,
      } as Partial<S>),
      ...stateSearch,
    });
  }, [stateSearch]);

  useDeepCompareEffect(() => {
    if (!id) {
      dispatch(setIsEditDialogOpen(false));
      dispatch(setIsViewDialogOpen(false));
    }

    if (hasAwaited(search)) {
      return;
    }

    void fetch(id);

    return () => fetchByQueryAbortController.abort();
  }, [search, id]);

  useEffect(() => {
    if (didMount && needRefresh) {
      void fetch(id);
      dispatch(setNeedRefresh(false));
    }
  }, [didMount, needRefresh, id]);

  useLayoutEffect(() => {
    dispatch(setSearch(getSearchParams(data)));
  }, [location.pathname]);

  useLayoutEffect(() => {
    return () => {
      dispatch(resetState(void 0));
    };
  }, []);

  return {
    rows: stateRows as T[],
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
