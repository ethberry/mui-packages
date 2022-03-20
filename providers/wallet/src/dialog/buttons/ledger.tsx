import { FC } from "react";
import { IconButton } from "@mui/material";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { useWeb3React } from "@web3-react/core";

import { LedgerIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";
// import { Connectors } from "../../connectors";

export interface ILedgerButtonButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

// https://github.com/NoahZinsmeister/web3-react/blob/v6/docs/connectors/ledger.md
export const LedgerButton: FC<ILedgerButtonButtonProps> = props => {
  const { disabled, onClick } = props;

  const { connector } = useWeb3React();

  const handleClick = () => {
    // void activate(Connectors.LEDGER, console.error);
    onClick();
  };

  return (
    <CustomBadge invisible={!(connector instanceof LedgerConnector)}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <LedgerIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
