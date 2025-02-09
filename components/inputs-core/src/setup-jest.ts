import utils from "util";

// https://github.com/jsdom/jsdom/issues/2524
if (typeof globalThis.TextEncoder === "undefined") {
  globalThis.TextEncoder = utils.TextEncoder;
}
