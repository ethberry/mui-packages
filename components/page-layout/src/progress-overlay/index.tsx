import { Box, SxProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";

import { Spinner } from "../spinner";

export interface IProgressOverlayProps {
  isLoading: boolean;
  wrapperSx?: SxProps;
  spinnerSx?: SxProps;
}

export const ProgressOverlay: FC<PropsWithChildren<IProgressOverlayProps>> = props => {
  const { isLoading, children, wrapperSx = {}, spinnerSx = {} } = props;

  return (
    <Box
      sx={[
        {
          position: "relative",
          minHeight: 40,
        },
        ...(Array.isArray(wrapperSx) ? wrapperSx : [wrapperSx]),
      ]}
    >
      {children}
      {isLoading ? (
        <Box
          sx={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            ...(Array.isArray(spinnerSx) ? spinnerSx : [spinnerSx]),
          ]}
        >
          <Spinner />
        </Box>
      ) : null}
    </Box>
  );
};
