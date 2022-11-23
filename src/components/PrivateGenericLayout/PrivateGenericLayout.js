import { Button } from "antd";
import proTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { GiBrokenPottery } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "react-sidebar";
import { togglePrivateSidebar } from "../../actions/uiAction";
import Header from "../Dashboard/Header";
import DashboardRightHeaderNav from "../Dashboard/RightHeaderNav";
import LeftSideBar from "../LeftSidebar/LeftSidebar";
import styles from "./PrivateGenericLayout.module.scss";
import { getProfileAction } from "../../modules/LoggedArea/Profile/state/action";
import { useIdleTimer } from "react-idle-timer";
import ApemIdleTimer from "../ApemIdleTimer";
// import { useHistory } from "react-router-dom";

const mql = window.matchMedia(`(min-width: 800px)`);

const PrivateGenericLayout = ({
  children,
  leftNav,
  RightNav = <DashboardRightHeaderNav />,
}) => {
  const [, setDocked] = useState(mql.matches);
  const sidebarStatus = useSelector((state) => state.privateSidebar);
  // const { name } = useSelector((state) => state.profile);
  // console.log({ name });
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(togglePrivateSidebar(false));
  };
  const style = {
    sidebar: {
      width: mql.matches ? "15%" : "80%",
      background: "#6E6E70",
      top: 0,
      bottom: 0,
      transition: "transform .3s ease-out",
      WebkitTransition: "-webkit-transform .3s ease-out",
      willChange: "transform",
      overflowY: "auto",
      overflowX: "hidden",
    },
    content: {
      background: "#fff",
    },
    overlay: {
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      overflowX: "hidden",
      visibility: "hidden",
      transition: "opacity .3s ease-out, visibility .3s ease-out",
      backgroundColor: "rgba(0,0,0,.8)",
      height: "100%",
    },
    dragHandle: {
      zIndex: 1,
      position: "fixed",
      top: 0,
      bottom: 0,
      transition: "opacity .3s ease-out, visibility .3s ease-out",
    },
  };

  const mediaQueryChanged = () => {
    setDocked(mql.matches);
  };
  const sidebar = <LeftSideBar />;
  const sidebarProps = {
    sidebar,
    docked: mql.matches,
    open: sidebarStatus,
    onSetOpen: closeSidebar,
    styles: style,
    transitions: !mql.matches,
    pullLeft: mql.matches,
  };
  useEffect(() => {
    mql.addListener(mediaQueryChanged);
  }, [mql]);
  useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  const myErrorHandler = (error) => {
    // Do something with the error
    // E.g. log to an error logging client here
    console.log("error propagate", error);
  };

  const [idleModalOpen, setIdleModalOpen] = useState(false);
  const onIdle = () => {
    setIdleModalOpen(true);
  };
  useIdleTimer({ onIdle, timeout: 900000 });

  return (
    <Sidebar {...sidebarProps}>
      {setIdleModalOpen && (
        <ApemIdleTimer
          setIdleModalOpen={setIdleModalOpen}
          idleModalOpen={idleModalOpen}
        />
      )}

      <div className={styles.content__container}>
        <Header leftNav={leftNav} RightNav={RightNav} />

        <section className={styles.main}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // reset the state of your app so the error doesn't happen again
            }}
            onError={myErrorHandler}
          >
            {children}
          </ErrorBoundary>
        </section>
      </div>
    </Sidebar>
  );
};
PrivateGenericLayout.proTypes = {
  children: proTypes.node.isRequired,
};

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <GiBrokenPottery size={100} style={{ alignSelf: "center" }} />
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default PrivateGenericLayout;
