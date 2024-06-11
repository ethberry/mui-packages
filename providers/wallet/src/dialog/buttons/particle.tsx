import { FC, useState } from "react";
import { Box, Collapse } from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";

import { CustomBadge } from "../custom-badge";
import { useConnectParticle } from "../../hooks";
import { hooks } from "../../connectors/particle";
import type { IWalletButtonProps } from "./interfaces";
import { ParticleIcon } from "../wallet-icons";
import { StyledIconButton } from "./styled";

export const ParticleButton: FC<IWalletButtonProps> = props => {
  const { disabled, onClick, badgeProps = {} } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(value => !value);
  };

  const isActive = hooks?.useIsActive?.();
  const handleClick = useConnectParticle({ onClick });

  return (
    <>
      <CustomBadge invisible={!isActive} badgeProps={badgeProps}>
        <StyledIconButton disabled={disabled} onClick={toggleOpen}>
          <ParticleIcon sx={{ width: 60, height: 60 }} />
        </StyledIconButton>
      </CustomBadge>
      <Collapse in={open}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <StyledIconButton disabled={disabled} onClick={() => handleClick("google")}>
            <Google sx={{ color: "#EA4335" }} />
          </StyledIconButton>
          <StyledIconButton disabled={disabled} onClick={() => handleClick("facebook")}>
            <Facebook sx={{ color: "#4267B2" }} />
          </StyledIconButton>
        </Box>
      </Collapse>
    </>
  );
};
