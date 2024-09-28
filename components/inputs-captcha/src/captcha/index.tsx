import { FC } from "react";
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from "react-google-recaptcha";
import { FormattedMessage } from "react-intl";
import { Controller, get, useFormContext } from "react-hook-form";
import { Grid, FormHelperText } from "@mui/material";

import { useTestId } from "@ethberry/provider-test-id";

interface ICaptchaProps {
  name?: string;
}

export const Captcha: FC<ICaptchaProps> = props => {
  const { name = "captcha" } = props;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);

  /* javascript-obfuscator:disable */
  const siteKey = process.env.GOOGLE_RECAPTCHA_PUBLIC;
  /* javascript-obfuscator:enable */

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Grid sx={{ my: 1 }}>
          <ReCAPTCHA
            sitekey={siteKey}
            {...field}
            onChange={(value: string | null): void => {
              form.setValue(name, value);
            }}
            {...testIdProps}
          />
          {error ? (
            <FormHelperText error>
              <FormattedMessage id={error.message} />
            </FormHelperText>
          ) : null}
        </Grid>
      )}
    />
  );
};
