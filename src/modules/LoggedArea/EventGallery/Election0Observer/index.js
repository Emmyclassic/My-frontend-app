import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { FiPlus, FiSearch, FiTrash, FiMoreVertical } from "react-icons/fi";
import { MdFileDownload, MdFileUpload, MdDelete } from "react-icons/md";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Tooltip, Dropdown, Menu, Modal, Spin } from "antd";
import { useFileUpload } from "../../../../hooks/useFileUpload";
import { FaEnvelope, FaPen } from "react-icons/fa";
import {
  createNewObserver,
  getAllObserver,
  deleteObserver,
  updateObserver,
  // downloadList,
  searchObserver,
  observerNotification,
  bulkUpload,
  // bulkDelete,
} from "../../../../api/electionObserverHandler";
import { CSVLink } from "react-csv";
import File from "../../../../assets/excel/election observers-template.csv";

function ElectionObserver({ eventId }) {
  const [allObservers, setAllObservers] = useState([]);
  const [uploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [relodObserver, setRelodObserver] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searching, setSearching] = useState(false);
  const fileUploader = useFileUpload();
  const initialState = {
    name: "",
    email: "",
    organization: "",
    phone: 0,
    id: "",
  };
  const [keybardOpen, setKeybardOpen] = useState(false);
  const [issCreateObserver, setIssCreateObserver] = useState(true);
  const [observerData, setObserverData] = useState(initialState);
  // const [checkboxIds, setCheckboxIds] = useState([]);
  // const [check, setCheck] = useState([]);
  // const [fillCheckbox, setFillCheckbox] = useState(false);

  useEffect(() => {
    apiRequest("allObserver");
  }, [relodObserver]);

  useEffect(() => {
    const timer = setTimeout(function () {
      setError(false);
      setSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [error, success]);

  const apiRequest = async (type, reqData) => {
    console.log(
      type,
      reqData,
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    if (type === "create") {
      setLoading(true);
      setMessage("Creating observer...");
      console.log(uploading, "excel create upload");
      try {
        const {
          data: { data },
        } = await createNewObserver({ observers: reqData }, eventId);
        console.log(data, "allObservers and data created");
        setAllObservers([...allObservers, data[0]]);
        setLoading(false);
        setMessage("Create successfull.");
        setSuccess(true);
      } catch (err) {
        console.log(err);
        setError(true);
        setMessage("Error: All fields are required.");
        setLoading(false);
      }
    } else if (type === "editObserver") {
      setLoading(true);
      setMessage("Editing observer ...");
      try {
        await updateObserver(reqData, eventId, reqData.id);
        setRelodObserver(!relodObserver);
        setLoading(false);
        setMessage("Edit successfull.");
        setSuccess(true);
      } catch (err) {
        console.log(err);
        setMessage("Error: Something went wrong.");
        setError(true);
        setLoading(false);
      }
    } else if (type === "allObserver") {
      setLoadingAll(true);
      setFetchError(false);
      try {
        const {
          data: { data },
        } = await getAllObserver("_", eventId);
        setAllObservers(data);
        setLoadingAll(false);
      } catch (err) {
        console.log(err);
        setMessage("Something went wrong");
        setLoadingAll(false);
        setFetchError(true);
      }
    } else if (type === "deleteObserver") {
      console.log(reqData, "deleteObserver reqData log");
      setLoading(true);
      setMessage("Deleting observer ...");
      try {
        await deleteObserver({ ids: reqData }, eventId);
        console.log("deleted ....reqData ");
        setRelodObserver(!relodObserver);
        setLoading(false);
        setMessage("Delete successfull.");
        setSuccess(true);
      } catch (err) {
        console.log(err);
        setMessage("Error: no observer selected.");
        setError(true);
        setLoading(false);
      }
    } else if (type === "observerNotification") {
      setLoading(true);
      setMessage("Sending invite ...");
      try {
        await observerNotification(reqData, eventId);
        console.log("notified ....reqData ");
        setLoading(false);
        setMessage("Invite sent successfully.");
        setSuccess(true);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    } else if (type === "searchObserver") {
      setSearching(true);
      try {
        const {
          data: { data },
        } = await searchObserver(reqData, eventId);
        setAllObservers(data);
        setSearching(false);
      } catch (err) {
        console.log(err);
        setSearching(false);
      }
    } else if (type === "bulkUpload") {
      try {
        const {
          data: { data },
        } = await bulkUpload(reqData, eventId);
        console.log(data, "bulkUpload data ");
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleExcelDownloadData = () => {
    if (allObservers.length >= 1) {
      return allObservers.map((list, index) => {
        const { name, email, phone, organization } = list;
        return {
          name,
          email,
          phone,
          organization,
        };
      });
    } else {
      return [];
    }
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };
  const handleInvite = (val, inviteId) => {
    if (val === "single") {
      apiRequest("observerNotification", { ids: [inviteId] });
    } else {
      apiRequest("observerNotification", {
        ids: allObservers.map((observer, index) => observer.id),
      });
    }
  };
  const handleChange = (e) => {
    setObserverData({ ...observerData, [e.target.name]: e.target.value });
  };
  const handleFileUpload = async (e) => {
    const result = await fileUploader.uploadFile(e);
    console.log(result, result.length, "observerList result observer");
    if (result.length < 1) {
      setMessage("Error: kindly upload the right template.");
      setError(true);
    } else {
      apiRequest("create", result);
    }
  };
  const handleObserverSubmit = (val) => {
    console.log(observerData, "submit");
    setKeybardOpen(false);
    setObserverData(initialState);
    if (val === "create") {
      apiRequest(val, [observerData]);
    } else {
      apiRequest("editObserver", observerData);
    }
  };
  const handleEdit = (val, index) => {
    setKeybardOpen(true);
    setIssCreateObserver(false);
    setObserverData(allObservers[index]);
  };
  const handleDeleteOne = (val, delId) => {
    apiRequest("deleteObserver", [delId]);
  };

  const downloadTemplate = () => {
    const excel = File;
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.download = `${excel}`;
    link.href = `${excel}`;
    link.click();
  };

  const [isCheckedAll, setIscheckedAll] = useState(false);
  let checkedArray = [];
  // const issCHcked = (val) => {
  //   console.log(checkedArray.includes(val), "check logg");
  //   return checkedArray.includes(val);
  // };
  const handleChecked = (val) => {
    console.log(checkedArray.includes(val), "is true or false check logg");

    if (val === "checkAll") {
      if (isCheckedAll) {
        checkedArray = [];
      } else {
        checkedArray = allObservers.map((observer, index) => observer.id);
      }
      setIscheckedAll(!isCheckedAll);
    } else {
      if (checkedArray.includes(val)) {
        checkedArray = checkedArray.filter((id, index) => id !== val);
      } else {
        checkedArray.push(val);
      }
    }

    console.log(checkedArray, "ccccchhhh");

    // if (!fillCheckbox) {
    //   console.log("nooooo fill chek");
    //   setCheckboxIds(allObservers.map((observer, index) => observer.id));
    // const iddd = allObservers.map((observer, index) => observer.id);
    // console.log(iddd, "firsttt");
    // console.log(checkboxIds, "checkboxIds");
    // setFillCheckbox(true);
    // }
    // setCheck([...check, val]);
    // setCheckboxIds(allObservers.map((observer, index) => observer.id));
    // console.log(checked, checkboxIds, "checked log", setChecked);
  };

  return (
    <div className={style.container}>
      <div className={style.head}>
        <h3>Election Observer</h3>
        <div className={style.tableHeader_iconList}>
          <p
            className={style.meassage}
            style={{ color: error ? "red" : success ? "green" : "#17A2B8" }}
          >
            {loading && message}
            {error && message}
            {success && message}
          </p>
          {search && (
            <div className={style.search}>
              <span
                onClick={() => {
                  setSearch(false);
                  setRelodObserver(!relodObserver);
                }}
              >
                x
              </span>
              <input
                type="text"
                placeholder="search .."
                onChange={handleSearch}
              />
              <button onClick={() => apiRequest("searchObserver", searchData)}>
                {searching ? "Searching..." : "Search"}
              </button>
            </div>
          )}
          <div
            className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
            onClick={() => setSearch(!search)}
          >
            <FiSearch />
          </div>
          <Tooltip placement="right" title="Add Election Observer">
            <span
              className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              onClick={() => {
                setIssCreateObserver(true);
                setObserverData(initialState);
                setKeybardOpen(true);
              }}
            >
              <FiPlus className={style.uploadIcon} />
            </span>
          </Tooltip>
          <Tooltip placement="right" title="Bulk delete">
            <span
              // type="button"
              onClick={() => apiRequest("deleteObserver", checkedArray)}
              className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
            >
              <FiTrash className={style.uploadIcon} />
            </span>
          </Tooltip>
          <Tooltip placement="right" title="">
            <Dropdown
              overlay={() => (
                <Menu>
                  <Menu.Item key="1">
                    <span onClick={downloadTemplate}>Download Template</span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <CSVLink
                      headers={[
                        {
                          label: "name",
                          key: "name",
                        },

                        {
                          label: "email",
                          key: "email",
                        },

                        {
                          label: "phone",
                          key: "phone",
                        },
                        {
                          label: "organization",
                          key: "organization",
                        },
                      ]}
                      data={handleExcelDownloadData()}
                      filename="Election-Observers-List.csv"
                      target="_blank"
                    >
                      <span>Download Observer List</span>
                    </CSVLink>
                  </Menu.Item>
                </Menu>
              )}
              trigger={["click"]}
              placement="bottomRight"
            >
              <span
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <MdFileDownload className={style.uploadIcon} />
              </span>
            </Dropdown>
          </Tooltip>
          <Tooltip placement="right" title="Upload Excel">
            <label htmlFor={"observer"} style={{ marginBottom: 0 }}>
              <span
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <MdFileUpload className={style.uploadIcon} />
              </span>
            </label>
            <input
              type="file"
              id={"observer"}
              hidden
              accept=".xlsx,.csv,.xls"
              onChange={handleFileUpload}
            />
          </Tooltip>
        </div>
      </div>
      <div className={style.create_wrapper}>
        <h3></h3>
        <button onClick={() => handleInvite("all")}>
          Send Observers Invite
        </button>
      </div>
      <div className={style.table}>
        <div className={style.thead}>
          <h3>
            <input
              type="checkbox"
              // checked={checked.includes("checkAll")}
              onChange={() => handleChecked("checkAll")}
              name="checkAll"
              disabled={true}
            />
            <span> SN</span>
          </h3>
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Phone Number</h3>
          <h3>Organization</h3>
          <h3>Action</h3>
        </div>
        <div className={style.table_body}>
          {!loadingAll &&
            allObservers.length > 0 &&
            allObservers?.map((observer, index) => (
              <div key={index} className={style.table_row}>
                <p>
                  <input
                    type="checkbox"
                    // checked={isCheckedAll || checkedArray.includes(observer.id)}
                    // checked={checked.includes(observer.id)}
                    value={observer.id}
                    onClick={() => handleChecked(observer.id)}
                    name="check"
                  />
                  <span> {index + 1}</span>
                </p>
                <p>{observer.name}</p>
                <p>{observer.email}</p>
                <p>{observer.phone}</p>
                <p>{observer.organization}</p>
                <p>
                  <Dropdown
                    overlay={() => (
                      <Menu>
                        <Menu.Item
                          onClick={() => handleEdit(observer.id, index)}
                          key="1"
                        >
                          <div
                            className={`${style.actionMenu} ${style.actionMenu_del}`}
                          >
                            <span className={style.iconAction}>
                              <FaPen />
                            </span>
                            <span>Edit observer</span>
                          </div>
                        </Menu.Item>
                        <Menu.Item
                          key="2"
                          onClick={() => handleInvite("single", observer.id)}
                        >
                          <div
                            className={`${style.actionMenu} ${style.actionMenu_del}`}
                          >
                            <span className={style.iconAction}>
                              <FaEnvelope />
                            </span>
                            <span>Send invite</span>
                          </div>
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => handleDeleteOne(index, observer.id)}
                          key="3"
                        >
                          <div
                            className={`${style.actionMenu} ${style.actionMenu_del}`}
                          >
                            <span className={style.iconAction}>
                              <MdDelete />
                            </span>
                            <span>Remove observer</span>
                          </div>
                        </Menu.Item>
                      </Menu>
                    )}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <span>
                      <FiMoreVertical onClick={(id) => id} />
                    </span>
                  </Dropdown>
                </p>
              </div>
            ))}
          {loadingAll && (
            <div className={style.respond_wrapper}>
              <Spin size="large" color="#fff" />
            </div>
          )}
          {!loadingAll && allObservers.length < 1 && (
            <div className={style.noData}>
              <p>No Observer</p>
            </div>
          )}
          {fetchError && (
            <div className={style.fetchError}>
              <p>something went wrong</p>
              <button onClick={() => setRelodObserver(!relodObserver)}>
                reload
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        title={
          <div className={style.addProxyHeader}>
            <div className={style.proxyIconBox}>
              <span className={style.questionBox}>
                <AiFillQuestionCircle color="#fff" />
              </span>
            </div>
            <div className={style.addTitle}>
              <p>
                {" "}
                {issCreateObserver
                  ? "ADD ELECTION OBSERVER"
                  : "EDIT ELECTION OBSERVER"}
              </p>
              {issCreateObserver && (
                <p>Enter information of election observer</p>
              )}
            </div>
          </div>
        }
        centered
        footer={null}
        onCancel={() => setKeybardOpen(false)}
        visible={keybardOpen}
        closable={true}
        bodyStyle={{ backgroundColor: "#9999992b" }}
      >
        <div className={style.formContainer}>
          <form>
            <p>Name</p>
            <input
              type="text"
              style={{
                width: "100%",
                borderRadius: "3px",
                outline: "none",
              }}
              value={observerData.name}
              name="name"
              onChange={handleChange}
              required
            />
            <p>Email</p>
            <input
              type="text"
              style={{
                width: "100%",
                borderRadius: "3px",
                outline: "none",
              }}
              value={observerData.email}
              name="email"
              onChange={handleChange}
              required
            />
            <p>Phone</p>
            <input
              type="number"
              style={{
                width: "100%",
                borderRadius: "3px",
                outline: "none",
              }}
              value={observerData.phone}
              name="phone"
              onChange={handleChange}
            />
            <p>Organization</p>
            <input
              type="text"
              style={{
                width: "100%",
                borderRadius: "3px",
                outline: "none",
              }}
              value={observerData.organization}
              name="organization"
              onChange={handleChange}
            />
            <div className={style.form__input_wrap}>
              <button
                // disabled={disabled}
                type="button"
                onClick={() =>
                  handleObserverSubmit(issCreateObserver ? "create" : "edit")
                }
                className={style.form__input_submit_request}
              >
                {issCreateObserver ? "Create Observer" : "Update Observer"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ElectionObserver;
