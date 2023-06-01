import { defaultAbiCoder } from "@ethersproject/abi";

import { CustomErrorPrefix, SystemErrorPrefix } from "./interfaces";
import { panicErrorCodeToReason } from "./panic-code-handler";
import { customErrorToReason } from "./custom-error-handler";

export const getBlockchainErrorReason = (error: string): string => {
  const isEmptyError = error === SystemErrorPrefix.EMPTY;
  const isSystemStringError = error.startsWith(SystemErrorPrefix.ERROR_STRING_PREFIX);
  const isSystemPanicError = error.startsWith(SystemErrorPrefix.PANIC_CODE_PREFIX);
  const isCustomError = Object.keys(CustomErrorPrefix).some(key => error.startsWith(key));

  if (isEmptyError) {
    return "Empty error";
  } else if (isSystemStringError) {
    return defaultAbiCoder.decode(
      ["string"],
      `0x${error.slice(SystemErrorPrefix.ERROR_STRING_PREFIX.length)}`,
    )[0] as string;
  } else if (isSystemPanicError) {
    const code = defaultAbiCoder.decode(["uint256"], `0x${error.slice(SystemErrorPrefix.PANIC_CODE_PREFIX.length)}`)[0];
    return panicErrorCodeToReason(code);
  } else if (isCustomError) {
    return customErrorToReason(error);
  }

  return error;
};
