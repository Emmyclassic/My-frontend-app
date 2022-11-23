import React, { useCallback, useEffect, useState } from "react";
import debounce from "debounce-promise";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { PlusOutlined, EyeFilled, DeleteOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import style from "./index.module.scss";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import Table from "../../../../components/Dashboard/Table";
import Tab from "../../../../components/Dashboard/Tab";
import { ErrorFallback } from "../../../../components/ErrorBoundaryComponentLevel";
import NoData from "../../../../components/NoData";
import { archiveTicket } from "../../../../api/ticketHandler";
// import Swal from "sweetalert2";
import {
  getPublishedEventTicketAction,
  getPastEventTicketAction,
  getPurchasedTicketAction,
  // ticketArchiveAction,
} from "../state/action";

// import { dummyData } from "../static";

const archiveTicketHandler = async (payload, id) => {
  console.log({ payload });
  const result = await archiveTicket(payload, id);
  console.log({ result });
};

const tabMenu = [
  { id: "0001", title: "Published Events" },
  { id: "0002", title: "Past Events" },
  { id: "0003", title: "Purchased Tickets" },
];
const ViewDetails = ({ id }) => {
  // console.log({ id });
  const history = useHistory();
  return (
    <Menu.Item key="1" className={style.menu_item} icon={<EyeFilled />}>
      <span
        className={style.ml_1}
        onClick={() => history.push(`/MyTicket/detail/${id}`)}
      >
        View Details
      </span>
    </Menu.Item>
  );
};
const EditTicket = (props) => {
  const { id, customProp, ...other } = props;
  const history = useHistory();
  return (
    <Menu.Item
      key="2"
      className={style.menu_item}
      icon={<PlusOutlined />}
      {...other}
    >
      <span
        className={style.ml_1}
        onClick={() => history.push(`/MyTicket/edit/${id}`)}
      >
        Edit Ticket
      </span>
    </Menu.Item>
  );
};

const DeleteTicket = ({ id }) => {
  return (
    <Menu.Item
      key="3"
      className={style.menu_item_delete}
      icon={<DeleteOutlined />}
      onclick={() => console.log("dropdown tag clicked...")}
    >
      <span
        className={style.ml_1}
        onClick={() => {
          archiveTicketHandler({ status: 1 }, id);
        }}
      >
        Delete Ticket
      </span>
    </Menu.Item>
  );
};
const dropDownMenuPublished = (ticketId) => {
  // console.log({ ticketId });
  return (
    <React.Fragment>
      <Menu className={style.menu_container}>
        <EditTicket id={ticketId} />
        <Menu.Divider />
        <ViewDetails id={ticketId} />
        <Menu.Divider />
        <DeleteTicket id={ticketId} />
        {/* <Menu.Item
          key="3"
          className={style.menu_item_delete}
          icon={<DeleteOutlined />}
          onClick={() => console.log("dropdown tag clicked...")}
        >
          <span
            className={style.ml_1}
            // onClick={() => {
            //   archiveTicketHandler({ status: 1 }, id);
            // }}
          >
            Delete Ticket
          </span>
        </Menu.Item> */}
      </Menu>
    </React.Fragment>
  );
};
const dropDownMenuPurchased = (ticketId) => {
  // console.log({ ticketId });
  return (
    <Menu className={style.menu_container}>
      <ViewDetails id={ticketId} />
      <Menu.Divider />
      <DeleteTicket id={ticketId} />
    </Menu>
  );
};
const dropDownMenuPast = (ticketId) => {
  // console.log({ ticketId });
  return (
    <Menu className={style.menu_container}>
      <ViewDetails id={ticketId} />
    </Menu>
  );
};

const MyTicket = () => {
  const { publishedEventTicket, pastEventTicket, purchasedTicket } =
    useSelector((state) => state.ticket);
  const { loading } = useSelector((state) => state.ui);
  const [filter] = useState({
    filter: "",
    search: "",
  });
  const [tab, setTab] = useState("Published Events");
  const [searchPhrase, setSearchPhrase] = useState("");
  const toggleTab = (tab) => {
    setTab(tab);
  };
  const dispatch = useDispatch();

  const fetchTicket = (value, tab) => {
    if (tab === "Published Events") {
      dispatch(
        getPublishedEventTicketAction({
          ...filter,
          filter: tab,
          search: value,
        })
      );
    } else if (tab === "Past Events") {
      dispatch(
        getPastEventTicketAction({
          ...filter,
          filter: tab,
          search: value,
        })
      );
    } else if (tab === "Purchased Tickets") {
      dispatch(
        getPurchasedTicketAction({
          ...filter,
          filter: tab,
          search: value,
        })
      );
    }
  };
  const dbounce = useCallback(debounce(fetchTicket, 500), []);

  useEffect(() => {
    dispatch(getPublishedEventTicketAction({ ...filter, filter: "published" }));
    dispatch(getPastEventTicketAction({ ...filter, filter: "past" }));
    dispatch(getPurchasedTicketAction({ ...filter, filter: "purchased" }));
  }, [filter]);

  const handleChange = (nextPhrase) => {
    dbounce(nextPhrase, tab);
  };
  const isLoading = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          <div style={{ width: "100%", marginBottom: "2rem" }}>
            <Skeleton height={50} width={"100%"} />
          </div>
          <div style={{ width: "100%", marginTop: "1rem" }}>
            <Skeleton height={50} width={"100%"} />
          </div>
        </div>
      );
    }
  };

  return (
    <PrivateGenericLayout
      leftNav={
        <DashboardLeftHeaderNav
          title="Tickets"
          subtitle="Find all tickets created and tickets purchased here."
        />
      }
    >
      <section className={style.main}>
        <div className={style.top_session}>
          <div className={style.top_session_left}>
            <Tab list={tabMenu} handleTabClick={toggleTab} active={tab} />
          </div>
          <div className={style.top_session_right}>
            <span className={style.top_session_search_icon}>
              <FiSearch color="#5C6574" size="18" />
            </span>
            <input
              name="search"
              value={searchPhrase}
              onChange={(e) => {
                setSearchPhrase(e.target.value);
                handleChange(e.target.value);
              }}
              placeholder="Search Tickets"
            />
          </div>
        </div>
        <div className={style.table_wrapper}>
          {tab === "Published Events" && (
            <>
              {isLoading(publishedEventTicket)}
              {loading === false && publishedEventTicket.status === "fail" && (
                <ErrorFallback
                  resetErrorBoundary={() => console.log("error")}
                />
              )}
              {loading === false &&
                publishedEventTicket.status === "success" &&
                publishedEventTicket.data.data.length > 0 && (
                  <>
                    <Table
                      list={publishedEventTicket.data.data}
                      dropdownList={dropDownMenuPublished}
                    />
                  </>
                )}
              {loading === false &&
                publishedEventTicket.status === "success" &&
                publishedEventTicket.data.data.length === 0 && (
                  <NoData description="No Published Event Ticket yet." />
                )}
            </>
          )}
          {tab === "Past Events" && (
            <>
              {isLoading(pastEventTicket)}
              {loading === false && pastEventTicket.status === "fail" && (
                <ErrorFallback
                  resetErrorBoundary={() => console.log("error")}
                />
              )}
              {loading === false &&
                pastEventTicket.status === "success" &&
                pastEventTicket.data.data.length > 0 && (
                  <>
                    <Table
                      list={pastEventTicket.data.data}
                      dropdownList={dropDownMenuPast}
                    />
                  </>
                )}
              {loading === false &&
                pastEventTicket.status === "success" &&
                pastEventTicket.data.data.length === 0 && (
                  <NoData description="No Past Event Ticket yet." />
                )}
            </>
          )}
          {tab === "Purchased Tickets" && (
            <>
              {isLoading(purchasedTicket)}
              {loading === false && purchasedTicket.status === "fail" && (
                <ErrorFallback
                  resetErrorBoundary={() => console.log("error")}
                />
              )}
              {loading === false &&
                purchasedTicket.status === "success" &&
                purchasedTicket.data.data.length > 0 && (
                  <>
                    <Table
                      list={purchasedTicket.data.data}
                      dropdownList={dropDownMenuPurchased}
                      type="purchased"
                    />
                  </>
                )}
              {loading === false &&
                purchasedTicket.status === "success" &&
                purchasedTicket.data.data.length === 0 && (
                  <NoData description="No Purchased Event Ticket yet." />
                )}
            </>
          )}
        </div>
      </section>
    </PrivateGenericLayout>
  );
};

export default MyTicket;
