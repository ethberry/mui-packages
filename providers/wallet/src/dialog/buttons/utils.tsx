import { Facebook } from "@mui/icons-material";
import { AuthType } from "@particle-network/auth";

import { GoogleIcon } from "../social-icons";
import { ParticleIcon } from "../wallet-icons";

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const getParticleButtonIcon = (type: AuthType | "particle"): any => {
  switch (type) {
    case "particle":
      return <ParticleIcon />;
    case "facebook":
      return <Facebook sx={{ color: "#4267B2" }} />;
    case "google":
      return <GoogleIcon />;
    default:
      return null;
  }
};
