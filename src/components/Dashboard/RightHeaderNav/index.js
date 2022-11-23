import { Dropdown, Menu, notification } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { useHistory, Link } from "react-router-dom";
import { VscBell } from "react-icons/vsc";
import Pusher from "pusher-js";
import { ReactComponent as RedBellIcon } from "../../../assets/icons/GroupNotif.svg";
import Svg from "react-inlinesvg";

import style from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import resolver from "../../../utils/promiseWrapper";
import GoogleTranslateButton from "../../../components/Buttons/GoogleTranslate/GoogleTranslate";
import { markNotification } from "../../../api/eventHandler";

const Profile = ({ position }) => {
  // const history = useHistory();
  return (
    <Menu.Item
      key="222"
      className={style.menu_item}
      icon={
        <RiUserFill color="#fff" size="12" className={style.menu_item_icon} />
      }
    >
      <Link
        to="/MyProfile"
        target={position === "meeting" ? "_blank" : "_self"}
        rel="noopener noreferrer"
      >
        <span className={style.ml_1}>Profile</span>
      </Link>
    </Menu.Item>
  );
};
const Logout = () => {
  const history = useHistory();

  const logoutFunc = () => {
    localStorage.setItem("data", null);
    history.push("/", { fromLogout: true });
  };
  return (
    <>
      <Menu.Item
        key="204"
        className={`${style.menu_item} ${style.log_out}`}
        icon={
          <MdLockOutline
            color="#B20000"
            size="12"
            className={`${style.menu_item_icon}`}
          />
        }
        onClick={logoutFunc}
      >
        <span className={style.ml_1}>Logout</span>
      </Menu.Item>
    </>
  );
};

const NotifcationCard = ({ message, dataExist, item, notifications }) => {
  const eventInfo = localStorage.getItem("eventInfo");
  const dispatch = useDispatch();

  const markAsRead = async () => {
    const res = notifications.find((notif) => notif.id === item.id);
    console.log({ readRead: res });

    const payload = [
      {
        app_notification_id: res.id,
        attendee_id: JSON.parse(eventInfo)?.attendeeId ?? "",
      },
    ];
    dispatch({ type: "SINGLE_READ_NOTIFICATION", payload: res.id });

    await resolver(
      markNotification({
        notifications: payload,
      })
    );
  };
  const openNotification = () => {
    notification.open({
      message: `Question: ${item?.meta?.question ?? ""} `,
      description: `Answer: ${item?.meta?.answer ?? "No answer available"}`,
      onClick: () => {},
      placement: "top",
      onClose: markAsRead,
    });
  };

  return (
    <div className={style.notication_card} onClick={openNotification}>
      {dataExist ? (
        <>
          <div className={style.notication_icon}>
            <Svg
              src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940353/apems/speechBubble_mrhsdl.svg"
              color="#fff"
              size="22"
              className={style.notication_item_icon}
            />
          </div>
          <div className={style.notification_detail}>
            <p style={{ marginLeft: "1.5rem", fontSize: "1.4rem" }}>
              {message}
            </p>
            {/* <p>
              New comment in
              <span className={style.text_bold}>
                Room Four - APEMS Discussion{" "}
              </span>
              by <span className={style.text_bold}>Ayodeji Fasore</span>
            </p>
            <p>41 minutes ago</p> */}
          </div>
        </>
      ) : (
        <p style={{ marginLeft: "1.5rem", fontSize: "1.4rem" }}>{message}</p>
      )}
    </div>
  );
};

const settingsOptions = (position) => {
  return (
    <Menu className={style.dropdown_container}>
      SETTINGS
      {/* <AccountSettings /> */}
      <Profile position={position} />
      <Logout />
    </Menu>
  );
};
// const notificationOptions = () => {
//   return (
//     <Menu className={style.notification_container}>
//       <div className={style.notification_header}>
//         <span>Notification</span>
//         <span className={style.mark_as_read}>Mark all as read</span>
//       </div>
//       <NotifcationCard />
//       <NotifcationCard />
//       <NotifcationCard />
//       <div className={style.notification_footer}>
//         <span>See all activity</span>
//       </div>
//     </Menu>
//   );
// };

