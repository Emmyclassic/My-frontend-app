import moment from "moment";
import { createEventAction, createEventLoader } from "./eventAction";

export const postEventAction =
  (payload) =>
  async (dispatch, getState, { httpApi }) => {
    try {
      dispatch(createEventLoader(true));
      const {
        data: { data },
      } = await httpApi.createEvent(payload);

      const starts_at = moment(data?.start_date?.date).format(
        "DD/MM/YYYY HH:mm:ss"
      );
      const ends_at = moment(data?.end_date?.date).format(
        "DD/MM/YYYY HH:mm:ss"
      );

      const payloadCurrent = { ...data, starts_at, ends_at };

      localStorage.setItem("currentEvent", JSON.stringify(payloadCurrent));

      dispatch(
        createEventAction({
          data,
          status: "success",
          message: "Event created successfully",
        })
      );
      dispatch(createEventLoader(false));
    } catch (err) {
      const response = err.response?.data?.data;
      console.log("response", response);
      const error = err.response?.data ?? err.toJSON().message;
      console.log("err", error);

      dispatch(createEventAction({ data: error, status: "fail" }));
      dispatch(createEventLoader(false));
    }
  };
