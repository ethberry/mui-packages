import { useIntl } from "react-intl";

export interface IUseProductTypesProps {
  internal: boolean;
}

/* javascript-obfuscator:disable */
const portalUrl = process.env.PORTAL_URL;
/* javascript-obfuscator:enable */

export const useProductTypes = (props: IUseProductTypesProps) => {
  const { internal } = props;
  const { formatMessage } = useIntl();

  return [
    {
      title: formatMessage({ id: "components.productTypes.saas.title" }),
      text: formatMessage({ id: "components.productTypes.saas.text" }),
      link: `${internal ? "" : portalUrl}/calculator/saas`,
      linkTitle: formatMessage({ id: "components.productTypes.saas.linkTitle" }),
    },
    {
      title: formatMessage({ id: "components.productTypes.selfHosted.title" }),
      text: formatMessage({ id: "components.productTypes.selfHosted.text" }),
      link: `${internal ? "" : portalUrl}/calculator/self-hosted`,
      linkTitle: formatMessage({ id: "components.productTypes.selfHosted.linkTitle" }),
    },
    {
      title: formatMessage({ id: "components.productTypes.enterprise.title" }),
      text: formatMessage({ id: "components.productTypes.enterprise.text" }),
      link: `${internal ? "" : portalUrl}/contact/enterprise`,
      linkTitle: formatMessage({ id: "components.productTypes.enterprise.linkTitle" }),
    },
  ];
};
