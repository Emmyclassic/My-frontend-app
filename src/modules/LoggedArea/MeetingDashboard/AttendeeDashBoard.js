import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Header from "../../../components/MeetingDashboard/Header";
import ZoomMtg, { joinZoomMeeting } from "../../../utils/zoom";
import style from "./index.module.scss";

function AttendeeMeetingDashboard() {
  // const [showChat, setShowChat] = useState(false);
  // const [showQuestion, setShowQuestion] = useState(false);
  // const [showParticipant, setShowParticipant] = useState(false);
  const [leaveMeeting, setLeaveMeeting] = useState(false);
  const eventInfo = localStorage.getItem("eventInfo");
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  // const clientHandler = () => {
  //   try {
  //     let result = "";
  //     ZoomMtg.generateSignature({
  //       meetingNumber: JSON.parse(eventInfo)?.meeting?.code,
  //       apiKey: "Fq6xQg9mSdGRpnTIpi_duw",
  //       apiSecret: "PPEMimQs8k4IQrnMqAzuIMDTaHZMIhEIZEZj",
  //       role: 1,
  //       success: function (res) {
  //         result = res.result;
  //       },
  //     });
  //     joinMeeting({
  //       userName: "solomonrock13",
  //       userEmail: "solomonfrank73@hotmail.com",
  //       signature: result,
  //       meetingNumber: JSON.parse(eventInfo)?.meeting?.code,
  //       password: JSON.parse(eventInfo)?.meeting?.password,
  //     });
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };
  const joinHandler = () => {
    try {
      let result = "";
      ZoomMtg.generateSignature({
        meetingNumber: JSON.parse(eventInfo)?.meeting?.code,
        apiKey: "Fq6xQg9mSdGRpnTIpi_duw",
        apiSecret: "PPEMimQs8k4IQrnMqAzuIMDTaHZMIhEIZEZj",
        role: 0,
        success: function (res) {
          result = res.result;
        },
      });

      console.log("resutlt", result);

      joinZoomMeeting({
        signature: result,
        meetingNumber: JSON.parse(eventInfo)?.meeting?.code,
        password: JSON.parse(eventInfo)?.meeting?.password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //  clientHandler();
    joinHandler();
  }, []);

  return (
    <div className={style.main}>
      <Header />
      <div>{/* <div id="meetingSDKElement"></div> */}</div>
      {/* <div className={style.body_container}>
        <div className={style.sideNav_container}>
          <ParticipantCard micOn={false} name="AF" />
          <ParticipantCard micOn={false} name="AB" />
          <ParticipantCard micOn={true} name="EE" />
          <ParticipantCard micOn={false} name="OS" />
          <ParticipantCard micOn={false} name="TA" />
        </div>
        <div className={style.main_container}>
          <MeetingFooter
            setShowChat={setShowChat}
            showChat={showChat}
            setShowQuestion={setShowQuestion}
            showQuestion={showQuestion}
            showParticipant={showParticipant}
            setShowParticipant={setShowParticipant}
            setLeaveMeeting={setLeaveMeeting}
          />
          <SpeakerMic />
        </div>
        {showChat && <Chat setShowChat={setShowChat} />}
        {showQuestion && <Question setShowQuestion={setShowQuestion} />}
        {showParticipant && (
          <Participant setShowQuestion={setShowParticipant} />
        )}
      </div> */}
      <Modal
        style={{
          width: "100%",
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
        }}
        visible={leaveMeeting}
        onCancel={() => setLeaveMeeting(false)}
        width={"100%"}
        bodyStyle={{
          height: "100vh",
          position: "relative",
          background: "#2E313E",
        }}
        footer={null}
        header={null}
        position="relative"
      >
        <div className={style.leave_meeting_modal}>
          <h3 className={style.leave_meeting_modal_title}>
            We bet you had an a lovely event
          </h3>
          <div className={style.flex_box}>
            <span className={style.leave_meeting_modal_desc}>
              Kindly rate us and give us your feedback.
            </span>
          </div>
          <div className={style.leave_meeting_modal_group}>
            <p>Rate us</p>
            <div className={style.leave_meeting_modal_star}>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          </div>
          <div className={style.leave_meeting_modal_group}>
            <p>Leave a review</p>
            <textarea />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AttendeeMeetingDashboard;
