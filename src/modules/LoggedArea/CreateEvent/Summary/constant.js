import { DeleteOutlined, EyeFilled, PlusOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Spin, Alert } from "antd";
import { useForm } from "react-hook-form";
import moment from "moment";
import NumberFormat from "react-number-format";
import React, { useState, useCallback, useEffect } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { FiMoreVertical, FiPlus, FiTrash2 } from "react-icons/fi";
import { IoKeypad } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
// import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../../../../components/FormInput";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
// import { addProxyValidation } from "../../../../utils/Validation/addProxyValidation";
import {
  getProxyAction,
  removeAttendeeAction,
  removeProxyAction,
} from "../Attendee/state/action";
import EditDonation from "../Payment/Donation/EditDonation";
import style from "./index.module.scss";
import { MemoResolutionPicker, MemoElectionPicker } from "../../EventGallery";
import "./index.scss";
import resolver from "../../../../utils/promiseWrapper";
import { updateProxy } from "../../../../api/attendeeHandler";

const DeleteComponent = ({ record, deleteHandler }) => {
  const dispatch = useDispatch();
  console.log(record);
  const deleteItem = (record) => {
    Swal.fire({
      title: "Remove Proxy",
      text: "Proxy will be remove",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#eddcd2",
      confirmButtonText: "Remove",
      customClass: {
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeProxyAction(record));
      }
    });
  };
  return (
    <div className={style.actionMenu} onClick={() => deleteItem(record)}>
      <span>
        <FiTrash2 />
      </span>{" "}
      <span>Delete Proxy</span>
    </div>
  );
};

const DeleteAttendeeComponent = ({ record, deleteHandler }) => {
  const dispatch = useDispatch();
  console.log(record);
  const deleteItem = (record) => {
    Swal.fire({
      title: "Remove Attendee",
      text: "Attendee will be remove",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#eddcd2",
      confirmButtonText: "Remove",
      customClass: {
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeAttendeeAction(record));
      }
    });
  };
  return (
    <span
      style={{ display: "flex", justifyContent: "center" }}
      onClick={() => deleteItem(record)}
    >
      <FiTrash2 /> Delete Attendee
    </span>
  );
};

export const electionSummaryColumnPdf = [
  {
    title: "id",
    dataIndex: "key",
  },
  {
    title: "Candidate Name",
    dataIndex: "participant_name",
  },
  {
    title: "Number of Votes for Candidate",
    dataIndex: "account_number",
    key: "account_number",
  },
  {
    title: "Percentage of Votes",
    key: "voting_right",
    dataIndex: "voting_right",
  },
];
export const electionSummaryColumnExcel = [
  {
    title: "id",
    dataIndex: "key",
  },
  {
    title: "Date Of Vote",
    dataIndex: "participant_name",
  },
  {
    title: "Time Of Vote",
    dataIndex: "account_number",
    key: "account_number",
  },
  {
    title: "Channel",
    key: "voting_right",
    dataIndex: "voting_right",
  },
  {
    title: "Attendee Name",
    key: "voting_right",
    dataIndex: "voting_right",
  },
  {
    title: "Account No",
    key: "voting_right",
    dataIndex: "voting_right",
  },
  {
    title: "Election Title",
    key: "voting_right",
    dataIndex: "voting_right",
  },
  {
    title: "Candidate",
    key: "voting_right",
    dataIndex: "voting_right",
  },
];

export const columnsProxy = (resolutions, elections) => [
  {
    title: "id",
    dataIndex: "key",
  },
  {
    title: "Participant Name",
    dataIndex: "participant_name",
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
  // {
  //   title: "Channel",
  //   key: "channel",
  //   dataIndex: "channel",
  //   render: (text) => {
  //     return (
  //       <span
  //         style={{
  //           // color: "#FF4040",
  //           padding: "5px 15px",
  //           backgroundColor: "#Fafafa",
  //           borderRadius: "5px",
  //         }}
  //       >
  //         {text}
  //       </span>
  //     );
  //   },
  // },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown
        overlay={() => (
          <ProxyActionMenu
            record={record}
            resolutions={resolutions}
            elections={elections}
          />
        )}
        placement="bottomRight"
      >
        <span>
          <FiMoreVertical />
        </span>
      </Dropdown>
    ),
  },
];

