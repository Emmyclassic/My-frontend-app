export const PAGE_LOADED = "[ui] PAGE_LOADED";
export const SET_LOADER_ON = "[ui] SET_LOADER_ON";
export const SET_LOADER_OFF = "[ui] SET_LOADER_OFF";

export const PUBLIC_SIDEBAR_ON = "[ui] TOGGLE_PUBLIC_SIDEBAR_ON";
export const PUBLIC_SIDEBAR_OFF = "[ui] TOGGLE_PUBLIC_SIDEBAR_ON";

export const PRIVATE_SIDEBAR_ON = "[ui] TOGGLE_PRIVATE_SIDEBAR_ON";
export const PRIVATE_SIDEBAR_OFF = "[ui] TOGGLE_PRIVATE_SIDEBAR_ON";

export const pageLoaded = () => ({
  type: PAGE_LOADED,
});

export const setLoader = (isLoading) => ({
  type: isLoading ? SET_LOADER_ON : SET_LOADER_OFF,
  payload: isLoading,
});

export const togglePublicSidebar = (isOpen) => ({
  type: isOpen ? PUBLIC_SIDEBAR_ON : PUBLIC_SIDEBAR_OFF,
  payload: isOpen,
});
export const togglePrivateSidebar = (isOpen) => ({
  type: isOpen ? PRIVATE_SIDEBAR_ON : PRIVATE_SIDEBAR_OFF,
  payload: isOpen,
});
