import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export interface IBreadcrumbsProps {
  path: Array<string>;
  isHidden?: boolean;
  data?: Array<any>;
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = props => {
  const { path, isHidden, data = [] } = props;

  if (isHidden) {
    return null;
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumbs">
      {path.map((e, i) => {
        if (i === path.length - 1) {
          return (
            <Typography color="textPrimary" key={i}>
              <FormattedMessage id={`pages.${e}.title`} values={data[i]} />
            </Typography>
          );
        }
        return (
          <Link color="inherit" component={RouterLink} to={`/${e.replace(".", "-")}`} key={i}>
            <FormattedMessage id={`pages.${e}.title`} values={data[i]} />
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};
