import { setLoader } from "../../../../actions/uiAction";
import { evenTypeAction } from "./eventTypeAction";

const sorterKey = {
  agm: 1,
  meetings: 2,
  concerts: 3,
};

export const getEventTypeAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(setLoader(true));
      const {
        data: { data },
      } = await httpApi.getEventTypes();

      const transformData = data.map((item) => ({
        ...item,
        order: sorterKey[item.type],
      }));

      const sortTransformData = transformData.sort((a, b) => a.order - b.order);

      dispatch(evenTypeAction({ data: sortTransformData, status: "success" }));
      dispatch(setLoader(false));
    } catch (err) {
      const response = err.response?.data?.data;
      console.log("response", response);
      const error = err.response?.data ?? err.toJSON().message;
      console.log("err", error);

      dispatch(evenTypeAction({ data: error, status: "fail" }));
      dispatch(setLoader(false));
    }
  };
