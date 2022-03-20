import { FC } from "react";
import { Badge } from "@mui/material";
import { Check } from "@mui/icons-material";

export interface ICustomBadgeProps {
  invisible: boolean;
}

export const CustomBadge: FC<ICustomBadgeProps> = props => {
  const { invisible, children } = props;

  return (
    <Badge
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      color="secondary"
      overlap="circular"
      invisible={invisible}
      badgeContent={<Check sx={{ fontSize: 8 }} />}
    >
      {children}
    </Badge>
  );
};
