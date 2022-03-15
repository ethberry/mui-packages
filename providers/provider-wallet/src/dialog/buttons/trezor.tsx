import { FC } from "react";
import { IconButton } from "@mui/material";
import { TrezorConnector } from "@web3-react/trezor-connector";
import { useWeb3React } from "@web3-react/core";

import { TrezorIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";
// import { Connectors } from "../../connectors";

export interface ITrezorButtonButtonProps {
  disabled?: boolean;
}

// https://github.com/NoahZinsmeister/web3-react/blob/v6/docs/connectors/trezor.md
export const TrezorButton: FC<ITrezorButtonButtonProps> = props => {
  const { disabled } = props;

  const { connector } = useWeb3React();

  const handleClick = () => {
    // void activate(Connectors.TREZOR, console.error);
  };

  return (
    <CustomBadge invisible={!(connector instanceof TrezorConnector)}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <TrezorIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
