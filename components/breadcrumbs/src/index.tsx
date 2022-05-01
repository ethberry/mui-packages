import { FC, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export interface IBreadcrumbsProps {
  path: Array<string>;
  isHidden?: boolean;
  values?: Array<Record<string, ReactNode>>;
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = props => {
  const { path, isHidden, values = [] } = props;

  if (isHidden) {
    return null;
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumbs">
      {path.map((e, i) => {
        if (i === path.length - 1) {
          return (
            <Typography color="textPrimary" key={i}>
              <FormattedMessage id={`pages.${e}.title`} values={values[i]} />
            </Typography>
          );
        }
        return (
          <Link color="inherit" component={RouterLink} to={`/${e}`} key={i}>
            <FormattedMessage id={`pages.${e}.title`} values={values[i]} />
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};
