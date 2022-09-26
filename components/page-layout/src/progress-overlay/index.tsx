import { FC, PropsWithChildren } from "react";

import { Spinner } from "../spinner";

import { useStyles } from "./styles";

export interface IProgressOverlayProps {
  isLoading: boolean;
}

export const ProgressOverlay: FC<PropsWithChildren<IProgressOverlayProps>> = props => {
  const { isLoading, children } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {children}
      {isLoading ? (
        <div className={classes.overlay}>
          <Spinner />
        </div>
      ) : null}
    </div>
  );
};
