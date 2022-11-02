import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const StyledPlaceholder = styled(Box)`
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledIcon = styled(Box)`
  width: 100% !important;
  height: 100% !important;
  border: #d7d7d7 3px dashed;
  color: #d7d7d7;
`;
