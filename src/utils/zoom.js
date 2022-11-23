// import { ZoomMtg } from "@zoomus/websdk";

window?.ZoomMtg?.setZoomJSLib("https://source.zoom.us/2.4.0/lib", "/av");

window.ZoomMtg?.preLoadWasm();
window.ZoomMtg?.prepareWebSDK();
// loads language files, also passes any error messages to the ui
window.ZoomMtg?.i18n.load("en-US");
window.ZoomMtg?.i18n.reload("en-US");

export const joinZoomMeeting = ({
  signature,
  meetingNumber,
  password,
  leaveUrl,
  userName,
  userEmail,
}) => {
  document.getElementById("zmmtg-root").style.display = "block";

  window.ZoomMtg.init({
    leaveUrl,
    isSupportAV: true,
    disableInvite: true,
    isSupportQA: true,
    screenShare: true,
    isSupportCC: true,
    isSupportPolling: true,
    isSupportBreakout: true,

    success: (success) => {
      console.log("initjjdjdj", success);
      console.log("zmt", window.ZoomMtg, signature, userEmail, password);
      window.ZoomMtg.join({
        signature: signature,
        meetingNumber: meetingNumber,
        userName,
        apiKey: "Fq6xQg9mSdGRpnTIpi_duw",
        userEmail: userEmail,
        passWord: password,
        //   registrantToken: "1Aa15E",
        success: (success) => {
          console.log("success", success);
          window.ZoomMtg.record({
            record: true,
          });
          window.ZoomMtg.showRecordFunction({
            show: true,
          });
          const btn = document.querySelector(".footer__leave-btn");
          btn.textContent = "Leave Meeting";
          // meeting set to record by default
          window.ZoomMtg.record({
            record: true,
          });
        },
        error: (error) => {
          console.log("error yyyyyy", error);
        },
      });
    },
    error: (error) => {
      console.log("generic", error);
    },
  });

  window.ZoomMtg.inMeetingServiceListener("onUserJoin", function (data) {
    console.log("inMeetingServiceListener onUserJoin", data);
  });

  window.ZoomMtg.inMeetingServiceListener("onUserLeave", function (data) {
    console.log("inMeetingServiceListener onUserLeave", data);
  });

  window.ZoomMtg.inMeetingServiceListener(
    "onUserIsInWaitingRoom",
    function (data) {
      console.log("inMeetingServiceListener onUserIsInWaitingRoom", data);
    }
  );

  window.ZoomMtg.inMeetingServiceListener("onMeetingStatus", function (data) {
    console.log("inMeetingServiceListener onMeetingStatus", data);
  });
};

export default window.ZoomMtg;
