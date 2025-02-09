import { ComponentType, FC, PropsWithChildren } from "react";
import { Box, CircularProgress } from "@mui/material";

export interface IProgressOverlayProps {
  skeleton?: ComponentType;
  isLoading: boolean;
}

export const ProgressOverlay: FC<PropsWithChildren<IProgressOverlayProps>> = props => {
  const { isLoading, children, skeleton = CircularProgress } = props;

  return isLoading ? <Box sx={{ display: "block", margin: "0 auto" }} component={skeleton} /> : children;
};
