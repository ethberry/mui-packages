import { FC } from "react";
import { Link, SxProps, Theme } from "@mui/material";
import { useWeb3React } from "@web3-react/core";

import { networks } from "@gemunion/provider-wallet";

export interface ITxHashLinkProps {
  hash: string;
  sx?: SxProps<Theme>;
}

export const TxHashLink: FC<ITxHashLinkProps> = props => {
  const { hash, sx = [] } = props;

  const { chainId = 1 } = useWeb3React();

  if (!hash) {
    return null;
  }

  return (
    <Link target={"_blank"} href={`${networks[chainId].blockExplorerUrls[0]}/tx/${hash}`} sx={sx}>
      {hash.substr(0, 8).concat("...")}
    </Link>
  );
};
