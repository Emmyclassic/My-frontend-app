import { Dropdown, Menu, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdStats } from "react-icons/io";
import { MdFileDownload, MdSend } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchDonationPayment,
  getDonationById,
} from "../../../../api/eventHandler";
import Arrow from "../../../../components/Dashboard/Arrow";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import style from "./index.module.scss";
import "./ticketDetail.scss";

const DonationDetail = () => {
  const datas = [
    {
      name: "Seun Fashore",
      email: "seun@africaprudential.org",
      phone_number: "08033445566",
      account_number: "608033445566",
      date: "2021-03-21",
      ticket_type: "free",
      amount: "20,000",
    },
  ];
  const [donation, setDonation] = useState();
  const [loadingDonation, setLoadingDonation] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState();
  const [donationPayment, setDonationPayment] = useState([]);
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
            data={datas}
            csvHeader={[
              { label: "Attendee Name", key: "name" },
              { label: "Atteendee Email", key: "email" },
              { label: "Attendee Phone Number", key: "phone_number" },
              { label: "Attendee Account", key: "account_number" },
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
      render: (text, record) => (
        <span className={style.amount}>
          {moment(record.created_at).format("DD MMMM YYYY")}
        </span>
      ),
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

  const { loading } = useSelector((state) => state.ui);
  const history = useHistory();

  const { id } = useParams();
  const geDonationDetail = async (id) => {
    setLoadingDonation(true);
    const { data } = await getDonationById(id);
    setLoadingDonation(false);
    setDonation(data.data);
  };

  const getDonationPayment = async (id) => {
    setLoadingPayment(true);
    const {
      data: { data },
    } = await fetchDonationPayment(id);
    setLoadingPayment(false);
    setDonationPayment(data);
  };
  useEffect(() => {
    geDonationDetail(id);
    getDonationPayment(id);
  }, [id]);
  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <Arrow />
          <DashboardLeftHeaderNav
            title="Donation Details"
            subtitle="All donation details and donor names are shown here"
          />
        </>
      }
      RightNav={
        <div
          className={style.request_payout}
          onClick={() => history.push("/MyTicket/payout")}
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
        {loadingDonation === false && donation && (
          <>
            <div className={style.summary_session__top}>
              <div>Donations</div>
              <div className={style.summary_session__top_icon}>
                <IoMdStats color="#fff" />
              </div>
            </div>
            <div className={style.summary_session__bottom}>
              <div className={style.summary_session__bottom__box}>
                <p>Amount donated</p>
                <div>
                  <span className={style.summary_session__bottom__box__title}>
                    {donation.amount_donated}
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
                <p>No. Of Donors</p>
                <div>
                  <span className={style.summary_session__bottom__box__title}>
                    {donation.number_of_donors}
                  </span>
                </div>
              </div>
              <div
                className={`${style.summary_session__bottom__box} ${style.border_left}`}
              >
                <p>Net Fees</p>
                <div>
                  <span className={style.summary_session__bottom__box__title}>
                    {donation.net_fees}
                  </span>
                  <sup>NGN</sup>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {loadingPayment === false &&
        donationPayment &&
        donationPayment.length > 0 && (
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection }}
            dataSource={donationPayment}
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

export default DonationDetail;
