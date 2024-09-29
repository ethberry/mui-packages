// TODO - transfer to common package utils
export const isDesktopDevice = () => {
  const userAgent = window.navigator.userAgent;

  // for always displaying in dev mode
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return false;
  }

  if (/android/i.test(userAgent)) {
    return false;
  }

  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  return screenWidth >= 1024;
};
