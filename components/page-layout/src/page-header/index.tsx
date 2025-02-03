import { FC, PropsWithChildren } from "react";
import { FormattedMessage } from "react-intl";
import { Grid2, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

import { ButtonToolbar } from "../button-toolbar";

export interface IPageHeader {
  message: string;
  data?: any;
  sx?: SxProps<Theme>;
}

export const PageHeader: FC<PropsWithChildren<IPageHeader>> = props => {
  const { children, message, data, sx = [] } = props;

  return (
    <Grid2
      container
      justifyContent="space-between"
      alignItems="center"
      sx={[
        {
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          mt: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Grid2 sx={{ mr: 2 }}>
        <Typography
          component="h2"
          sx={[
            theme => ({
              ...theme.typography.h4,
              lineHeight: "52px",
            }),
          ]}
        >
          <FormattedMessage id={message} values={data} />
        </Typography>
      </Grid2>

      <Grid2
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <ButtonToolbar>{children}</ButtonToolbar>
      </Grid2>
    </Grid2>
  );
};
