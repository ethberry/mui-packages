import { FC } from "react";
import { IconButton } from "@mui/material";
import { UserRejectedRequestError, WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";

import { WalletConnectIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";

export interface IWalletConnectButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

// https://github.com/NoahZinsmeister/web3-react/blob/v6/docs/connectors/walletconnect.md
export const WalletConnectButton: FC<IWalletConnectButtonProps> = props => {
  const { disabled, onClick } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { activate, active, error, connector } = useWeb3React();

  if (error instanceof UserRejectedRequestError) {
    enqueueSnackbar(error.message, { variant: "warning" });
  }

  const handleClick = async () => {
    const connector = new WalletConnectConnector({
      // supportedChainIds: Object.values(networkToChainId),
      rpc: {
        1: "https://eth-mainnet.alchemyapi.io/v2/YlMZbDxnEu4zQyO0hIn-xFdTnpb_HJrf",
        10: "https://opt-mainnet.g.alchemy.com/v2/GmIPLovemNAYykzfC",
        56: "https://dataseed1.binance.org/",
        137: "https://polygon-mainnet.g.alchemy.com/v2/HQLrgXRp7sZQHqecDe2Ljcvug2JHVp0q",
        42161: "https://arb-mainnet.g.alchemy.com/v2/GmIPLovemNAYykzfCeeioOJNVFG8gxTd",
      },
      qrcode: true,
    });
    await activate(connector);
    onClick();
  };

  return (
    <CustomBadge invisible={!active || !(connector instanceof WalletConnectConnector)}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <WalletConnectIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
