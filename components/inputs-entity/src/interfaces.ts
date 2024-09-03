import { ChangeEvent } from "react";

export interface IAutocompleteOption {
  id: string | number;
  title: string;

  [key: string]: string | number;
}

export interface INoContentEntity {
  controller: string;
  name: string;
  data?: Record<string, any>;
  multiple?: boolean;
  autoselect?: boolean;
  dirtyAutoselect?: boolean;
  onChange?: (
    event: ChangeEvent<unknown>,
    options: ReadonlyArray<IAutocompleteOption> | IAutocompleteOption | null,
    reason: string,
  ) => void;
}