// proxy

export const columns = [
  {
    title: "Id",
    dataIndex: "key",
  },
  {
    title: "Participant Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile Number",

    dataIndex: "phone_number",
  },
  {
    title: "Account Number",

    dataIndex: "account_number",
  },
  {
    title: "Number of units",

    dataIndex: "vote_rights",
  },

  {
    title: "Action",

    render: (text, record) => <DeleteAttendeeComponent record={record} />,
  },
];

const objElection = [];
const obj = [];

const ProxyActionMenu = ({ record, resolutions, elections }) => {
  const [editProxyVisible, setEditProxyVisible] = useState(false);
  const [proxyVotersRight, setProxyVotersRight] = useState();
  const [resolutionSelector, setResolutionSelector] = useState([]);
  const [electionSelector, setElectionSelector] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue] = useState("");
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();

  const dispatch = useDispatch();
  console.log("resolution => ", resolutions);
  console.log("resolutionSelector =>", resolutionSelector);
  console.log("records =>", record);

  const quorumProxyNumberHandle = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setProxyVotersRight(newVal);
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const resolutionHandler = (value, selectedResolution, idx) => {
    const objIndex = obj.findIndex(
      (item) => item.resolution_id === selectedResolution.id
    );
    if (objIndex !== -1) {
      obj[objIndex].resolution_vote = value;
    } else {
      const resolution = {
        resolution_id: selectedResolution.id,
        resolution_vote: value,
      };
      obj.push(resolution);
    }

    // setResolutionList(obj);
  };

  const dispenseCallback = React.useCallback(resolutionHandler, []);

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const addNewResolution = (idx) => {
    const resolutionArr = [...resolutionSelector];

    const currentProxy = resolutions[idx];
    if (currentProxy) {
      const exist = resolutionArr.find((item) => item.id === currentProxy.id);
      if (!exist) {
        resolutionArr.push(currentProxy);
        setResolutionSelector(resolutionArr);
      }
    }
  };

  const electionHandler = (value, selectedResolution, idx) => {
    const objIndex = objElection.findIndex(
      (item) => item.election_id === selectedResolution.id
    );
    if (objIndex !== -1) {
      objElection[objIndex].resolution_vote = value;
    } else {
      const resolution = {
        election_id: selectedResolution.id,
        election_vote: value,
      };
      objElection.push(resolution);
    }

    // setResolutionList(obj);
  };

  const addNewElection = (idx) => {
    const resolutionArr = [...electionSelector];

    const currentProxy = elections[idx];
    if (currentProxy) {
      const exist = resolutionArr.find((item) => item.id === currentProxy.id);
      if (!exist) {
        resolutionArr.push(currentProxy);
        setElectionSelector(resolutionArr);
      }
    }
  };

  const addNewElectionCb = useCallback(addNewElection, [electionSelector]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(addProxyValidation),
    defaultValues: {
      participantName: record?.participant_name,
      accountNumber: record?.account_number,
      nominatedProxy: record?.nominated_proxy_name,
    },
  });

  useEffect(() => {
    if (resolutions && resolutions.length) {
      setResolutionSelector(resolutions);
    }
  }, [resolutions?.length]);
  useEffect(() => {
    if (elections && elections.length) {
      setElectionSelector(elections);
    }
  }, [elections?.length]);

  useEffect(() => {
    if (successResponse || errorResponse) {
      setTimeout(() => {
        setErrorResponse();
        setSuccessResponse();
      }, 500);
    }
  }, [successResponse, errorResponse]);

  const onSubmit = async (data) => {
    const attendeeList = {
      participant_name: data.participantName,
      account_number: data.accountNumber,
      phone_number: data.phoneNumber,
      voting_right: Number(proxyVotersRight),
      nominated_proxy_name: data?.nominatedProxy ?? proxyVotersRight,
      setup_proxy_form: true,
      resolutions: obj,
      elections: objElection,
      eventId: record.event_id,
    };

    setLoading(true);

    const [result, error] = await resolver(
      updateProxy(attendeeList, record.id)
    );
    console.log("error =>", error);
    setLoading(false);

    if (result) {
      dispatch(getProxyAction("", record.event_id));
      setSuccessResponse({
        message: "Proxy updated successfully",
        type: "success",
      });
    } else {
      setErrorResponse({ message: "Failed", type: "error" });
    }
    setEditProxyVisible(false);

    console.log("attendeeList => ", attendeeList);
  };
  return (
    <>
      <Modal
        title={
          <div className={style.addProxyHeader}>
            <div className={style.proxyIconBox}>
              <span className={style.questionBox}>
                <AiFillQuestionCircle color="#fff" />
              </span>
            </div>
            <div className={style.addTitle}>EDIT PROXY</div>
            <div className={style.addDesc}>
              Enter information of your attendee
            </div>
          </div>
        }
        centered
        footer={null}
        visible={editProxyVisible}
        onCancel={() => setEditProxyVisible(false)}
        closable={true}
        bodyStyle={{ backgroundColor: "#9999992b" }}
      >
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              placeholder="Enter participant name..."
              labelTitle="Participant Name"
              inputType="text"
              isRequired={false}
              errors={errors}
              name="participantName"
              watch={watch}
              register={register("participantName")}
              showCount={false}
            />
            <FormInput
              placeholder="Enter Account Number"
              labelTitle="Participant Account Number"
              inputType="text"
              isRequired={false}
              errors={errors}
              name="accountNumber"
              watch={watch}
              maxLength={10}
              register={register("accountNumber")}
              showCount
            />
            <div className={style.form__input_wrap}>
              <div className={style.form__input_box}>
                <label htmlFor="firstName" className={style.form__input_label}>
                  Participant Voting rights (Holdings/Units)
                </label>
                <NumberFormat
                  value={proxyVotersRight}
                  thousandSeparator={true}
                  defaultValue={record?.voting_right}
                  // prefix="NGN"
                  placeholder="0"
                  className="form__input"
                  onChange={quorumProxyNumberHandle}
                  onKeyPress={preventMinus}
                  onPaste={preventPasteNegative}
                  required
                />
              </div>
            </div>
            <FormInput
              placeholder="Enter voters right"
              labelTitle="Nominated Proxy Name"
              inputType="text"
              isRequired={false}
              errors={errors}
              name="nominatedProxy"
              watch={watch}
              maxLength={100}
              register={register("nominatedProxy")}
              showCount={false}
            />

            <div className={style.form__input_wrap}>
              {resolutionSelector.length > 0 &&
                resolutionSelector.map((item, idx) => (
                  <MemoResolutionPicker
                    key={item.id}
                    item={item}
                    idx={idx}
                    selectedValue={selectedValue}
                    data={resolutionSelector}
                    resolutionHandler={(e) =>
                      dispenseCallback(e.target.value, item)
                    }
                    addNewResolution={() => addNewResolution(idx + 1)}
                  />
                ))}
            </div>
            <div className={style.form__input_wrap}>
              {electionSelector.length > 0 &&
                electionSelector.map((item, idx) => (
                  <MemoElectionPicker
                    key={item.id}
                    item={item}
                    idx={idx}
                    selectedValue={selectedValue}
                    data={electionSelector}
                    elections={elections}
                    resolutionHandler={(e, idx) =>
                      electionHandler(e.target.value, item, idx)
                    }
                    addNewElection={addNewElectionCb}
                    objElection={objElection}
                  />
                ))}
            </div>
            <div className={style.form__input_wrap}>
              <button
                type="submit"
                className={style.form__input_submit_request}
              >
                {loading ? <Spin size="large" color="#fff" /> : "Update"}
              </button>
              {successResponse && (
                <Alert
                  message={successResponse.message}
                  type="success"
                  showIcon
                  closable
                  onClose={() => setSuccessResponse()}
                />
              )}

              {errorResponse && (
                <Alert
                  message={errorResponse.message}
                  type="error"
                  showIcon
                  closable
                  onClose={() => setErrorResponse()}
                />
              )}
            </div>
          </form>
        </div>
      </Modal>
      <Menu>
        <Menu.Item onClick={() => setEditProxyVisible(true)}>
          <div className={style.actionMenu}>
            <span>
              <FiPlus />
            </span>{" "}
            <span>Edit Proxy</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <DeleteComponent record={record} />
        </Menu.Item>
      </Menu>
    </>
  );
};
const AttendeeActionMenu = () => {
  const [keybardOpen, setKeybardOpen] = useState(false);
  return (
    <>
      <Modal
        title={
          <div className={style.addProxyHeader}>
            <div className={style.proxyIconBox}>
              <span className={style.questionBox}>
                <AiFillQuestionCircle color="#fff" />
              </span>
            </div>
            <div className={style.addTitle}>ATTACH KEYPAD</div>
            <div className={style.addDesc}>
              Enter keypad information of your attendee
            </div>
          </div>
        }
        centered
        footer={null}
        onCancel={() => setKeybardOpen(false)}
        visible={keybardOpen}
        closable={true}
        bodyStyle={{ backgroundColor: "#9999992b" }}
        style={{ width: "100px" }}
        width={400}
        zIndex={9999}
      >
        <div className={style.formContainer}>
          <form>
            <FormInput
              placeholder="Jonathan Jane"
              labelTitle="Name"
              inputType="text"
              isRequired={false}
              name="participantName"
              showCount={false}
            />
            <FormInput
              placeholder="328862"
              labelTitle="Keypad"
              inputType="text"
              name="Keypad"
              showCount={false}
            />

            <div className={style.form__input_wrap}>
              <button
                type="submit"
                className={style.form__input_submit_request}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Menu>
        <Menu.Item>
          <div className={style.actionMenu}>
            <span>
              <FiPlus />
            </span>{" "}
            <span>Accredit Physical Attendee</span>
          </div>
        </Menu.Item>

        <Menu.Item onClick={() => setKeybardOpen(true)}>
          <div className={style.actionMenu}>
            <span>
              <IoKeypad />
            </span>
            <span>Attach Keyboard</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className={`${style.actionMenu} ${style.actionMenu_del}`}>
            <span>
              <FaTimes />
            </span>
            <span>Revoke access to poll</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className={`${style.actionMenu} ${style.actionMenu_del}`}>
            <span>
              <FaTimes />
            </span>
            <span>Revoke access to question</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className={`${style.actionMenu} ${style.actionMenu_del}`}>
            <span>
              <MdDelete />
            </span>
            <span>Remove user</span>
          </div>
        </Menu.Item>
      </Menu>
    </>
  );
};

