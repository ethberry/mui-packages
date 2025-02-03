import { FC, Children, cloneElement, ReactElement, PropsWithChildren } from "react";
import { Grid2, ButtonProps } from "@mui/material";
import { Property } from "csstype";
import { clsx } from "clsx";

import { useStyles } from "./styles";

export interface IButtonToolbarProps {
  className?: string;
  justifyContent?: Property.JustifyContent;
}

export const ButtonToolbar: FC<PropsWithChildren<IButtonToolbarProps>> = props => {
  const { children, className, justifyContent = "flex-end" } = props;

  const classes = useStyles();

  return (
    <Grid2 container justifyContent={justifyContent} className={className}>
      {Children.map(children as Array<any>, (button: ReactElement<ButtonProps>) =>
        cloneElement(button, {
          className: clsx(classes[justifyContent], button.props.className),
        }),
      )}
    </Grid2>
  );
};
