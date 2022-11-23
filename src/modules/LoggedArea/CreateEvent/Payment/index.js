import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import OtpInput from "react-otp-input";
import {
  fetchDonation,
  removeDonationHandler,
} from "../../../../api/eventHandler";
import { fetchEventTickets } from "../../../../api/ticketHandler";
import ResolutionItem from "../../../../components/Cards/ResolutionItem";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
import Donation from "./Donation";
import EditDonation from "./Donation/EditDonation";
import style from "./index.module.scss";
import "./index.scss";
import CreateTicket from "./Ticket";
import EditTicket from "./Ticket/TicketForm/EditTicketForm";

const Payment = ({ nextStep }) => {
  const [visible, setVisible] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [resolutionDetail, setResolutionDetail] = useState();
  const [visibleDonation, setVisibleDonation] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [singleTicket, setSingleTicket] = useState();
  const [tab, setTab] = useState("createTicket");
  const [reloadTicket, setReloadTicket] = useState(false);
  const [reloadDonation, setReloadDonation] = useState(false);
  const [ticketModal, setTicketModal] = useState();
  const [otp, setOtp] = useState("");
  const [selectedList, setSelectedList] = useState([]);

  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

  console.log("ddddd", tickets);

  const ticketHandler = (e) => {
    setVisible(false);
    setTab("bankDetail");
  };

  const bankVerifyHandler = () => {
    setTab("optTab");
  };

  // const openDetailModal = (item) => {
  //   setTicketModal(true);
  //   setSingleTicket(item);
  // };
  const fetchTicketHandler = async (eventId) => {
    try {
      const {
        data: { data },
      } = await fetchEventTickets(eventId);

      setTickets(data);
    } catch (ex) {}
  };
  const fetchDonationHandler = async () => {
    try {
      const {
        data: { data },
      } = await fetchDonation();
      // setTickets(data);

      setSelectedList(data);
    } catch (ex) {}
  };

  useEffect(() => {
    fetchTicketHandler(currentEvent.id);
  }, [reloadTicket]);

  useEffect(() => {
    fetchDonationHandler();
  }, [reloadDonation]);

  const openSingleModal = (item) => {
    setResolutionDetail(item);
    setOpenDetailModal(true);
  };

  const openEditTicketModal = (item) => {
    setSingleTicket(item);
    setTicketModal(true);
  };

  const removeDonation = async () => {
    try {
      const donations = selectedList.filter(
        (item) => item.id !== resolutionDetail.id
      );
      setSelectedList(donations);
      setOpenDetailModal(false);

      await removeDonationHandler(resolutionDetail.id);
    } catch (err) {
      setSelectedList([...selectedList, resolutionDetail]);
      setOpenDetailModal(false);
    }
  };

  return (
    <section className={style.main}>
      {tab === "bankDetail" && (
        <div className={style.bankWrapper}>
          <form>
            <div className={style.form__input_wrap}>
              <div className={style.form__input_box}>
                <label htmlFor="title" className={style.form__input_label}>
                  Bank
                </label>
                <select
                  className={style.form__input}
                  type="text"
                  placeholder="Enter title"
                  name="title"
                >
                  <option value="6363">First Bank</option>
                </select>
              </div>
            </div>
            <div className={style.form__input_wrap}>
              <div className={style.form__input_box}>
                <label htmlFor="title" className={style.form__input_label}>
                  Account Number
                </label>
                <input
                  className={style.form__input}
                  type="number"
                  placeholder="3022771881"
                  name="accounNumber"
                  maxLength={10}
                />
              </div>
            </div>
            <div className={style.form__input_wrap}>
              <div className={style.form__input_box}>
                <label htmlFor="title" className={style.form__input_label}>
                  Bank Verification Number (BVN)
                </label>
                <input
                  className={style.form__input}
                  type="text"
                  placeholder="22217282882"
                  maxLength={22}
                  name="bvnNumber"
                />
              </div>
            </div>
            <div className={style.form__input_wrap}>
              <button
                type="button"
                className={style.form__input_submit_request}
                onClick={bankVerifyHandler}
              >
                Verify Account Number
              </button>
            </div>
          </form>
        </div>
      )}
      {tab === "optTab" && (
        <div className={style.optWrapper}>
          <div className={style.otpHeader}>Enter Verification Code</div>
          <div className={`${style.form__input_wrap} ${style.form__input_otp}`}>
            <div className={style.form__input_box}>
              <label htmlFor="title" className={style.optLabel}>
                Please enter the 6-digit verification code sent to{" "}
                <span className={style.sampleNumber}>+234 80 6000 0000</span> to
                proceed
              </label>
            </div>
            <div className={style.otpBox}>
              <OtpInput
                inputStyle={{
                  border: "0.82066px solid #6D76838F",
                  borderRadius: "2px",
                  marginRight: "10px",
                  width: "50px",
                  height: "40px",
                  fontWeight: "700",
                  fontSize: "30px",
                  padding: 0,
                  outline: "none",
                }}
                value={otp}
                onChange={(otp) => setOtp(otp)}
                numInputs={6}
              />
            </div>
          </div>
          <div className={style.form__input_wrap}>
            <button type="button" className={style.form__input_submit_request}>
              Confirm Account & Proceed
            </button>
          </div>
        </div>
      )}

      {tab === "createTicket" && (
        <>
          {(tickets && tickets.length > 0) ||
          (selectedList && selectedList.length > 0) ? (
            <div className={style.main_container} style={{ marginTop: "15px" }}>
              {selectedList?.map((item, idx) => (
                <ResolutionItem
                  keyword={item.goal}
                  item={{ ...item, starts_at: item.created_at }}
                  key={idx}
                  count=""
                  onClick={() => openSingleModal(item)}
                />
              ))}
              {tickets.map((item, idx) => (
                <ResolutionItem
                  keyword={item.name}
                  item={{ ...item, starts_at: item.created_at }}
                  key={idx}
                  count=""
                  onClick={() => openEditTicketModal(item)}
                />
              ))}
              <div
                className={style.main_container_btnContainer}
                style={{ justifyContent: "flex-start" }}
              >
                <button
                  onClick={() => setVisible(true)}
                  className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
                >
                  <span className={style.main_container_btnContainer_btn_icon}>
                    <FiPlus size={18} color="#09974d" />
                  </span>
                  <span className={style.main_container_btnContainer_btn_title}>
                    Create Ticket
                  </span>
                </button>
                <button
                  onClick={() => setVisibleDonation(true)}
                  className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_elec}`}
                >
                  Create Donation
                </button>
              </div>
            </div>
          ) : (
            <div className={style.main_container}>
              <div>
                <img
                  src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
                  className={style.main_container_imgbox}
                />
                <h4 className={style.main_container_title}>
                  {"Create Event Ticket"}
                </h4>
                <div className={style.main_container_content}>
                  {`Create a ticket for your attendees if it's a paid event, this allows your attendees pay for your event, skip and continue if you want your attendees to join event free`}
                </div>
              </div>

              <div className={style.main_container_btnContainer}>
                <button
                  onClick={() => setVisible(true)}
                  className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
                >
                  <span className={style.main_container_btnContainer_btn_icon}>
                    <FiPlus size={18} color="#09974d" />
                  </span>
                  <span className={style.main_container_btnContainer_btn_title}>
                    Create Ticket
                  </span>
                </button>
                <button
                  onClick={() => setVisibleDonation(true)}
                  className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_elec}`}
                >
                  Create Donation
                </button>
              </div>
            </div>
          )}

          <div className={style.form__input_wrap}>
            <button
              onClick={nextStep}
              type="button"
              className={style.form__input_submit_request}
            >
              {(tickets && tickets.length > 0) ||
              (selectedList && selectedList.length > 0)
                ? "Continue"
                : "Skip & Continue >>>"}
            </button>
          </div>
        </>
      )}

      <LeftDrawerModal
        visible={visibleDonation}
        closeModal={() => setVisibleDonation(false)}
        tagName="Allow Donation"
        headerTitle="Allow Attendees To Make Donations"
        modalHeight="100vh"
        destroyOnClose={true}
      >
        <Donation
          ticketHandler={ticketHandler}
          closeDonationModal={() => {
            setReloadDonation((prev) => !prev);
            setVisibleDonation(false);
          }}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={openDetailModal}
        destroyOnClose={true}
        closeModal={() => setOpenDetailModal(false)}
        tagName="Allow Donation"
        modalHeight="100vh"
        headerTitle="Allow Attendees To Make Donations"
      >
        <EditDonation
          item={resolutionDetail}
          openEditDonation={(val) => setOpenDetailModal(val)}
          ticketHandler={ticketHandler}
          removeDonation={removeDonation}
          closeDonationModal={() => {
            setReloadDonation((prev) => !prev);
            setOpenDetailModal(false);
          }}
          reload={() => setReloadDonation((prev) => !prev)}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={visible}
        destroyOnClose={true}
        closeModal={() => setVisible(false)}
        tagName="Create Ticket"
        headerTitle="Create either a paid or free ticket"
      >
        <CreateTicket
          ticketHandler={ticketHandler}
          closeTicketModal={() => {
            setReloadTicket((prev) => !prev);
            setVisible(false);
          }}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={ticketModal}
        closeModal={() => setTicketModal(false)}
        tagName="Create Ticket"
        destroyOnClose={true}
        headerTitle="Create either a paid or free ticket"
      >
        <EditTicket
          item={singleTicket}
          openEditTicket={() => setTicketModal(true)}
          reloadTicket={() => setReloadTicket((prev) => !prev)}
          closeTicketModal={() => setTicketModal(false)}
        />
      </LeftDrawerModal>
    </section>
  );
};

export default Payment;
