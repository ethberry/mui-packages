import { FC } from "react";

import { Theme, useMediaQuery } from "@mui/material";

import type { ITextInputProps } from "../text";
import { TextInput } from "../text";

export type ITextAreaProps = ITextInputProps;

export const TextArea: FC<ITextAreaProps> = props => {
  const isSmallScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));

  return <TextInput multiline minRows={isSmallScreen ? 2 : 5} maxRows={Infinity} {...props} />;
};