export const editColumns = [
  {
    title: "Id",
    dataIndex: "key",
  },
  {
    title: "Participant Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile Number",

    dataIndex: "phone_number",
  },
  {
    title: "Account Number",

    dataIndex: "account_number",
  },
  {
    title: "No of units",

    dataIndex: "vote_rights",
  },
  {
    title: "Status",

    dataIndex: "status",
  },

  {
    title: "Action",

    render: (text, record) => (
      <Dropdown overlay={() => <AttendeeActionMenu />} placement="bottomRight">
        <span>
          <FiMoreVertical />
        </span>
      </Dropdown>
    ),
  },
];

const ViewDetails = ({ id, viewHandler }) => {
  // console.log({ id });

  return (
    <Menu.Item key="1" className={style.menu_item} icon={<EyeFilled />}>
      <span className={style.ml_1} onClick={viewHandler}>
        View Details
      </span>
    </Menu.Item>
  );
};
const EditTicket = (props) => {
  const { id, ticketTitle, customProp, editHandler, ...other } = props;

  return (
    <>
      <Menu.Item
        key="2"
        className={style.menu_item}
        icon={<PlusOutlined />}
        {...other}
      >
        <span className={style.ml_1} onClick={editHandler}>
          {ticketTitle || "Edit Ticket"}
        </span>
      </Menu.Item>
    </>
  );
};

