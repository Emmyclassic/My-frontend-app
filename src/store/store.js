import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import reducer from "../reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["eventTypes", "ticketTypes", "banks", "emailCampaign", "profile"], // whitelist items
};
const persistedReducer = persistReducer(persistConfig, reducer);

// devtool
const composeEnhancers = compose;

export const setupStore = ({ httpApi }) => {
  const middlewares = [];

  middlewares.push(
    reduxThunk.withExtraArgument({
      httpApi: httpApi,
    })
  );

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  const persistedStore = persistStore(store);
  return { store, persistedStore };
};
