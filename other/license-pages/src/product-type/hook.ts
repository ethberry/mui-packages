import { useIntl } from "react-intl";

export interface IUseProductTypesProps {
  internal: boolean;
}

export const useProductTypes = (props: IUseProductTypesProps) => {
  const { internal } = props;
  const { formatMessage } = useIntl();

  return [
    {
      title: formatMessage({ id: "components.productTypes.saas.title" }),
      text: formatMessage({ id: "components.productTypes.saas.text" }),
      link: internal ? "/calculator-saas" : `${process.env.GEMUNION_URL}/calculator-saas`,
      linkTitle: formatMessage({ id: "components.productTypes.saas.linkTitle" }),
    },
    {
      title: formatMessage({ id: "components.productTypes.selfHosted.title" }),
      text: formatMessage({ id: "components.productTypes.selfHosted.text" }),
      link: internal ? "/calculator" : `${process.env.GEMUNION_URL}/calculator`,
      linkTitle: formatMessage({ id: "components.productTypes.selfHosted.linkTitle" }),
    },
    {
      title: formatMessage({ id: "components.productTypes.enterprise.title" }),
      text: formatMessage({ id: "components.productTypes.enterprise.text" }),
      link: internal ? "/contact-enterprise" : `${process.env.GEMUNION_URL}/contact-enterprise`,
      linkTitle: formatMessage({ id: "components.productTypes.enterprise.linkTitle" }),
    },
  ];
};