const DeleteTicket = ({ id, deleteHandler, deleteTitle }) => {
  return (
    <Menu.Item
      key="3"
      className={style.menu_item_delete}
      icon={<DeleteOutlined />}
      onclick={() => console.log("dropdown tag clicked...")}
    >
      <span className={style.ml_1} onClick={deleteHandler}>
        {deleteTitle || "Delete Ticket"}
      </span>
    </Menu.Item>
  );
};
const TicketDropDown = ({
  id,
  viewHandler,
  editHandler,
  deleteHandler,
  ticketTitle,
  deleteTitle,
}) => {
  return (
    <React.Fragment>
      <Menu className={style.menu_container}>
        <EditTicket
          id={id}
          editHandler={editHandler}
          ticketTitle={ticketTitle}
        />
        <Menu.Divider />
        <ViewDetails id={id} viewHandler={viewHandler} />
        <Menu.Divider />
        <DeleteTicket
          id={id}
          deleteHandler={deleteHandler}
          deleteTitle={deleteTitle}
        />
      </Menu>
    </React.Fragment>
  );
};
const DonationActions = ({ record, reload }) => {
  const history = useHistory();
  const [visibleDonation, setVisibleDonation] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [, setReloadDonation] = useState(true);
  const ticketHandler = (e) => {
    setVisibleDonation(false);
  };

  const donationVisible = (item) => {
    setVisibleDonation(true);
    setSelectedItem(item);
  };
  return (
    <>
      <TicketDropDown
        ticketId={record.id}
        ticketTitle="Edit Donation"
        deleteTitle="Delete Donation"
        deleteHandler={() => {}}
        viewHandler={() => history.push(`/Donation/detail/${record.id}`)}
        editHandler={() => donationVisible(record)}
      />
      <LeftDrawerModal
        visible={visibleDonation}
        closeModal={() => setVisibleDonation(false)}
        tagName="Allow Donation"
        modalHeight="100vh"
        headerTitle="Allow Attendees to make donations"
      >
        <EditDonation
          item={selectedItem}
          ticketHandler={ticketHandler}
          closeDonationModal={() => {
            setReloadDonation((prev) => !prev);
            setVisibleDonation(false);
          }}
        />
      </LeftDrawerModal>
    </>
  );
};

