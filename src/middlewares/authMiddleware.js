import {
  REGISTER_USER,
  registerUserSuccess,
  registerUserFailure,
} from "../Auth/State/authAction";
import { setLoader } from "../actions/uiAction";

export const registerMiddleware =
  ({ httpApi }) =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (action.type === REGISTER_USER) {
      try {
        dispatch(setLoader(true));
        const { data } = await httpApi.registerUser(action.payload);
        dispatch(registerUserSuccess({ data }));
        dispatch(setLoader(false));
      } catch (err) {
        dispatch(registerUserFailure({ err }));
        dispatch(setLoader(false));
      }
    }
  };
