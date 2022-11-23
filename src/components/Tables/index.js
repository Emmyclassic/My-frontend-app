import {
  Dropdown,
  Menu,
  Pagination,
  Select,
  Table,
  Tooltip,
  Modal,
  Spin,
} from "antd";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { createListHandler } from "../../api/attendeeHandler";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import { FiPlus, FiSearch, FiTrash, FiSend } from "react-icons/fi";
import { MdFileDownload, MdFileUpload } from "react-icons/md";
import Search from "../SearchComponent";
import style from "./index.module.scss";

const { Option } = Select;

const SearchIcon = ({ toggleInput }) => (
  <span
    className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
    onClick={toggleInput}
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    }}
  >
    <FiSearch className={style.uploadIcon} color="#5c6574" />
  </span>
);

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return (
      <Link to="#" className={style.paginateNav}>
        <span>
          <BiCaretLeft color="#EF3125" size={18} />
        </span>
        <span>Previous</span>
      </Link>
    );
  }
  if (type === "next") {
    return (
      <Link to="#" className={style.paginateNav}>
        <span>
          <BiCaretRight color="#EF3125" size={18} />
        </span>
        <span>Next</span>
      </Link>
    );
  }
  return originalElement;
}

const DataTable = ({
  data,
  columns,
  usePagination = false,
  title = "Attendee",
  handleSearch,
  showPagination = false,
  csvFileName,
  csvHeader,
  showFilter,
  customTitle,
  addAttendee,
  handleFileUpload,
  toggleAddProxyModal,
  showIcon,
  addAttendeeText = "Add Proxy manually",
  selectedRowHandler,
  bulkDeleteHandler,
  eventId,
  uploadType = "attendee",
  lists,
  reloadList,
  adddAttendeeToList,
  showSearch = true,
}) => {
  const [selectionType] = useState("checkbox");
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatistVisible, setCreatistVisible] = useState(false);

  // const [addProxyVisible] = useState(false);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRowHandler) {
        selectedRowHandler(selectedRows);
      }

      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      // Column configuration not to be checked
      name: record.id,
    }),
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div>
          <span>
            <FiPlus />
          </span>
          <span>{addAttendeeText}</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createListHandler(eventId, { name: listName });
      if (reloadList) {
        reloadList();
      }
      setLoading(false);
      setCreatistVisible(false);
    } catch (ex) {
      setLoading(false);
      Swal.fire("oops!", "Something went wrong", "error");
    }
  };

  return (
    <div className={style.tableContainerPoll}>
      <div className={style.tableHeader}>
        <div className={style.tableHeader_title} style={{ ...customTitle }}>
          {title}
        </div>
        {showSearch && (
          <div className={style.tableHeader_iconList}>
            <Search
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
              handleChange={handleSearch}
              inputSearchStyle={{ padding: "15px" }}
              icon={SearchIcon}
            />

            {showIcon && (
              <>
                {/* <Tooltip placement="right" title="Send Message">
                <button
                  className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
                >
                  <MdSend className={style.uploadIcon} />
                </button>
              </Tooltip> */}
                <Dropdown overlay={menu} placement="bottomRight" arrow>
                  <span
                    // type="button"
                    onClick={() =>
                      toggleAddProxyModal && toggleAddProxyModal(true)
                    }
                    className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
                  >
                    <FiPlus className={style.uploadIcon} />
                  </span>
                </Dropdown>
                <Tooltip placement="right" title="Bulk delete">
                  <span
                    // type="button"
                    onClick={bulkDeleteHandler}
                    className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
                  >
                    <FiTrash className={style.uploadIcon} />
                  </span>
                </Tooltip>

                <Tooltip placement="right" title="Download Template">
                  <CSVLink
                    headers={csvHeader}
                    data={[]}
                    filename={csvFileName}
                    target="_blank"
                  >
                    <span
                      className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
                    >
                      <MdFileDownload className={style.uploadIcon} />
                    </span>
                  </CSVLink>
                </Tooltip>

                <Tooltip placement="right" title="Upload Excel">
                  <label
                    htmlFor={
                      uploadType === "attendee"
                        ? "actual-btn"
                        : "actual-btn-proxy"
                    }
                    style={{ marginBottom: 0 }}
                  >
                    <span
                      className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
                    >
                      <MdFileUpload className={style.uploadIcon} />
                    </span>
                  </label>

                  <input
                    type="file"
                    id={
                      uploadType === "attendee"
                        ? "actual-btn"
                        : "actual-btn-proxy"
                    }
                    hidden
                    accept=".xlsx,.csv,.xls"
                    onChange={handleFileUpload}
                  />
                </Tooltip>
              </>
            )}
          </div>
        )}
      </div>
      {showFilter && (
        <div className={style.filterContainer}>
          <div className={style.filterContainer_left}>
            <div className={style.listWrapper}>
              {lists.length
                ? lists.map((item) => (
                    <div
                      key={item.id}
                      className={style.listItem}
                      onClick={() => adddAttendeeToList(item)}
                    >
                      <span>{item.name}</span>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={style.filterContainer_right}>
            <Select
              style={{ width: 120, marginRight: "10px" }}
              defaultValue="Filter"
            >
              <Option value="Filter">Filter</Option>
            </Select>
            <button
              className={style.newList}
              onClick={() => setCreatistVisible(true)}
            >
              + Create List
            </button>
          </div>
        </div>
      )}

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={usePagination}
        rowClassName="customTableRow"
      />
      {showPagination && (
        <div className={style.paginateBox}>
          <Pagination total={40} itemRender={itemRender} />
        </div>
      )}
      <Modal
        title={
          <div className={style.addProxyHeader}>
            <div className={style.proxyIconBox}>
              <span className={style.questionBox}>
                <FiSend color="#fff" />
              </span>
            </div>
            <div className={style.addTitle}>Create List</div>
            <div className={style.addDesc}>
              Group attendees by a category nam
            </div>
          </div>
        }
        centered
        footer={null}
        onCancel={() => setCreatistVisible(false)}
        visible={creatistVisible}
        closable={true}
        bodyStyle={{ backgroundColor: "#9999992b" }}
      >
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit}>
            <p>Name</p>
            <input
              style={{
                width: "100%",
                borderRadius: "3px",
                padding: "1rem",
                outline: "none",
              }}
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <div className={style.form__input_wrap}>
              <button
                type="submit"
                className={style.form__input_submit_request}
                onClick={() => {
                  if (!listName) {
                    Swal.fire("oops!", "Text cannot be empty", "error");
                  }
                }}
              >
                {loading ? <Spin size="large" /> : "Create List"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default DataTable;
