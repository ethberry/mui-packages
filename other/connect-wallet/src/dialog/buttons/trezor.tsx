import { FC } from "react";
import { IconButton } from "@mui/material";
import { TrezorConnector } from "@web3-react/trezor-connector";
import { useWeb3React } from "@web3-react/core";

import { TrezorIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";

export interface ITrezorButtonButtonProps {
  disabled?: boolean;
}

export const TrezorButton: FC<ITrezorButtonButtonProps> = props => {
  const { disabled } = props;

  const { activate, connector } = useWeb3React();

  const handleClick = () => {
    const connector = new TrezorConnector({
      chainId: 1,
      url: process.env.RPC_URL as string,
      pollingInterval: 12000,
      manifestEmail: "dummy@abc.xyz",
      manifestAppUrl: "http://localhost:1234",
    });
    void activate(connector, console.error);
  };

  return (
    <CustomBadge invisible={!(connector instanceof TrezorConnector)}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <TrezorIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
