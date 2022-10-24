import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)`
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  color: #757575;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  height: auto;
  line-height: normal;
  letter-spacing: normal;
  max-width: 220px;
  min-height: 40px;
  padding: 8px;
  text-transform: none;
  & .MuiButton-startIcon {
    margin-right: 8px;
    margin-left: -8px;
  }
  & .MuiButton-startIcon svg {
    font-size: 24px;
    margin-right: 2px;
    margin-left: -4px;
  }
`;
