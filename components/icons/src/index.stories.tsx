import { IconButton } from "@mui/material";
import { StoryObj } from "@storybook/react";

import { Gas } from "./gas";
import { OpenSea } from "./open-sea";
import { OneInch } from "./cryptoicons/1inch";
import { Usdt } from "./cryptoicons/usdt";
import { Uniswap } from "./cryptoicons/uniswap";

export default {
  title: "Icons",
  component: null,
};

type Story = StoryObj<any>;

const SimpleTemplate: Story = {
  render: () => (
    <div>
      <IconButton>
        <Gas />
      </IconButton>
      <IconButton>
        <OpenSea />
      </IconButton>
    </div>
  ),
};

export const Simple = SimpleTemplate;

const CryptoiconsTemplate: Story = {
  render: () => (
    <div>
      <IconButton>
        <OneInch />
      </IconButton>
      <IconButton>
        <OneInch sx={{ fill: "#D82122" }} />
      </IconButton>
      <IconButton>
        <Usdt />
      </IconButton>
      <IconButton>
        <Usdt sx={{ fill: "#26A17B" }} />
      </IconButton>
      <IconButton>
        <Uniswap />
      </IconButton>
      <IconButton>
        <Uniswap sx={{ fill: "#FF007A" }} />
      </IconButton>
    </div>
  ),
};

export const Cryptoicons = CryptoiconsTemplate;
