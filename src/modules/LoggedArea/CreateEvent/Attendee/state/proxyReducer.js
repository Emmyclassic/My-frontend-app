import {
  ADD_PROXY,
  ADD_PROXY_RESET,
  CREATE_PROXY_FAILURE,
  CREATE_PROXY_SUCCESS,
  GET_PROXY_FAILURE,
  GET_PROXY_SUCCESS,
  REMOVE_PROXY_FAILURE,
  REMOVE_PROXY_SUCCESS,
  SET_PROXY_LOADER,
} from "./attendeeAction";

export const addProxyReducer = (state = { loading: false }, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_PROXY_LOADER:
      return {
        ...state,
        loading: payload,
      };
    case CREATE_PROXY_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
      };
    case CREATE_PROXY_FAILURE:
      return {
        ...state,
        loading: false,
        ...payload,
      };
    case ADD_PROXY_RESET:
      return {};
    default:
      return state;
  }
};

const initState = { status: false, proxies: [] };
export const proxyReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROXY_SUCCESS:
      return {
        status: action.payload.status,
        proxies: action.payload.data,
      };
    case GET_PROXY_FAILURE:
      return {
        status: action.payload.status,
        proxies: [],
        error: action.payload,
      };
    case ADD_PROXY:
      return {
        status: action.payload.status,
        // proxies: state.proxies.concat(action.payload.data),
        proxies: [...state.proxies, ...action.payload.data],
      };
    case REMOVE_PROXY_SUCCESS:
      return {
        status: action.payload.status,
        proxies: state.proxies.filter(
          (item) => item.id !== action.payload.data.id
        ),
      };
    case REMOVE_PROXY_FAILURE:
      return {
        status: action.payload.status,
        proxies: state.proxies.concat(action.payload.data),
      };
    default:
      return state;
  }
};
