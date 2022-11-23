import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdPayment } from "react-icons/md";
import { useHistory } from "react-router";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Step from "../../../../components/Stepper/Step";
import Steps from "../../../../components/Stepper/Steps";
import Attendee from "../Attendee";
import Events from "../Event";
import style from "../index.module.scss";
import "../index.scss";
import Payment from "../Payment";
import Resource from "../Resources";
import { ConcertSummary } from "../Summary";

const ConcertEvent = () => {
  const lastStep = localStorage.getItem("lastStep");
  const [current, setCurrent] = useState(Number(lastStep) || 0);
  const history = useHistory();
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [, setMeetingType] = useState(null);
  const [colorCode, setColorCode] = useState({ title: "" });
  const { loading, imageUrl } = useState(false);

  const nextStep = () => {
    setCurrent((current + 1) % 5);
  };
  // const backStep = () => {
  //   setCurrent((current - 1) % 5);
  // };

  const selectCardSelect = (item, isSelected) => {
    if (isSelected) {
      setSelectedVenue([...selectedVenue, item.id]);
    } else {
      const removeSelected = selectedVenue.filter((x) => x !== item.id);
      setSelectedVenue(removeSelected);
    }
  };

  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <span
            className={style.containerNav_iconBox}
            onClick={() => history.push("/event/types")}
          >
            <MdKeyboardArrowLeft size={20} />
          </span>
          <DashboardLeftHeaderNav
            title="New Event"
            subtitle="Start with the key details about your new event"
          />
        </>
      }
    >
      {/* {current > 0 && (
        <span className={style.containerNav_iconBox} onClick={backStep}>
          <MdKeyboardArrowLeft size={20} />
        </span>
      )} */}
      <section className={style.main}>
        <Steps current={current} onChange={(id) => setCurrent(id)}>
          <Step title="Events" icon={<BsBookmarkFill size={18} />} />
          <Step title="Attendees" icon={<HiUserCircle size={18} />} />
          <Step title="Payment" icon={<MdPayment size={18} />} />
          <Step title="Resources" icon={<AiFillSetting size={18} />} />
          <Step title="Summary" icon={<AiFillSetting size={18} />} />
          {/* <Step title="Email notice" icon={<GoTelescope size={18} />} />  */}
        </Steps>
      </section>
      {current === 0 && (
        <Events
          colorCode={colorCode}
          loading={loading}
          imageUrl={imageUrl}
          nextStep={nextStep}
          selectCardSelect={selectCardSelect}
          handleMeetingType={(item) => setMeetingType(item)}
          handleColorCode={(item) => setColorCode(item)}
        />
      )}

      {current === 1 && <Attendee nextStep={nextStep} />}
      {current === 2 && <Payment nextStep={nextStep} />}
      {current === 3 && <Resource nextStep={nextStep} />}
      {current === 4 && <ConcertSummary nextStep={nextStep} />}
    </PrivateGenericLayout>
  );
};

export default ConcertEvent;
