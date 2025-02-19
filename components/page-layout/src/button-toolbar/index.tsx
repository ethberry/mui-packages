import { FC, Children, cloneElement, ReactElement, PropsWithChildren } from "react";
import { Grid2, ButtonProps, Grid2Props } from "@mui/material";
import { Property } from "csstype";
import { clsx } from "clsx";

import { useStyles } from "./styles";

export interface IButtonToolbarProps extends Exclude<Grid2Props, "justifyContent"> {
  justifyContent?: Property.JustifyContent;
}

export const ButtonToolbar: FC<PropsWithChildren<IButtonToolbarProps>> = props => {
  const { children, className, size = 12, justifyContent = "flex-end", ...restProps } = props;

  const classes = useStyles();

  return (
    <Grid2 container size={size} justifyContent={justifyContent} className={className} {...restProps}>
      {Children.map(children as Array<any>, (button: ReactElement<ButtonProps>) =>
        cloneElement(button, {
          className: clsx(classes[justifyContent], button.props.className),
        }),
      )}
    </Grid2>
  );
};
