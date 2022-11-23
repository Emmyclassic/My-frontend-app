import debounce from "debounce-promise";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadChat } from "../../../utils/loadScript";
import DashboardLeftHeaderNav from "../../../components/Dashboard/LeftHeaderNav";
import Event from "../../../components/Layout/Event/Event";
import PrivateGenericLayout from "../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Search from "../../../components/SearchComponent";
import {
  getCurrentEventsAction,
  getUpcomingEventsAction,
} from "./state/action";

const CreateEvent = () => {
  // const [toggleSearch, setToggleSearch] = useState(false);
  const [tab, setTab] = useState("current");
  // const [searchPhrase, setSearchPhrase] = useState("");
  const [filter] = useState({
    filter: "",
    search: "",
    calender: "",
  });
  const dispatch = useDispatch();

  const fetchEvent = (value, tab) => {
    if (tab === "current") {
      dispatch(
        getCurrentEventsAction({
          ...filter,
          filter: tab,
          search: value,
        })
      );
    } else {
      dispatch(
        getUpcomingEventsAction({
          ...filter,
          filter: tab,
          search: value,
        })
      );
    }
  };
  useEffect(() => {
    loadChat();
    const chatIcon = document.getElementById("fc_frame");
    if (chatIcon) {
      chatIcon.style.display = "block";
    }

    return () => {
      const script = document.getElementById("Freshdesk Messaging-js-sdk");

      if (script) script.remove();
      if (chatIcon) {
        chatIcon.style.display = "none";
      }
    };
  }, [dispatch]);
  const dbounce = useCallback(debounce(fetchEvent, 500), []);

  useEffect(() => {
    dispatch(getCurrentEventsAction({ ...filter, filter: "current" }));
    dispatch(getUpcomingEventsAction({ ...filter, filter: "upcoming" }));
  }, [filter]);

  const handleChange = (nextPhrase) => {
    // const { value: nextPhrase } = e.target;
    // setSearchPhrase(nextPhrase);
    dbounce(nextPhrase, tab);
  };

  return (
    <PrivateGenericLayout
      leftNav={
        <DashboardLeftHeaderNav
          title="Browse Events"
          subtitle="Explore different events on APEMS"
        />
      }
    >
      <section>
        <Event
          tab={tab}
          toggleCurrentTab={(tab) => setTab(tab)}
          rightItem={
            <Search handleChange={handleChange} />
            // <div className={style.leftContainer}>
            //   <div
            //     className={classNames(`${style.inputSearch}`, {
            //       [`${style.showInput}`]: toggleSearch,
            //     })}
            //   >
            //     <span
            //       className={style.iconBoxCancel}
            //       onClick={() => setToggleSearch((prev) => !prev)}
            //     >
            //       <TiTimes className={style.iconCancel} size={18} />
            //     </span>
            //     <div className={style.searchInputBox}>
            //       <input
            //         placeholder="search"
            //         value={searchPhrase}
            //         className={style.searchInput}
            //         onChange={handleChange}
            //       />
            //       <span className={style.searchIcon}>
            //         <FiSearch size={20} color="#5C6574" />
            //       </span>
            //     </div>
            //   </div>
            //   <span
            //     className={style.iconBox}
            //     onClick={() => setToggleSearch((prev) => !prev)}
            //   >
            //     <FiSearch className={style.iconSearch} size={20} />
            //   </span>
            // </div>
          }
        />
      </section>
    </PrivateGenericLayout>
  );
};

export default CreateEvent;
