import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import "../node_modules/@zoomus/websdk/dist/css/bootstrap.css";
// import "../node_modules/@zoomus/websdk/dist/css/react-select.css";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import services from "./services";
import { setupStore } from "./store/store";

const reduxStore = setupStore(services);
ReactDOM.render(
  <Provider store={reduxStore.store}>
    <PersistGate loading={null} persistor={reduxStore.persistedStore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
