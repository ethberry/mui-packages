import React, { FC, useState, MouseEvent } from "react";

import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { TextInput, ITextInputProps } from "../text";
import { useStyles } from "./styles";

export type IPasswordInputProps = ITextInputProps;

export const PasswordInput: FC<IPasswordInputProps> = props => {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  const handleClick = (e: MouseEvent): void => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <TextInput
      classes={classes}
      type={show ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton href="#" onClick={handleClick}>
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
