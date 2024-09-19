// TODO - transfer to common package utils
export const isDesktopDevice = () => {
  const userAgent = navigator.userAgent;

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return false;
  }

  if (/android/i.test(userAgent)) {
    return false;
  }

  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  return screenWidth >= 1024;
};
