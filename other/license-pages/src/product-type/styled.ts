import { Box, Button, Card, CardContent, Grid2, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCardsWrapper = styled(Grid2)(({ theme }) => ({
  marginLeft: theme.spacing(-4),
  width: `calc(100% + ${theme.spacing(4)}px)`,
}));

export const StyledCardWrapper = styled(Grid2)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "auto",
  marginTop: theme.spacing(2),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "15px",
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(2),
  display: "flex",
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export const StyledCardContent = styled(CardContent)({
  textAlign: "center",
  display: "flex",
  flex: 1,
  height: "auto",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const TitleTypography = styled(Typography)(({ theme }) => ({
  color: "#222529",
  marginBottom: theme.spacing(1),
  fontFamily: "'Roboto', sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: 21,
    marginBottom: theme.spacing(2),
  },
}));

export const Divider = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, "auto", 6),
  height: 4,
  width: 100,
  background: "#3479F6",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(1, "auto", 3),
  },
}));

export const FeaturesWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "fit-content",
  margin: theme.spacing(0, "auto", 3, "auto"),
  textAlign: "left",
}));

export const SubscribeButton = styled(Button)(({ theme }) => ({
  marginTop: "auto",
  marginBottom: theme.spacing(1),
  fontFamily: "'Roboto', sans-serif",
  color: "#3479F6",
  backgroundColor: "#fff",
  border: "1px solid #3479F6",
  borderRadius: "32px",
  boxShadow: "none",
  padding: theme.spacing(1, 3),
  "&:hover": {
    color: "#FFF",
    backgroundColor: "#3479F6",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(2),
  },
})) as typeof Button;
