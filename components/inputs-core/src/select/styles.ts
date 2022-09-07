import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),

      "& .MuiFormHelperText-root": {
        marginLeft: 0,
      },
    },
  }),
  { name: "SelectInput" },
);
