import type { ICollectionState } from "./interfaces";
import { CollectionActions } from "./interfaces";

export const emptyCollectionState: ICollectionState = {
  needRefresh: false,
  isLoading: false,
  isFiltersOpen: false,
  isViewDialogOpen: false,
  isEditDialogOpen: false,
  isDeleteDialogOpen: false,
  action: CollectionActions.search,
  didMount: false,
  search: {},
  rows: [],
  count: 0,
  selected: {},
};
