import { FC } from "react";
import { IconButton } from "@mui/material";
import { PortisConnector } from "@web3-react/portis-connector";
import { useWeb3React } from "@web3-react/core";

import { PortisIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";

export interface IPortisButtonButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

// https://github.com/NoahZinsmeister/web3-react/blob/v6/docs/connectors/portis.md
export const PortisButton: FC<IPortisButtonButtonProps> = props => {
  const { disabled, onClick } = props;

  const { activate, connector } = useWeb3React();

  const handleClick = () => {
    const connector = new PortisConnector({
      dAppId: "123",
      networks: [
        {
          chainId: "1",
        },
      ],
    });
    void activate(connector, console.error);
    onClick();
  };

  return (
    <CustomBadge invisible={!(connector instanceof PortisConnector)}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <PortisIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
