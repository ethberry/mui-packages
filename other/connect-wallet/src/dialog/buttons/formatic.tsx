import { FC } from "react";
import { IconButton } from "@mui/material";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { useWeb3React } from "@web3-react/core";

import { FortmaticIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";

export interface IFortmaticButtonButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

// https://github.com/NoahZinsmeister/web3-react/blob/v6/docs/connectors/fortmatic.md
export const FortmaticButton: FC<IFortmaticButtonButtonProps> = props => {
  const { disabled, onClick } = props;

  const { activate, connector } = useWeb3React();

  const handleClick = () => {
    const connector = new FortmaticConnector({
      apiKey: "",
      chainId: 1,
    });
    void activate(connector, console.error);
    onClick();
  };

  return (
    <CustomBadge invisible={!(connector instanceof FortmaticConnector)}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <FortmaticIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
