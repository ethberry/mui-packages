import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

import { Spinner } from "../spinner";

export interface IProgressOverlayProps {
  isLoading: boolean;
}

export const ProgressOverlay: FC<PropsWithChildren<IProgressOverlayProps>> = props => {
  const { isLoading, children } = props;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: 40,
      }}
    >
      {children}
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </Box>
      ) : null}
    </Box>
  );
};
