import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import { Dropdown, Table, Menu } from "antd";
import Arrow from "../../../../components/Dashboard/Arrow";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdSend, MdFileDownload } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import { CSVLink } from "react-csv";
import { getTicketSalesAction } from "../state/action";

import style from "./index.module.scss";
import "./ticketDetail.scss";

const TicketDetail = () => {
  const accountStatus = localStorage.getItem("pAccount");
  console.log({ accountStatus });
  // const datas = [
  //   {
  //     name: "Seun Fashore",
  //     email: "seun@africaprudential.org",
  //     phone_number: "08033445566",
  //     account_number: "608033445566",
  //     date: "2021-03-21",
  //     ticket_type: "free",
  //     amount: "20,000",
  //   },
  // ];
  const SendEmail = () => {
    const history = useHistory();
    return (
      <Menu.Item key="2" className={style.menu_item} icon={<MdSend />}>
        <span className={style.ml_1} onClick={() => history.push("/Email")}>
          Send Email
        </span>
      </Menu.Item>
    );
  };
  const headerDropDown = () => {
    return (
      <Menu className={style.menu_container}>
        <Menu.Item
          key="1"
          icon={<MdFileDownload />}
          className={style.menu_item}
        >
          <DownloadCsv
            data={ticketSalesDetail.data.data.participants}
            csvHeader={[
              { label: "Attendee Name", key: "name" },
              { label: "Atteendee Email", key: "email" },
              { label: "Date", key: "date" },
              { label: "Ticket Type", key: "ticket_type" },
              { label: "Amount", key: "amount" },
            ]}
            csvFileName="ticket.csv"
          />
        </Menu.Item>
        <Menu.Divider />
        <SendEmail />
      </Menu>
    );
  };

  const rowDropDown = () => {
    return (
      <Menu className={style.menu_container}>
        <SendEmail />
      </Menu>
    );
  };

  const columns = [
    {
      title: "#",
      dataIndex: "#",
      key: "#",
    },
    {
      title: "Participant Name",
      dataIndex: "name",
      key: "name",
      width: "17%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "25%",
      key: "date",
    },
    {
      title: "Ticket Type",
      dataIndex: "ticket_type",
      width: "25%",
      key: "ticket_type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "17%",
      key: "amount",
      render: (text) => <span className={style.amount}>{text}</span>,
    },
    {
      title: () => (
        <Dropdown
          overlay={headerDropDown}
          trigger={["click"]}
          placement="bottomRight"
        >
          <span>
            <BsThreeDotsVertical size="18" className={style.three_dots} />
          </span>
        </Dropdown>
      ),
      dataIndex: "icon",
      width: "10%",
      key: "icon",
      render: () => (
        <Dropdown
          overlay={rowDropDown}
          trigger={["click"]}
          placement="bottomRight"
        >
          <span>
            <BsThreeDotsVertical size="18" className={style.three_dots} />
          </span>
        </Dropdown>
      ),
    },
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`);
      // console.log("selectedRows: ", selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };
  const { ticketSalesDetail } = useSelector((state) => state.ticket);
  const { loading } = useSelector((state) => state.ui);
  // const { bankAccount } = useSelector((state) => state.bankDetails);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log({ ticketSalesDetail });

  useEffect(() => {
    dispatch(getTicketSalesAction(id));
  }, [id]);
  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <Arrow />
          <DashboardLeftHeaderNav
            title="Ticket Details"
            subtitle="Please note tickets bought before edit will still stand."
          />
        </>
      }
      RightNav={
        <div
          className={style.request_payout}
          onClick={() => {
            if (accountStatus !== "set") {
              Swal.fire(
                "Oops!",
                "Fill your account details on Profile page before request for payout",
                "error"
              );
              return;
            }
            history.push("/MyTicket/payout");
          }}
        >
          Request Payout
        </div>
      }
    >
      <div className={style.summary_session}>
        {loading && (
          <div style={{ width: "100%" }}>
            <Skeleton width={"100%"} height={45} />
            <Skeleton width={"100%"} height={45} />
            <Skeleton width={"100%"} height={45} />
            <Skeleton width={"100%"} height={45} />
          </div>
        )}
        {loading === false &&
          ticketSalesDetail &&
          ticketSalesDetail.status === "success" &&
          ticketSalesDetail.data.data && (
            <>
              <div className={style.summary_session__top}>
                <div>Ticket Sales</div>
                <div className={style.summary_session__top_icon}>
                  <IoMdStats color="#fff" />
                </div>
              </div>
              <div className={style.summary_session__bottom}>
                <div className={style.summary_session__bottom__box}>
                  <p>Gross Sales</p>
                  <div>
                    <span className={style.summary_session__bottom__box__title}>
                      {ticketSalesDetail.data.data.gross_sales}
                    </span>
                    <sup>NGN</sup>
                  </div>
                </div>
                <div
                  className={`
                    ${style.summary_session__bottom__box}
                    ${style.border_left}
                    ${style.center}
                  `}
                >
                  <p>Tickets sold</p>
                  <div>
                    <span className={style.summary_session__bottom__box__title}>
                      {ticketSalesDetail.data.data.tickets_sold}
                    </span>
                  </div>
                </div>
                <div
                  className={`${style.summary_session__bottom__box} ${style.border_left}`}
                >
                  <p>Net Fees</p>
                  <div>
                    <span className={style.summary_session__bottom__box__title}>
                      {ticketSalesDetail.data.data.net_sales}
                    </span>
                    <sup>NGN</sup>
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
      {loading === false &&
        ticketSalesDetail &&
        ticketSalesDetail.status === "success" &&
        ticketSalesDetail.data.data && (
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={ticketSalesDetail.data.data.participants}
            className={style.table}
            pagination={false}
            rowClassName={style.table_row}
          />
        )}
    </PrivateGenericLayout>
  );
};

export const DownloadCsv = ({
  csvHeader,
  csvFileName,
  data,
  label = "Download List",
}) => {
  return (
    <CSVLink
      headers={csvHeader}
      data={data}
      filename={csvFileName}
      target="_blank"
    >
      <span className={style.ml_1}>{label}</span>
    </CSVLink>
  );
};

export default TicketDetail;
