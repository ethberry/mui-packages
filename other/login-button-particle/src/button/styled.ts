import { Button, Menu } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(({ theme }) => ({
  justifyContent: "flex-start",
  boxShadow: "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
  color: theme.palette.text.primary,
  fontWeight: 500,
  height: "auto",
  lineHeight: "normal",
  width: "100%",
  maxWidth: 250,
  minHeight: 40,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  textTransform: "none",
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(1.5),
    marginLeft: theme.spacing(0.5),
  },
  "& .MuiButton-endIcon": {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    right: 0,
    position: "absolute",
  },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 250,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(1.5),
        marginLeft: theme.spacing(-0.5),
        width: 22,
        height: 22,
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));
