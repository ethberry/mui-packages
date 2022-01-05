import { FC } from "react";
import { IconButton } from "@mui/material";
import { AuthereumConnector } from "@web3-react/authereum-connector";
import { useWeb3React } from "@web3-react/core";

import { AuthereumIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";

export interface IAuthereumButtonButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

// https://github.com/NoahZinsmeister/web3-react/blob/v6/docs/connectors/authereum.md
export const AuthereumButton: FC<IAuthereumButtonButtonProps> = props => {
  const { disabled, onClick } = props;

  const { activate, connector } = useWeb3React();

  const handleClick = () => {
    const connector = new AuthereumConnector({
      chainId: 1,
    });
    void activate(connector, console.error);
    onClick();
  };

  return (
    <CustomBadge invisible={!(connector instanceof AuthereumConnector)}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <AuthereumIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
