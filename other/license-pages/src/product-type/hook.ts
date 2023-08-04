import { useIntl } from "react-intl";

export interface IUseProductTypesProps {
  internal: boolean;
}

/* javascript-obfuscator:disable */
const gemunionUrl = process.env.GEMUNION_URL;
/* javascript-obfuscator:enable */

export const useProductTypes = (props: IUseProductTypesProps) => {
  const { internal } = props;
  const { formatMessage } = useIntl();

  return [
    {
      title: formatMessage({ id: "components.productTypes.saas.title" }),
      text: formatMessage({ id: "components.productTypes.saas.text" }),
      link: internal ? "/calculator-saas" : `${gemunionUrl}/calculator-saas`,
      linkTitle: formatMessage({ id: "components.productTypes.saas.linkTitle" }),
    },
    {
      title: formatMessage({ id: "components.productTypes.selfHosted.title" }),
      text: formatMessage({ id: "components.productTypes.selfHosted.text" }),
      link: internal ? "/calculator" : `${gemunionUrl}/calculator`,
      linkTitle: formatMessage({ id: "components.productTypes.selfHosted.linkTitle" }),
    },
    {
      title: formatMessage({ id: "components.productTypes.enterprise.title" }),
      text: formatMessage({ id: "components.productTypes.enterprise.text" }),
      link: internal ? "/contact-enterprise" : `${gemunionUrl}/contact-enterprise`,
      linkTitle: formatMessage({ id: "components.productTypes.enterprise.linkTitle" }),
    },
  ];
};
