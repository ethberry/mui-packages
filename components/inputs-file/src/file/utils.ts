import { SxProps, Theme } from "@mui/material/styles";

export function humanFileSize(size: number): string {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "KB", "MB", "GB", "TB"][i];
}

/*
 We cannot spread `sx` directly because `SxProps` (typeof sx) can be an array
 So we are making it always spreadable
 https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
*/
export const getSxArray = (sx: SxProps<Theme>): SxProps<Theme> =>
  [...(Array.isArray(sx) ? sx : [sx])] as SxProps<Theme>;
