import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const Binance: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <path
        d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
        fill="#CC9B00"
      />
      <path d="M15.4435 26.3193L19.6369 30.5113L15.4435 34.7031L11.25 30.5113L15.4435 26.3193Z" fill="white" />
      <path d="M29.9999 26.3193L34.1934 30.5113L29.9999 34.7031L25.8064 30.5113L29.9999 26.3193Z" fill="white" />
      <path d="M44.5565 26.3193L48.75 30.5113L44.5565 34.7031L40.363 30.5113L44.5565 26.3193Z" fill="white" />
      <path d="M30.0397 11.7468L41.5187 23.2213L37.3252 27.4132L25.8462 15.9387L30.0397 11.7468Z" fill="white" />
      <path d="M30.0544 11.7468L18.5754 23.2213L22.7689 27.4132L34.2477 15.9387L30.0544 11.7468Z" fill="white" />
      <path d="M30.0397 49.2468L41.5187 37.7723L37.3252 33.5806L25.8462 45.0551L30.0397 49.2468Z" fill="white" />
      <path d="M30.0544 49.2468L18.5754 37.7723L22.7689 33.5806L34.2477 45.0551L30.0544 49.2468Z" fill="white" />
    </SvgIcon>
  );
};