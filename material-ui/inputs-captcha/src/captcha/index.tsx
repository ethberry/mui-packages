import { FC } from "react";
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from "react-google-recaptcha";
import { FormattedMessage } from "react-intl";
import { getIn, useFormikContext } from "formik";
import { Grid, FormHelperText } from "@material-ui/core";

import { useStyles } from "./styles";

interface ICaptchaProps {
  name?: string;
}

export const Captcha: FC<ICaptchaProps> = props => {
  const { name = "captcha" } = props;

  const formik = useFormikContext<any>();
  const error = getIn(formik.errors, name);
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <ReCAPTCHA
        sitekey={process.env.GOOGLE_RECAPTCHA_PUBLIC}
        onChange={(value: string | null): void => {
          formik.setFieldValue(name, value);
        }}
      />
      {error ? (
        <FormHelperText error>
          <FormattedMessage id={error} />
        </FormHelperText>
      ) : null}
    </Grid>
  );
};
