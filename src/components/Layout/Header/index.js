import React, { useState, lazy } from "react";
import { useHistory } from "react-router";
import { CgMouse } from "react-icons/cg";
import { Spin } from "antd";
import CustomButton from "../../Buttons/Button";
import CustomInput from "../../FormFields/Input/Input";
import MeetingInput from "../../MeetingInput/MeetingInput";
import NavHeader from "../NavHeader";
import style from "./Header.module.scss";
import { fetchEventByCode } from "../../../api/eventHandler";
import resolver from "../../../utils/promiseWrapper";

const AuthModalForm = lazy(() => import("../../../Auth/AuthModalForm"));

const Header = () => {
  const history = useHistory();
  const [meetingCode, setMeetingCode] = useState();
  const [meetingError, setMeetingError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("meetingCode", meetingCode);

    if (!meetingCode) {
      setMeetingError("Meeting code is required");
    } else {
      setLoading(true);
      const [result, error] = await resolver(fetchEventByCode(meetingCode));
      setLoading(false);

      if (result) {
        setMeetingError();
        history.push(`/Event/concert/overview/${result.data?.data?.id}`);
      } else {
        if (error.response.status === 404) {
          setMeetingError("Invalid meeting code");
        } else {
          setMeetingError("Something went wrong");
        }
      }
    }
  };

  return (
    <header className={`${style.header} home_event`}>
      <AuthModalForm component={NavHeader} />
      <section className={style.section}>
        <h4 className={style.section__caption}>Events your own way</h4>
        <p className={`section__caption ${style.section__caption__subpara}`}>
          Hold meetings and make decisions in the most convenient way possible.
        </p>
        <MeetingInput>
          <CustomInput
            placeHolder="Enter event code"
            onChange={(e) => setMeetingCode(e.target.value)}
          />
          <CustomButton handleClick={() => handleSubmit()}>
            {loading ? (
              <Spin />
            ) : (
              <span className={style.meeting__btn__text}>Join Event</span>
            )}
          </CustomButton>
        </MeetingInput>
        <div>
          {meetingError && <span style={{ color: "red" }}>{meetingError}</span>}
        </div>

        <div className={style.support__call}>
          <span className={style.mouseImage}>
            <CgMouse color="#D5D5D5" size={30} />
          </span>
        </div>
      </section>
    </header>
  );
};

export default Header;
