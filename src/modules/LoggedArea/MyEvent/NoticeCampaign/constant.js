import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, Menu } from "antd";
import style from "./index.module.scss";
import { FiPlus } from "react-icons/fi";

const dropdownList = () => {
  return (
    <Menu className={style.menu_container}>
      <Menu.Item key="1" className={style.menu_item} icon={<FiPlus />}>
        <span className={style.ml_1}>Add Proxy Manually</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" className={style.menu_item} icon={<FiPlus />}>
        <span className={style.ml_1}>Accredit user through Biometric</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" className={style.menu_item} icon={<FiPlus />}>
        <span className={style.ml_1}>Attach Keypad</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" className={style.menu_item} icon={<FiPlus />}>
        <span className={style.ml_1}>Revoke access to Poll</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" className={style.menu_item} icon={<FiPlus />}>
        <span className={style.ml_1}>Revoke access to questions</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" className={style.menu_item} icon={<FiPlus />}>
        <span className={style.ml_1}>Remove User</span>
      </Menu.Item>
    </Menu>
  );
};

export const columnCampaign = [
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
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (text) => {
      return (
        <span
          style={
            text === "Accepted"
              ? {
                  color: "#09974D",
                  padding: "5px 15px",
                  backgroundColor: "#F2FAF6",
                  borderRadius: "5px",
                }
              : {
                  color: "#FBA904",
                  padding: "5px 15px",
                  backgroundColor: "#FFFBF2",
                  borderRadius: "5px",
                }
          }
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
          style={
            text !== "Pending Acceptance"
              ? {
                  color: "#09974D",
                  padding: "5px 15px",
                  backgroundColor: "#F2FAF6",
                  borderRadius: "5px",
                }
              : {
                  color: "#FBA904",
                  padding: "5px 15px",
                  backgroundColor: "#FFFBF2",
                  borderRadius: "5px",
                }
          }
        >
          {text}
        </span>
      );
    },
  },
  {
    title: (
      <Dropdown
        overlay={dropdownList}
        trigger={["click"]}
        placement="bottomRight"
      >
        <BsThreeDotsVertical />
      </Dropdown>
    ),
    key: "action",
    render: () => (
      <span style={{ display: "flex", justifyContent: "center" }}>
        <Dropdown
          overlay={dropdownList}
          trigger={["click"]}
          placement="bottomRight"
        >
          <BsThreeDotsVertical />
        </Dropdown>
      </span>
    ),
  },
];

export const dataCampaign = [
  {
    key: "1",
    name: "John Bosko",
    email: "johnboskoq@gmail.com",
    status: "Pending Acceptance",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "Pending Acceptance",
  },
  {
    key: "2",
    name: "Jonathan Jane",
    email: "jonathan_jane@gmail.com",
    status: "Accepted",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "Proxy",
  },
  {
    key: "3",
    name: "Jonathan Jane",
    email: "jonathan_jane@gmail.com",
    status: "Pending Acceptance",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "Pending Acceptance",
  },
  {
    key: "4",
    name: "Jonathan Jane",
    email: "jonathan_jane@gmail.com",
    status: "Accepted",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "USSD",
  },
  {
    key: "5",
    name: "Jonathan Jane",
    email: "jonathan_jane@gmail.com",
    status: "Pending Acceptance",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "Pending Acceptance",
  },
  {
    key: "6",
    name: "Jonathan Jane",
    email: "jonathan_jane@gmail.com",
    status: "Pending Acceptance",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "Pending Acceptance",
  },
  {
    key: "7",
    name: "Jonathan Jane",
    email: "jonathan_jane@gmail.com",
    status: "Accepted",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "Web",
  },
  {
    key: "8",
    name: "Jonathan Jane",
    email: "jonathan_jane@gmail.com",
    status: "Accepted",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "Web",
  },
  {
    key: "9",
    name: "Jonathan Jane",
    email: "jonathan_jane@gmail.com",
    status: "Accepted",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "Web",
  },
  {
    key: "10",
    name: "Jonathan Jane",
    email: "jonathan_jane@gmail.com",
    status: "Accepted",
    accountNumber: "2347878778",
    phone: "08044332200",
    nominee: "John Brown",
    channel: "Web",
  },
];