const DashboardRightHeaderNav = ({ eventDetail, position = "dashboard" }) => {
  const [, setPusher] = useState();
  const notif = useSelector((state) => state.notifications);
  const [notifications, setNotification] = useState(notif);
  console.log({ notifications });
  // const [, setMeetingNotification] = useState([]);

  const dispatch = useDispatch();

  const eventInfo = localStorage.getItem("eventInfo");

  const markAsRead = async () => {
    const ids = notifications.map((item) => ({
      app_notification_id: item.id,
      attendee_id: JSON.parse(eventInfo)?.attendeeId ?? "",
    }));
    console.log({ ids });
    const [result] = await resolver(
      markNotification({
        notifications: ids,
      })
    );
    if (result) {
      dispatch({ type: "READ_NOTIFICATION", payload: [] });
    }
  };

  useEffect(() => {
    const pusher = new Pusher("f2d97c4c2c843342fbb5", {
      cluster: "eu",
      enabledTransports: ["ws", "wss"],
      authEndpoint: "https://apems-votes-dev.apems.co/broadcasting/auth",
      forceTLS: true,
    });

    pusher.connection.bind("connected", (e) => {
      console.log("connected", e);
    });

    pusher.connection.bind("error", function (err) {
      console.log("push error", err.error);
      // if (err.error.data.code === 4004) {
      //   console.log("Over limit!");
      // }
    });
    setPusher(pusher);
  }, []);

  useEffect(() => {
    console.log({ newNotif: notif, eventInfo });

    if (eventInfo && JSON.parse(eventInfo).role !== 1) {
      console.log("attendee here");
      const result = notif.filter((item) => item.message.includes("Host"));
      setNotification(result);
    } else {
      console.log("host here");
      const result = notif.filter((item) => !item.message.includes("Host"));
      setNotification(result);
    }
  }, [notif.length]);

  const notificationOptions = () => {
    return (
      <Menu className={style.notification_container}>
        <div className={style.notification_header}>
          <span>Notification</span>
          {notifications.length ? (
            <span className={style.mark_as_read} onClick={markAsRead}>
              Mark all as read
            </span>
          ) : null}
        </div>
        {notifications.length > 0 ? (
          notifications.map((item, idx) => (
            <NotifcationCard
              item={item}
              key={idx}
              message={item.message}
              dataExist={true}
              notifications={notifications}
            />
          ))
        ) : (
          <div>
            <NotifcationCard
              dataExist={false}
              message="No recent notification"
            />
          </div>
        )}
        {/* <div className={style.notification_footer}>
          <span>See all activity</span>
      
        </div> */}
      </Menu>
    );
  };
  return (
    <div className={style.langWraper}>
      <div className={style.lang}>
        <GoogleTranslateButton googleTrans={false} />
      </div>
      <div className={style.container}>
        {position === "meeting" && eventDetail && eventDetail.role === 1 ? (
          <Dropdown
            overlay={() => settingsOptions("meeting")}
            trigger={["click"]}
            placement="bottomRight"
          >
            <span className={style.container__setting}>
              <AiOutlineSetting color="#fff" size="18" />
            </span>
          </Dropdown>
        ) : null}
        {position === "dashboard" ? (
          <Dropdown
            overlay={settingsOptions}
            trigger={["click"]}
            placement="bottomRight"
          >
            <span className={style.container__setting}>
              <AiOutlineSetting color="#fff" size="18" />
            </span>
          </Dropdown>
        ) : null}

        <Dropdown
          overlay={notificationOptions}
          trigger={["click"]}
          placement="bottomRight"
        >
          <span className={style.container__setting}>
            {/* <VscBellDot color="#fff" size="18" /> */}

            {notifications && notifications.length ? (
              <RedBellIcon />
            ) : (
              <VscBell size={20} />
            )}
          </span>
        </Dropdown>
      </div>
    </div>
  );
};
export default DashboardRightHeaderNav;
