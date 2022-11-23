import React from "react";
// import { BsBookmarkFill } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { togglePrivateSidebar } from "../../actions/uiAction";

import { ApemsLogoWhite } from "../ApemLogo/ApemsLogo";
import style from "./LeftSidebar.module.scss";

const LeftSideBar = ({ children }) => {
  const sidebarStatus = useSelector((state) => state.privateSidebar);
  const { name, profile_picture_path } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  console.log("sidwbar", sidebarStatus);

  // const closeSidebar = () => {
  //   dispatch(togglePrivateSidebar(false));
  // };
  const styles = {
    // sidebar: {
    //   width: 500,
    //   height: "100%",
    // },
    sidebarLink: {
      display: "block",
      padding: "16px 0px",
      color: "#757575",
      textDecoration: "none",
    },
    divider: {
      margin: "8px 0",
      height: 1,
      backgroundColor: "#757575",
    },
    content: {
      padding: "50px",
      height: "100%",
      // backgroundColor: "red",
    },
  };
  const links = [];

  for (let ind = 0; ind < 6; ind++) {
    links.push(
      <a key={ind} href="#" style={styles.sidebarLink}>
        Mock menu item {ind}
      </a>
    );
  }

  return (
    <div className={style.sidebar__wrapper}>
      <header className={style.header}>
        <Link to="/">
          <ApemsLogoWhite />
        </Link>
      </header>
      <div className={style.vertical__stroke}></div>
      <div className={style.sidebar__container}>
        <nav className={style.nav__list}>
          <ul className={style.nav__list}>
            <li className={style.nav__list__item}>
              <Link
                className={style.nav__list__link}
                to="/Dashboard"
                onClick={() => dispatch(togglePrivateSidebar(false))}
              >
                <span className={style.nav__list__link_icon}>
                  <HiViewGrid size={18} color="#fff" />
                </span>
                <span className={style.nav__list__link_text}>Dashboard</span>
              </Link>
            </li>
            <li className={style.nav__list__item}>
              <Link className={style.nav__list__link} to="/event/browse">
                <span className={style.nav__list__link_icon}>
                  {/* <RiCalendarEventFill size={18} color="#fff" /> */}
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940343/apems/fi-sr-book-alt_so3khc.png"
                    width={15}
                    height={15}
                  />
                </span>
                <span className={style.nav__list__link_text}>
                  Browse Events
                </span>
              </Link>
            </li>
            <li className={style.nav__list__item}>
              <Link className={style.nav__list__link} to="/event/list">
                <span className={style.nav__list__link_icon}>
                  {/* <BsBookmarkFill size={18} color="#fff" /> */}
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940350/apems/MyEvents_p1fp1n.png"
                    width={15}
                    height={15}
                  />
                </span>
                <span className={style.nav__list__link_text}>My Events</span>
              </Link>
            </li>
            <li className={style.nav__list__item}>
              <Link className={style.nav__list__link} to="/MyTicket">
                <span className={style.nav__list__link_icon}>
                  {/* <RiTicketFill size={18} color="#fff" /> */}
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940350/apems/MyTickets_b3vwlk.png"
                    width={15}
                    height={15}
                  />
                </span>
                <span className={style.nav__list__link_text}>My Tickets</span>
              </Link>
            </li>
            <li className={style.nav__list__item}>
              <Link className={style.nav__list__link} to="/Recordings">
                <span className={style.nav__list__link_icon}>
                  <img
                    src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940352/apems/Recordings_tw4pvm.png"
                    width={15}
                    height={15}
                  />
                </span>
                <span className={style.nav__list__link_text}>Recordings</span>
              </Link>
            </li>
          </ul>
        </nav>
        <footer className={style.footer}>
          <Link className={style.nav__list__link} to="/MyProfile">
            <div className={style.support__box}>
              <img
                src={
                  profile_picture_path ||
                  "https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
                }
                className={style.avatar__image}
              />

              <div className={style.support__right}>
                <span className={style.support__right__span}>
                  {name || "User"}
                </span>
              </div>
            </div>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default LeftSideBar;
