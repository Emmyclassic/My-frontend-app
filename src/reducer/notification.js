export const notifcationReducer = (state = [], action) => {
  const addToList = () => {
    const notif = state.find((item) => item.id === payload[0].id);

    if (!notif) {
      return [...state, ...payload];
    } else {
      return state;
    }
  };
  const { payload, type } = action;
  switch (type) {
    case "RECEIVED_NOTIFICATION":
      return addToList();
    case "READ_NOTIFICATION":
      return [];
    case "SINGLE_READ_NOTIFICATION":
      return state.filter((item) => item.id !== payload);
    default:
      return state;
  }
};
