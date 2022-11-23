import * as uiActions from "../actions/uiAction";

const initState = {
  loading: false,
};
export const uiReducer = (state = initState, action) => {
  const { payload, type } = action;
  switch (type) {
    case uiActions.SET_LOADER_ON:
    case uiActions.SET_LOADER_OFF:
      return { ...state, loading: payload };

    default:
      return state;
  }
};

export const publicSidebarReducer = (state = false, action) => {
  const { payload, type } = action;
  switch (type) {
    case uiActions.PUBLIC_SIDEBAR_OFF:
    case uiActions.PUBLIC_SIDEBAR_ON:
      return payload;
    default:
      return state;
  }
};

export const privateSidebarReducer = (state = false, action) => {
  const { payload, type } = action;
  switch (type) {
    case uiActions.PRIVATE_SIDEBAR_OFF:
    case uiActions.PRIVATE_SIDEBAR_ON:
      return payload;
    default:
      return state;
  }
};
