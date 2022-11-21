import { FC } from "react";
import { Box } from "@mui/material";

import { useStyles } from "./styles";

export const Landing: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <a href="https://gemunion.io">
        <img src="/logo.png" alt="GEMUNION" className={classes.logo} />
      </a>
    </Box>
  );
};
