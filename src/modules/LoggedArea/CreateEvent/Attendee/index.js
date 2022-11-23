import { Badge, Input, Tabs } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import shortid from "shortid";
import AttendeeForm from "./Form/Attendee";
import ProxyForm from "./Form/Proxy";
import style from "./index.module.scss";
import {
  getAttendeeAction,
  getProxyAction,
  removeAttendeeAction,
  removeProxyAction,
} from "./state/action";

const { TabPane } = Tabs;
const { Search } = Input;

const Attendee = ({ nextStep }) => {
  const { id } = useParams();
  const [tab, setTab] = useState("attendee");
  const dispatch = useDispatch(0);
  const [reloadProxy, setReloadProxy] = useState(false);
  const [reloadAttendee, setReloadAttendee] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const allAttendees = useSelector((state) => state.attendees);
  const allProxies = useSelector((state) => state.proxies);

  const eventResponse = useSelector((state) => state.eventTypes);

  // const { loading: uiLoader } = useSelector((state) => state.ui);

  const currentEventType = eventResponse.data?.find((item) => item.id === id);

  useEffect(() => {
    dispatch(getAttendeeAction(searchPhrase));
  }, [reloadAttendee]);

  const handleSearch = (e) => {
    setSearchPhrase(e.target.value);
  };

  const removeAttendee = (item) => {
    dispatch(removeAttendeeAction(item));
  };

  const handleSearchSubmit = () => {
    dispatch(getAttendeeAction(searchPhrase));
  };

  const removeProxy = (item) => {
    dispatch(removeProxyAction(item));
  };

  const handleProxySearchSubmit = () => {
    dispatch(getProxyAction(searchPhrase));
  };

  useEffect(() => {
    dispatch(getProxyAction(searchPhrase));
  }, [reloadProxy]);

  return (
    <section className={style.main}>
      <div className={style.main_container}>
        <div className={style.main_containerLeft}>
          {currentEventType.type === "agm" && (
            <div className={style.main_containerLeft_btnBox}>
              <button
                onClick={() => setTab("attendee")}
                className={classNames(`${style.main_containerLeft_btn}`, {
                  [`${style.attendeeBtnType}`]: tab === "attendee",
                })}
              >
                Attendee
              </button>
              <button
                onClick={() => setTab("proxy")}
                className={classNames(`${style.main_containerLeft_btn}`, {
                  [`${style.attendeeBtnType}`]: tab === "proxy",
                })}
              >
                Proxy
              </button>
            </div>
          )}

          {tab === "attendee" && (
            <div style={{ marginTop: "2rem" }}>
              <AttendeeForm
                nextStep={nextStep}
                currentEventType={currentEventType}
                attendees={allAttendees?.attendees ?? []}
                reloadAttendee={() => setReloadAttendee((prev) => !prev)}
              />
            </div>
          )}

          {tab === "proxy" && (
            <div style={{ marginTop: "2rem" }}>
              <ProxyForm
                proxies={allProxies?.proxies ?? []}
                reloadProxy={() => setReloadProxy((prev) => !prev)}
              />{" "}
            </div>
          )}
          <div className={style.form__input_wrap}>
            <button
              onClick={nextStep}
              type="button"
              className={style.form__input_submit_request}
            >
              {(allAttendees &&
                allAttendees.attendees &&
                allAttendees.attendees.length > 0) ||
              (allProxies &&
                allProxies.proxies &&
                allProxies.proxies &&
                allProxies.proxies.length)
                ? "Continue"
                : "Skip & Continue >>>"}
            </button>
          </div>
        </div>
        <div className={style.main_containerRight}>
          <div className={style.main_containerRight_wrap}>
            <Tabs
              defaultActiveKey="1"
              tabBarStyle={{ backgroundColor: "#F8F9FA", padding: "1px 10px" }}
            >
              <TabPane
                tab={
                  <span>
                    <span style={{ marginRight: "10px" }}>Attendee List</span>
                    <Badge count={allAttendees?.attendees?.length ?? 0} />
                  </span>
                }
                key="1"
                className={style.tabStyle}
              >
                <div className={style.tabContent}>
                  <Search
                    onChange={handleSearch}
                    onSearch={handleSearchSubmit}
                    placeholder="Search by email, name or mobile number"
                    style={{ width: "100%" }}
                  />
                  <div className={style.attendeeList}>
                    <div className={style.proxyHeader}>
                      <div>Name</div>
                      <div>Actions</div>
                    </div>
                    <div className={style.proxyBody}>
                      {allAttendees &&
                        allAttendees.status === "success" &&
                        allAttendees.attendees.length > 0 &&
                        allAttendees.attendees.map((item) => (
                          <AttendeeItem
                            key={shortid.generate()}
                            attendee={item}
                            removeAttendee={removeAttendee}
                          />
                        ))}
                    </div>
                  </div>
                  {/* <div className={style.attendeeList}>
                    {allAttendees &&
                      allAttendees.status === "success" &&
                      allAttendees.attendees.length > 0 &&
                      allAttendees.attendees.map((item) => (
                        <AttendeeItem
                          key={item?.id}
                          removeAttendee={removeAttendee}
                          attendee={item}
                        />
                      ))}
                  </div> */}
                </div>
              </TabPane>

              {currentEventType.type === "agm" && (
                <TabPane
                  tab={
                    <span>
                      <span style={{ marginRight: "10px" }}>Proxy List</span>
                      <Badge
                        count={allProxies?.proxies?.length ?? 0}
                        style={{ backgroundColor: "#CED0D5" }}
                      />
                    </span>
                  }
                  key="2"
                  className={style.tabStyle}
                >
                  <div className={style.tabContent}>
                    <Search
                      onChange={handleSearch}
                      onSearch={handleProxySearchSubmit}
                      placeholder="Search by email, name or mobile number"
                      style={{ width: "100%" }}
                    />
                    <div className={style.attendeeList}>
                      <div className={style.proxyHeader}>
                        <div>Name</div>
                        <div>Proxy</div>
                        <div>Action</div>
                      </div>
                      <div className={style.proxyBody}>
                        {allProxies &&
                          allProxies.status === "success" &&
                          allProxies.proxies.length > 0 &&
                          allProxies.proxies.map((item) => (
                            <ProxyItem
                              key={shortid.generate()}
                              proxy={item}
                              removeProxy={removeProxy}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </TabPane>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

// const AttendeeItem = ({ attendee, removeAttendee }) => {
//   return (
//     <div className={style.form__input_wrap}>
//       <div className={style.attendListLabel}>
//         <Checkbox>
//           <p className={style.form__label_content}>{attendee?.email}</p>
//         </Checkbox>
//         <span
//           className={style.listTrash}
//           onClick={() => removeAttendee(attendee)}
//         >
//           <FiTrash />
//         </span>
//       </div>
//     </div>
//   );
// };

const AttendeeItem = ({ attendee, removeAttendee }) => {
  console.log("attendee", attendee);
  return (
    <div className={`${style.proxyRow} ${style.attendeeRow}`}>
      <div className={style.proxyRow__name}>{attendee?.name}</div>
      <div className={style.proxyRow__action}>
        <span
          className={style.listTrash}
          onClick={() => removeAttendee(attendee)}
        >
          <FiTrash color="#5c6574" size={18} />
        </span>
      </div>
    </div>
  );
};

const ProxyItem = ({ removeProxy, proxy }) => {
  return (
    <div className={style.proxyRow}>
      <div className={style.proxyRow__name}>{proxy.participant_name}</div>

      <div className={style.proxyRow__proxy}>
        <span className={style.proxyRow__span}>
          {proxy.nominated_proxy_name}
        </span>
      </div>
      <div className={style.proxyRow__action}>
        <span className={style.listTrash} onClick={() => removeProxy(proxy)}>
          <FiTrash color="#5c6574" size={18} />
        </span>
      </div>
    </div>
  );
};

export default Attendee;
