import { FC } from "react";
import { Link, SxProps, Theme, Tooltip } from "@mui/material";
import { useWeb3React } from "@web3-react/core";

import { networks } from "@gemunion/provider-wallet";

export interface IAddressLinkProps {
  address?: string;
  length?: number;
  sx?: SxProps<Theme>;
}

export const AddressLink: FC<IAddressLinkProps> = props => {
  const { address = "", length = 34, sx = [] } = props;

  const { chainId = 1 } = useWeb3React();

  if (!address) {
    return null;
  }

  return (
    <Tooltip title={address}>
      <Link target={"_blank"} href={`${networks[chainId].blockExplorerUrls[0]}/address/${address}`} sx={sx}>
        {address.substr(0, length).concat("...")}
      </Link>
    </Tooltip>
  );
};
