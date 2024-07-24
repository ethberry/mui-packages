export enum CollectionActions {
  edit = "edit",
  view = "view",
  delete = "delete",
  search = "search",
}

export interface ICollectionState<T = any, S = any> {
  needRefresh: boolean;
  isLoading: boolean;
  isFiltersOpen: boolean;
  isViewDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  action: CollectionActions;
  didMount: boolean;
  search: S;
  rows: Array<T>;
  count: number;
  selected: T;
}
