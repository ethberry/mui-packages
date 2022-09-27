import { FC, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export interface IBreadcrumbsProps {
  path: Array<string> | Record<string, string>;
  isHidden?: boolean;
  data?: Array<any>;
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = props => {
  const { path, isHidden, data = [] } = props;

  if (isHidden) {
    return null;
  }

  const mappedPath = useMemo(
    () =>
      Array.isArray(path)
        ? path.map(item => ({ path: item, title: item }))
        : Object.keys(path).map(key => ({
            path: path[key],
            title: key,
          })),
    [path],
  );

  return (
    <MuiBreadcrumbs aria-label="breadcrumbs">
      {mappedPath.map(({ path, title }, i) => {
        if (i === mappedPath.length - 1) {
          return (
            <Typography color="textPrimary" key={i}>
              <FormattedMessage id={`pages.${title}.title`} values={data[i]} />
            </Typography>
          );
        }
        return (
          <Link color="inherit" component={RouterLink} to={`/${path}`} key={i}>
            <FormattedMessage id={`pages.${title}.title`} values={data[i]} />
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};
