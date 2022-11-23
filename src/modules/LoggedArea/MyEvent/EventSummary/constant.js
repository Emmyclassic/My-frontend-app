import moment from "moment";
import React from "react";
import { FiMoreVertical, FiTrash2 } from "react-icons/fi";
import "./index.scss";

export const columnsProxy = [
  {
    title: "Participant Name",
    dataIndex: "participant_name",
    key: "participant_name",
  },
  {
    title: "Account Number",
    dataIndex: "account_number",
    key: "account_number",
  },
  {
    title: "Number of shares",
    key: "voting_right",
    dataIndex: "voting_right",
  },
  {
    title: "Nominee",
    key: "nominated_proxy_name",
    dataIndex: "nominated_proxy_name",
    render: (text) => {
      return (
        <span
          style={{
            // color: "#FF4040",
            padding: "5px 15px",
            backgroundColor: "#Fafafa",
            borderRadius: "5px",
          }}
        >
          {text}
        </span>
      );
    },
  },
  {
    title: "Channel",
    key: "channel",
    dataIndex: "channel",
    render: (text) => {
      return (
        <span
          style={{
            // color: "#FF4040",
            padding: "5px 15px",
            backgroundColor: "#Fafafa",
            borderRadius: "5px",
          }}
        >
          {text}
        </span>
      );
    },
  },
  // {
  //   title: "Types of Vote",
  //   dataIndex: "status",
  //   key: "status",
  //   render: (text, record) => {
  //     if (record.status === "Against")
  //       return (
  //         <span
  //           style={{
  //             color: "#FF4040",
  //             padding: "5px 15px",
  //             backgroundColor: "#FFF4F4",
  //             borderRadius: "5px",
  //           }}
  //         >
  //           {record.status}
  //         </span>
  //       );
  //     if (record.status === "Abondon")
  //       return (
  //         <span
  //           style={{
  //             color: "#FBA904",
  //             padding: "5px 15px",
  //             backgroundColor: "#FFFBF2",
  //             borderRadius: "5px",
  //           }}
  //         >
  //           {record.status}
  //         </span>
  //       );
  //     if (record.status === "For")
  //       return (
  //         <span
  //           style={{
  //             color: "#09974D",
  //             padding: "5px 15px",
  //             backgroundColor: "#09974D30",
  //             borderRadius: "5px",
  //           }}
  //         >
  //           {record.status}
  //         </span>
  //       );
  //   },
  // },

  {
    title: "Remove Proxy",
    key: "action",
    render: (text, record) => (
      <span style={{ display: "flex", justifyContent: "center" }}>
        <FiTrash2 />
      </span>
    ),
  },
];

// proxy
export const dataPoxy = [
  {
    key: "1",
    name: "John Brown",
    email: 32,
    status: "Against",
    accountNumber: "2347878778",
    noOfShow: "90",
    nominee: "John Brown",
    channel: "Online",
  },
  {
    key: "2",
    name: "John Brown",
    email: 32,
    status: "Against",
    accountNumber: "2347878778",
    noOfShow: "56",
    nominee: "John Brown",
    channel: "Physical",
  },
  {
    key: "3",
    name: "John Brown",
    email: 32,
    status: "Against",
    accountNumber: "2347878778",
    noOfShow: "10",
    nominee: "John Brown",
    channel: "Online",
  },
  {
    key: "4",
    name: "John Brown",
    email: 32,
    status: "For",
    accountNumber: "2347878778",
    noOfShow: "67",
    nominee: "John Brown",
    channel: "Physical",
  },
  {
    key: "5",
    name: "John Brown",
    email: 32,
    status: "Abondon",
    accountNumber: "2347878778",
    noOfShow: "88",
    nominee: "John Brown",
    channel: "Online",
  },
  {
    key: "6",
    name: "John Brown",
    email: 32,
    status: "For",
    accountNumber: "2347878778",
    noOfShow: "67",
    nominee: "John Brown",
    channel: "Physical",
  },
  {
    key: "7",
    name: "John Brown",
    email: 32,
    status: "Against",
    accountNumber: "2347878778",
    noOfShow: "88",
    nominee: "John Brown",
    channel: "Online",
  },
];

