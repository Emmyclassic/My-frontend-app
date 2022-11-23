import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
// import { FaQuestionCircle } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { ImStatsBars } from "react-icons/im";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import DashboardLeftHeaderNav from "../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Step from "../../../components/Stepper/Step";
import Steps from "../../../components/Stepper/Steps";
import Attendee from "./Attendee";
import Events from "./Event";
import style from "./index.module.scss";
import "./index.scss";
// import Questionaaire from "./Questionaire";
import Resolution from "./Resolution";
import Resource from "./Resources";
import { AGMSummary } from "./Summary";

const CreateEvent = () => {
  const lastStep = localStorage.getItem("lastStep");
  const [current, setCurrent] = useState(Number(lastStep) || 0);
  const history = useHistory();
  const { id } = useParams();

  const [selectedVenue, setSelectedVenue] = useState([]);
  const [, setMeetingType] = useState(null);
  const [colorCode, setColorCode] = useState({ title: "" });
  const { loading, imageUrl } = useState(false);
  const eventResponse = useSelector((state) => state.eventTypes);

  const currentEventType = eventResponse.data?.find((item) => item.id === id);

  const nextStep = () => {
    setCurrent((current + 1) % 6);
  };
  const backStep = () => {
    setCurrent((current - 1) % 6);
  };

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
        <Steps
          current={current}
          onChange={(id) => setCurrent(id)}
          nextStep={nextStep}
          backStep={backStep}
          currentHandler={(val) => setCurrent(val)}
        >
          <Step title="Events" icon={<BsBookmarkFill size={18} />} />
          <Step title="Voting" icon={<ImStatsBars size={18} />} />
          {/* <Step title="Questionnaire" icon={<FaQuestionCircle size={18} />} /> */}
          <Step title="Attendees" icon={<HiUserCircle size={18} />} />
          <Step title="Resources" icon={<AiFillSetting size={18} />} />
          <Step title="Summary" icon={<AiFillSetting size={18} />} />
        </Steps>
      </section>
      {current === 0 && (
        <Events
          colorCode={colorCode}
          loading={loading}
          imageUrl={imageUrl}
          nextStep={nextStep}
          selectCardSelect={selectCardSelect}
          selectedVenue={selectedVenue}
          handleMeetingType={(item) => setMeetingType(item)}
          handleColorCode={(item) => setColorCode(item)}
          currentEventType={currentEventType}
        />
      )}
      {current === 1 && <Resolution nextStep={nextStep} />}
      {/* {current === 2 && <Questionaaire nextStep={nextStep} />} */}
      {current === 2 && <Attendee nextStep={nextStep} />}
      {current === 3 && <Resource nextStep={nextStep} />}
      {current === 4 && <AGMSummary nextStep={nextStep} />}
    </PrivateGenericLayout>
  );
};

export default CreateEvent;
