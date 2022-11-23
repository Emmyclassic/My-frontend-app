import { Spin } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { updateTicket } from "../../../../api/ticketHandler";
import AlertResponse from "../../../../Auth/AuthModalForm/AlertResponse";
import SingleSelect from "../../../../components/Cards/SingleSelect";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
// import Select from "react-select";
import { getTicketAction } from "../state/action";
import style from "./index.module.scss";

// const customStyles = {
//   control: (base) => ({
//     ...base,
//     height: 46,
//     minHeight: 35,
//   }),
// };

// const salesEndOpt = [
//   { value: "immediate", label: "Event Start Date and Time" },
//   { value: "specific", label: "On a specific date" },
// ];
// const salesStartOpt = [
//   { value: "immediate", label: "Immediately after publishing" },
//   { value: "specific", label: "On a specific date" },
// ];

function EditTicket() {
  const history = useHistory();
  const { ticketDetail } = useSelector((state) => state.ticket);
  const [responseData, setResponseData] = useState();
  const { loading } = useSelector((state) => state.ui);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [ticketLabel, setTicketLabel] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketPrice, setTicketPrice] = useState(null);
  const [ticketStatus, setTicketStatus] = useState(null);
  const [ticketAmount, setTicketAmount] = useState(null);
  const [ticketAvailable, setTicketAvailable] = useState(null);
  const [salesEnd] = useState("specific");
  const [salesEndDay, setSalesEndDay] = useState("");
  const [salesEndTime, setSalesEndTime] = useState("");
  const [salesStart] = useState("specific");
  const [salesStartDay, setSalesStartDay] = useState("");
  const [salesStartTime, setSalesStartTime] = useState("");
  const { id } = useParams();
  useEffect(() => {
    dispatch(getTicketAction(id));
  }, [id]);
  useEffect(() => {
    if (
      !loading &&
      ticketDetail &&
      ticketDetail.status === "success" &&
      ticketDetail.data.data
    ) {
      const currentTicket = ticketDetail.data.data;

      setTicketLabel(currentTicket.label);
      setTicketType(currentTicket.ticket_type.id);
      setTicketName(currentTicket.name);
      setTicketPrice(currentTicket.price);
      setTicketAmount(currentTicket.quantity);
      setTicketStatus(currentTicket.active_status);
      setTicketAvailable(currentTicket.total_guests_tickets);
      setSalesEndDay(currentTicket.sales_ends.split(" ")[0]);
      setSalesEndTime(currentTicket.sales_ends.split(" ")[1]);
      setSalesStartDay(currentTicket.sales_starts.split(" ")[0]);
      setSalesStartTime(currentTicket.sales_starts.split(" ")[1]);
    }
  }, [ticketDetail?.data?.data]);
  const handleTicketAmount = (e) => {
    const newVal = e.target.value.replace(/,/g, "");
    setTicketAmount(newVal);
  };

  const handleTicketAvailable = (e) => {
    const numbers = /^[0-9]+$/;
    if (e.target.value.match(numbers)) {
      setTicketAvailable(e.target.value);
    }
    if (e.target.value === "") {
      setTicketAvailable("");
    }
  };
  const handleTicketPrice = (e) => {
    const newVal = e.target.value.replace(/,/g, "");
    setTicketPrice(newVal);
  };
  const handleSelect = (tab) => {
    const tabCode = tab === "Opened" ? 1 : 0;
    //  setTicketType(tab);
    setTicketStatus(tabCode);
  };
  const handleTicketSelect = (tab) => {
    if (tab.toLowerCase() === "free") {
      setTicketPrice(0);
      setTicketType(1);
    } else {
      setTicketType(2);
    }
  };
  const onClose = (e) => setResponseData();

  const handleUpdateTicket = async () => {
    const payload = {
      name: ticketName,
      ticket_type_id: ticketType,
      event_id: ticketDetail.data.data.event_id,
      sales_starts: `${moment(salesStartDay).format(
        "DD/MM/YYYY"
      )} ${salesStartTime}`,
      sales_ends: `${moment(salesEndDay).format("DD/MM/YYYY")} ${salesEndTime}`,
      quantity: ticketAmount,
      active_status: ticketStatus,
      total_guests_tickets: ticketAvailable,
      price: ticketPrice,
    };
    if (ticketAmount <= ticketAvailable) {
      Swal.fire(
        "Oops!!!",
        "Amount of Ticket must be greater than Amount of Ticket Available",
        "error"
      );
      return;
    }
    if (!ticketAmount || !ticketAvailable) {
      Swal.fire("Oops!!!", "Fill required fields", "error");
      return;
    }
    try {
      setIsLoading(true);
      const res = await updateTicket(payload, id);

      if (res.status === 200) {
        setResponseData({
          data: res.data.data,
          status: "success",
          message: "Ticket updated successfully",
        });
        // history.push("/MyTicket");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const error = err.response?.data ?? "Something went wrong";
      setResponseData({ data: error, status: "fail", message: error });
    }
  };
  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <span className={style.containerNav_iconBox} onClick={history.goBack}>
            <MdKeyboardArrowLeft size={20} />
          </span>
          <DashboardLeftHeaderNav
            title="Edit Ticket"
            subtitle="Please note tickets bought before edit will still stand."
          />
        </>
      }
    >
      <div className={style.main}>
        {loading && (
          <div style={{ width: "450px" }}>
            <Skeleton width={"100%"} height={45} />
            <Skeleton width={"100%"} height={45} />
            <Skeleton width={"100%"} height={45} />
            <Skeleton width={"100%"} height={45} />
          </div>
        )}
        {loading === false &&
          ticketDetail &&
          ticketDetail.status === "success" &&
          ticketDetail.data.data && (
            <>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label htmlFor="label" className={style.form__input_label}>
                    Label
                  </label>
                  <input
                    className={style.form__input}
                    type="text"
                    readOnly
                    value={ticketLabel}
                    name="label"
                    onChange={(e) => setTicketLabel(e.target.value)}
                    style={{ backgroundColor: "#F4F6F7" }}
                  />
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="firstName"
                    className={style.form__input_label}
                  >
                    Ticket Type
                  </label>
                  <SingleSelect
                    preSelect={ticketDetail.data?.data?.ticket_type.name}
                    handleSelect={handleTicketSelect}
                    clickAble={true}
                  />
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_inline}>
                  <div className={style.form__input_box}>
                    <label
                      className={style.form__input_label}
                      htmlFor="ticketName"
                    >
                      Ticket Name
                    </label>
                    <div className={style.input__date}>
                      <input
                        className={`${style.form__input} ${style.form__input_date}`}
                        type="text"
                        name="ticketName"
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={style.form__input_box}>
                    <label
                      htmlFor="ticketPrice"
                      className={style.form__input_label}
                    >
                      Price
                    </label>
                    <div className={style.input__date}>
                      <NumberFormat
                        value={ticketPrice}
                        thousandSeparator={true}
                        // prefix="NGN"
                        className={`${style.form__input}`}
                        onChange={handleTicketPrice}
                        readOnly={ticketType === "Free" && true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="ticketAmount"
                    className={style.form__input_label}
                  >
                    Amount of Ticket
                  </label>
                  <div className={style.input__date}>
                    <NumberFormat
                      value={ticketAmount}
                      thousandSeparator={true}
                      // prefix="NGN"
                      className={`${style.form__input}`}
                      onChange={handleTicketAmount}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="ticketAvailable"
                    className={style.form__input_label}
                  >
                    Amount of Ticket Available
                  </label>
                  <div className={style.input__date}>
                    <input
                      className={`${style.form__input}`}
                      type="text"
                      name="ticketAvailable"
                      placeholder="80"
                      value={ticketAvailable}
                      onChange={handleTicketAvailable}
                      // onChange={(e) => setTicketAvailable(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="ticketStaus"
                    className={style.form__input_label}
                  >
                    Ticket Status
                  </label>
                  <SingleSelect
                    firstLabel="Opened"
                    secondLabel="Closed"
                    handleSelect={handleSelect}
                    preSelect={
                      ticketDetail.data.data.active_status === 1
                        ? "Opened"
                        : "Closed"
                    }
                  />
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="salesStart"
                    className={style.form__input_label}
                  >
                    Sales Start
                  </label>
                  {/* <Select
                    styles={customStyles}
                    onChange={handleStartDate}
                    options={salesStartOpt}
                    defaultValue={salesStartOpt[1]}
                  ></Select> */}
                  {salesStart === "specific" && (
                    <div
                      className={style.form__input_wrap}
                      style={{ marginTop: "2rem" }}
                    >
                      <div className={style.form__input_inline}>
                        <div className={style.form__input_box}>
                          <div className={style.input__date}>
                            <input
                              className={`${style.form__input} ${style.form__input_date}`}
                              type="date"
                              name="startDate"
                              value={salesStartDay}
                              onChange={(e) => setSalesStartDay(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className={style.form__input_box}>
                          <div className={style.input__date}>
                            <input
                              className={`${style.form__input}`}
                              type="time"
                              name="startDateTime"
                              value={salesStartTime}
                              onChange={(e) => {
                                const startTime = `${e.target.value}:00`;
                                setSalesStartTime(startTime);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <div className={style.form__input_box}>
                  <label
                    htmlFor="ticketAmount"
                    className={style.form__input_label}
                  >
                    Sales End
                  </label>
                  {/* <Select
                    styles={customStyles}
                    defaultValue={salesEndOpt[1]}
                    onChange={handleEndDate}
                    options={salesEndOpt}
                  ></Select> */}
                  {salesEnd === "specific" && (
                    <div
                      className={style.form__input_wrap}
                      style={{ marginTop: "2rem" }}
                    >
                      <div className={style.form__input_inline}>
                        <div className={style.form__input_box}>
                          <div className={style.input__date}>
                            <input
                              className={`${style.form__input} ${style.form__input_date}`}
                              type="date"
                              name="endDate"
                              value={salesEndDay}
                              onChange={(e) => setSalesEndDay(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className={style.form__input_box}>
                          <div className={style.input__date}>
                            <input
                              className={`${style.form__input}`}
                              type="time"
                              name="endDateTime"
                              value={salesEndTime}
                              onChange={(e) => {
                                const startEnd = `${e.target.value}:00`;
                                setSalesEndTime(startEnd);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={style.form__input_wrap}>
                <button
                  onClick={handleUpdateTicket}
                  type="button"
                  disabled={isLoading}
                  className={style.form__input_submit_request}
                >
                  {isLoading && <Spin size="large" color="#fff" />}
                  {!isLoading ? "Update Ticket" : "Updating..."}
                </button>
              </div>
              {responseData && (
                <AlertResponse
                  status={responseData.status}
                  data={responseData.data}
                  onClose={onClose}
                  message={responseData.message}
                />
              )}
            </>
          )}
      </div>
    </PrivateGenericLayout>
  );
}

EditTicket.propTypes = {
  id: PropTypes.string,
};

export default EditTicket;
