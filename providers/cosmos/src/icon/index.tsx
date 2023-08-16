import { FC } from "react";
import { AccountBalanceWallet } from "@mui/icons-material";

import { KeplrIcon } from "../dialog/wallet-icons";
import { useCosmos } from "../provider";

export const WalletIcon: FC = () => {
  const { isKeplrConnected } = useCosmos();

  switch (true) {
    case isKeplrConnected:
      return <KeplrIcon viewBox="0 0 42 42" sx={{ fontSize: 24 }} />;
    default:
      return <AccountBalanceWallet />;
  }
};
