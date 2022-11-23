import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import { Checkbox } from "antd";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Arrow from "../../../../components/Dashboard/Arrow";
import Select from "react-select";
import { FaCheckCircle } from "react-icons/fa";
// import { createEmailCampaign } from "../../../../api/emailHandler";
// import Swal from "sweetalert2";

import style from "./index.module.scss";

const customStyles = {
  control: (base) => ({
    ...base,
    height: 46,
    minHeight: 35,
  }),
};

const salesEndOpt = [
  { value: "Ade", label: "Ade" },
  { value: "Seun", label: "Seun" },
];

function CampaignEmail({ id }) {
  console.log(id);
  // const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
  const history = useHistory();
  const [showRecepients, setShowRecepients] = useState(false);
  const [showFrom, setShowFrom] = useState(false);
  const [showSubject, setShowSubject] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [previewText, setPreviewText] = useState("");

  const handleCreateCampaign = async () => {
    // const eventId = currentEvent.id;
    history.push("/Email");
    // try {
    //   const payload = {
    //     from_name: senderName,
    //     from_email: senderEmail,
    //     subject: emailSubject,
    //     preview_text: previewText,
    //     // "event_attendee_id": "955f3d13-3946-439e-bfc6-1b50ae782818"
    //   };
    //   // created campaignId: "95765f10-eb45-4350-9b1e-6e566abd644c"
    //   const response = await createEmailCampaign(eventId, payload);
    //   console.log({ response });
    //   if (response.status === 201) {
    //     history.push("/Email");
    //   }
    // } catch (error) {
    //   const errData = error.response?.data ?? error.toJSON().message;
    //   const message = errData.message;
    //   Swal.fire("oops!!", message, "error");
    // }
  };
  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <Arrow />
          <DashboardLeftHeaderNav
            title="Campaign Email"
            subtitle="Select an email template for your email notice"
          />
        </>
      }
    >
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.container_left}>
            <div>
              <FaCheckCircle />
            </div>
            <div className={style.container_left_content}>
              <p>To</p>
              <span>All Selected attendees for the event</span>
              <p>
                If you would like to segment your audience, you can edit your
                recipients.
              </p>
              {showRecepients && (
                <>
                  <div>
                    <Select
                      styles={customStyles}
                      options={salesEndOpt}
                    ></Select>
                  </div>
                  <div>
                    <Checkbox />
                    <span>Personalise the “To” field</span>
                  </div>
                  <div className={style.container_left_content_group}>
                    <button onClick={() => setShowRecepients(!showRecepients)}>
                      Save
                    </button>
                    <span>Cancel</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={style.container_right}>
            {!showRecepients && (
              <>
                <button onClick={() => setShowRecepients(!showRecepients)}>
                  Add Recipients
                </button>
              </>
            )}
          </div>
        </div>
        <div className={style.container}>
          <div className={style.container_left}>
            <div>
              <FaCheckCircle />
            </div>
            <div className={style.container_left_content}>
              <p>From</p>
              <span>Who is sending this Campaign?</span>
              <p>Edit or state the name of the sender of this campaign.</p>
              {showFrom && (
                <>
                  <div className={style.form_group}>
                    <div className={style.form_group_col}>
                      <p>Name</p>
                      <input
                        placeholder="UBA AGM Agenda femi"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                      />
                      <p>
                        Use something attendee will easily recognise, like your
                        company name or event.
                      </p>
                    </div>
                    <div className={style.form_group_col}>
                      <p>Email Address</p>
                      <input
                        placeholder="enquires@ubaagm.com"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={style.container_left_content_group}>
                    <button onClick={() => setShowFrom(!showFrom)}>Save</button>
                    <span
                      onClick={() => {
                        setSenderEmail("");
                        setSenderName("");
                        setShowFrom(!showFrom);
                      }}
                    >
                      Cancel
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={style.container_right}>
            {!showFrom && (
              <>
                <button onClick={() => setShowFrom(!showFrom)}>
                  {`Add "From"`}
                </button>
              </>
            )}
          </div>
        </div>

        <div className={style.container}>
          <div className={style.container_left}>
            <div>
              <FaCheckCircle />
            </div>
            <div className={style.container_left_content}>
              <p>Subject</p>
              <span>What is the subject line for this campaign?</span>
              <p>State the subject line of this campaign.</p>
              {showSubject && (
                <>
                  <div className={style.form_group}>
                    <div className={style.form_group_col}>
                      <p>Subject</p>
                      <input
                        placeholder="Lorem ipsum dolor sit amet,"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                      />
                      <p>
                        Use an interesting subject line, like your company name
                        or event.
                      </p>
                    </div>
                    <div className={style.form_group_col}>
                      <p>Preview Text</p>
                      <input
                        placeholder="enquires@ubaagm.com"
                        value={previewText}
                        onChange={(e) => setPreviewText(e.target.value)}
                      />
                      <p>This is the first line of your email.</p>
                    </div>
                  </div>
                  <div className={style.container_left_content_group}>
                    <button onClick={() => setShowSubject(!showSubject)}>
                      Save
                    </button>
                    <span
                      onClick={() => {
                        setPreviewText("");
                        setEmailSubject("");
                        setShowSubject(!showSubject);
                      }}
                    >
                      Cancel
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={style.container_right}>
            {!showSubject && (
              <>
                <button onClick={() => setShowSubject(!showSubject)}>
                  {`Add "Subject"`}
                </button>
              </>
            )}
          </div>
        </div>
        <div className={style.main_continue}>
          <button onClick={handleCreateCampaign}>{`Continue >`}</button>
        </div>
      </div>
    </PrivateGenericLayout>
  );
}

export default CampaignEmail;