export const data = [
  {
    key: "1",
    name: "John Brown",
    email: 32,
    status: "success",
    phoneNumber: "+2347878778",
  },
  {
    key: "2",
    name: "John Brown",
    email: 32,
    status: "success",
    phoneNumber: "+2347878778",
  },
  {
    key: "3",
    name: "John Brown",
    email: 32,
    status: "success",
    phoneNumber: "+2347878778",
  },
  {
    key: "4",
    name: "John Brown",
    email: 32,
    status: "success",
    phoneNumber: "+2347878778",
  },
];

export const columns = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Participant Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Mobile Number",
    key: "phone_number",
    dataIndex: "phone_number",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text, record) => (
      <span
        style={{
          color: "#FBA904",
          padding: "5px 15px",
          backgroundColor: "#FFFBF2",
          borderRadius: "5px",
        }}
      >
        Processing Attendence
      </span>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <FiMoreVertical />
      </span>
    ),
  },
];

export const columnsEventTicket = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Ticket Name",
    dataIndex: "ticketName",
    key: "ticketName",
    render: (text, record) => (
      <div>
        <div className="event-type-wrap">
          <span className="event-type">{record.label}</span> -{" "}
          <span className="event-title">{record.name}</span>
        </div>
        <div className="event-type-footer">
          Sales End: {moment(record.sales_ends).format("DD MMMM YYYY")}
        </div>
      </div>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Sold",
    key: "sold",
    dataIndex: "sold",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text, record) => {
      if (record.status === "sold")
        return (
          <span
            style={{
              color: "#09974D",
            }}
          >
            {record.status}
          </span>
        );
      if (record.status === "available")
        return (
          <span
            style={{
              color: "#FBA904",
            }}
          >
            {record.status}
          </span>
        );
      if (record.status === "outOfStock")
        return (
          <span
            style={{
              color: "#09974D",
            }}
          >
            {record.status}
          </span>
        );
    },
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <FiMoreVertical />
      </span>
    ),
  },
];

// event Data
export const eventData = [
  {
    key: "1",
    ticketName: "John Brown",
    quantity: 100,
    status: "sold",
    price: "₦20,000",
    sold: 0,
  },
  {
    key: "2",
    ticketName: "John Brown",
    quantity: 120,
    status: "sold",
    price: "₦20,000",
    sold: 0,
  },
  {
    key: "3",
    ticketName: "John Brown",
    quantity: 100,
    status: "sold",
    price: "₦20,000",
    sold: 0,
  },
];

export const columnsEventDonation = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Donation Goal",
    dataIndex: "goal",
    key: "goal",
    render: (text, record) => (
      <div>
        <div className="event-type-wrap">
          <span className="event-type">Donation Goal </span> -{" "}
          <span className="event-title">{record.title}</span>
        </div>
        <div className="event-type-footer">
          {moment(record.created_at).format("DD MMMM YYYY")} at{" "}
          {moment(record.created_at).format("hh:mm a")}
        </div>
      </div>
    ),
  },
  {
    title: "Donors",
    dataIndex: "donors",
    key: "donors",
  },
  {
    title: "Amount",
    dataIndex: "goal",
    key: "goal",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text, record) => {
      if (record.status === "Active")
        return (
          <span
            style={{
              color: "#09974D",
            }}
          >
            {record.status}
          </span>
        );
      if (record.status === "available")
        return (
          <span
            style={{
              color: "#FBA904",
            }}
          >
            {record.status}
          </span>
        );
      if (record.status === "close")
        return (
          <span
            style={{
              color: "#09974D",
            }}
          >
            {record.status}
          </span>
        );
    },
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <FiMoreVertical />
      </span>
    ),
  },
];

// Donation Data
export const donationData = [
  {
    key: "1",
    donationGoal: "John Brown",
    donors: 100,
    status: "open",
    amount: "₦20,000",
  },
  {
    key: "2",
    donationGoal: "John Brown",
    donors: 100,
    status: "open",
    amount: "₦20,000",
  },
  {
    key: "3",
    donationGoal: "John Brown",
    donors: 100,
    status: "open",
    amount: "₦20,000",
  },
];