const TickerActions = ({ record }) => {
  const history = useHistory();
  return (
    <>
      <TicketDropDown
        ticketId={record.id}
        deleteHandler={() => {}}
        viewHandler={() => history.push(`/MyTicket/detail/${record.id}`)}
        editHandler={() => history.push(`/MyTicket/edit/${record.id}`)}
      />
    </>
  );
};

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
      if (record.status === "In-Active")
        return (
          <span
            style={{
              color: "#FBA904",
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
      <Dropdown
        overlay={() => <TickerActions record={record} />}
        trigger={["click"]}
        placement="bottomRight"
      >
        <span>
          <FiMoreVertical />
        </span>
      </Dropdown>
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
export const columnsEventDonationFunc = (reload) => {
  alert("hdhdhdhdhdh");
  console.log("reload", reload);
  return [
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
            <span className="event-type">Donation Goalnjnjjj </span> -{" "}
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
      title: "Donors   fwwfwfwff",
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
        <Dropdown
          overlay={() => <DonationActions record={record} reload={reload} />}
          trigger={["hover"]}
          placement="bottomRight"
        >
          <span>
            <FiMoreVertical />
          </span>
        </Dropdown>
      ),
    },
  ];
};
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
      <Dropdown
        overlay={() => <DonationActions record={record} />}
        trigger={["hover"]}
        placement="bottomRight"
      >
        <span>
          <FiMoreVertical />
        </span>
      </Dropdown>
    ),
  },
];
