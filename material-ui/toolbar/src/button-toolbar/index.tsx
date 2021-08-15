import React, { FC, Children, cloneElement, ReactElement } from "react";
import { Grid, ButtonProps } from "@material-ui/core";
import { Property } from "csstype";

import useStyles from "./styles";

export interface IButtonToolbarProps {
  className?: string;
  justifyContent?: Property.JustifyContent;
}

export const ButtonToolbar: FC<IButtonToolbarProps> = ({ children = [], ...props }) => {
  const classes = useStyles();

  const { className, justifyContent = "flex-end" } = props;
  return (
    <Grid container justifyContent={justifyContent} className={className}>
      {Children.map(children as Array<any>, (button: ReactElement<ButtonProps>) =>
        cloneElement(button, {
          className: classes[justifyContent],
        }),
      )}
    </Grid>
  );
};
