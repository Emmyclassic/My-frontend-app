import React, { useState } from "react";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Arrow from "../../../../components/Dashboard/Arrow";
import { Select, Table, Dropdown, Menu, Tooltip } from "antd";
import { columnCampaign, dataCampaign } from "./constant";
import { MdSend, MdFileUpload } from "react-icons/md";
import style from "./index.module.scss";
import { FiPlus } from "react-icons/fi";
const { Option } = Select;

const proxyDropdownList = () => {
  return (
    <Menu className={style.menu_container}>
      <Menu.Item key="1" className={style.menu_item} icon={<FiPlus />}>
        <span className={style.ml_1}>Add Attendee Manually</span>
      </Menu.Item>
      <Menu.Item key="1" className={style.menu_item} icon={<MdFileUpload />}>
        <span className={style.ml_1}>Upload Excel Template</span>
      </Menu.Item>
    </Menu>
  );
};

const messageDropdownList = () => {
  return (
    <Menu className={style.menu_container}>
      <Menu.Item key="1" className={style.menu_item}>
        <span>Send SMS to Attendees</span>
      </Menu.Item>
      <Menu.Item key="1" className={style.menu_item}>
        <span>Send Email to Attendees</span>
      </Menu.Item>
    </Menu>
  );
};

const dropdownList = () => {
  return (
    <Menu className={style.menu_container}>
      <Menu.Item key="1" className={style.menu_item}>
        <span>Download Excel Template</span>
      </Menu.Item>
    </Menu>
  );
};

function NoticeCampaign() {
  const [selectionType] = useState("checkbox");
  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <Arrow />
          <DashboardLeftHeaderNav
            title="Notice & Campaign"
            subtitle="Create and send notices & Campaigns to attendees"
          />
        </>
      }
      RightNav={""}
    >
      <div className={style.analytics}>
        <div className={style.analytics_header}>
          <div className={style.analytics_header_left}>Attendee</div>
          <div className={style.analytics_header_right}>
            {/* <Search
              containerStyle={{
                width: "100%",
                padding: "0px",
                display: "flex",
                position: "relative",
              }}
              iconBoxStyle={{
                display: "flex",
                marginTop: "5px",
              }}
              inputSearchStyle={{ padding: "0px" }}
              icon={SearchIcon}
            /> */}
            <Tooltip placement="right" title="Download Excel Template">
              <Dropdown
                overlay={dropdownList}
                trigger={["click"]}
                placement="bottomRight"
              >
                <span className={style.analytics_iconBox}>
                  <MdSend size={18} className={style.uploadIcon} />
                </span>
              </Dropdown>
            </Tooltip>
            <div>
              <Dropdown
                overlay={proxyDropdownList}
                trigger={["click"]}
                placement="bottomRight"
              >
                <button className={`${style.add_attendee}`}>
                  Add Attendee
                </button>
              </Dropdown>
            </div>
            <div>
              <Dropdown
                overlay={messageDropdownList}
                trigger={["click"]}
                placement="bottomRight"
              >
                <button className={`${style.send_message}`}>
                  Send Message
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className={style.filterContainer}>
          <div className={style.filterContainer_left}>
            <button className={style.left_btn}> All</button>
          </div>
          <div className={style.filterContainer_right}>
            <Select
              style={{ width: 120, marginRight: "10px" }}
              defaultValue="Filter"
            >
              <Option value="Filter">Filter</Option>
            </Select>
            <button className={style.newList}>+ Create List</button>
          </div>
        </div>
        <div className={style.analytics_content}>
          <Table
            columns={columnCampaign}
            pagination={false}
            dataSource={dataCampaign}
            rowSelection={{
              type: selectionType,
            }}
          />
        </div>
        {/* <div className={style.paginateBox}>
          <Pagination total={40} itemRender={itemRender} />
        </div> */}
      </div>
    </PrivateGenericLayout>
  );
}

export default NoticeCampaign;
