import React from "react";
import { MdClose, MdSpeakerNotes } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "react-sidebar";
import { togglePublicSidebar } from "../../../actions/uiAction";
import style from "./tabletMobile.module.scss";
import { CgFileDocument, CgPoll } from "react-icons/cg";
import { ImMusic } from "react-icons/im";
// import { MdSpeakerNotes } from "react-icons/md";

const TabletMobile = ({
  openMusics,
  openDocuments,
  openPoll,
  openQandAModal,
  eventDetail,
}) => {
  const sidebarStatus = useSelector((state) => state.publicSidebar);
  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(togglePublicSidebar(false));
  };

  const styles = {
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowX: "hidden",
    },
    sidebar: {
      zIndex: 200,
      position: "fixed",
      top: 0,
      bottom: 0,
      transition: "transform .3s ease-out",
      WebkitTransition: "-webkit-transform .3s ease-out",
      willChange: "transform",
      overflowY: "auto",
      overflowX: "hidden",
      width: "100%",
    },
    overlay: {},
    dragHandle: {
      zIndex: 1,
      position: "fixed",
      top: 0,
      bottom: 0,
      transition: "opacity .3s ease-out, visibility .3s ease-out",
    },
  };

  const sidebar = (
    <Asidebar
      openMusics={openMusics}
      openDocuments={openDocuments}
      openPoll={openPoll}
      openQandAModal={openQandAModal}
      eventDetail={eventDetail}
    />
  );
  const sidebarProps = {
    sidebar,
    openMusic: openMusics,
    open: sidebarStatus,
    onSetOpen: closeSidebar,
    styles: styles,
    transitions: true,
    pullRight: true,
    rootClassName: "rootSidebar",
    contentClassName: "sidebarContent",
  };
  return <Sidebar {...sidebarProps} />;
};

export const Asidebar = (props) => {
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(togglePublicSidebar(false));
  };

  const handleNav = (val) => {
    closeSidebar(false);
    if (val === "music") {
      props.openMusics();
    }
    if (val === "askQuestion") {
      props.openQandAModal();
    }
    if (val === "poll") {
      props.openPoll();
    }
    if (val === "documents") {
      props.openDocuments();
    }
  };
  return (
    <div>
      <div className={style.desktop_mobile_nav}>
        <div
          className={style.desktop_mobile_nav_box1}
          onClick={() => closeSidebar(false)}
        ></div>
        <div className={style.desktop_mobile_nav_box2}>
          <div className={style.desktop_mobile_nav_logo_wrapper}>
            <p>
              <img
                style={{ width: "35%" }}
                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/apemsWhiteArc_epc5h8.png"
                alt="logo"
              />
            </p>
            <span onClick={() => closeSidebar(false)}>
              <MdClose color="#fff" size={25} />
            </span>
          </div>
          <ul className={style.desktop_mobile_nav_ul}>
            {props.eventDetail && props.eventDetail.role === 1 && (
              <p
                onClick={() => handleNav("music")}
                className={style.desktop_mobile_nav_li}
              >
                {/* <img
                  style={{
                    width: "20px",
                    borderRadius: "50px",
                    marginRight: "10px",
                  }}
                  src={icon}
                  alt=""
                /> */}
                <ImMusic
                  style={{
                    width: "20px",
                    marginRight: "10px",
                  }}
                />
                <span>Music</span>
              </p>
            )}

            <p
              onClick={() => handleNav("poll")}
              className={style.desktop_mobile_nav_li}
            >
              <CgPoll
                style={{
                  width: "20px",
                  marginRight: "10px",
                }}
              />
              <span>Poll</span>
            </p>
            <p
              onClick={() => handleNav("askQuestion")}
              className={style.desktop_mobile_nav_li}
            >
              <MdSpeakerNotes
                style={{
                  width: "20px",
                  marginRight: "10px",
                }}
              />
              <span>Ask a Question</span>
            </p>
            <p
              onClick={() => handleNav("documents")}
              className={style.desktop_mobile_nav_li}
            >
              <CgFileDocument
                style={{
                  width: "20px",
                  marginRight: "10px",
                }}
              />
              <span>Documents</span>
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabletMobile;
