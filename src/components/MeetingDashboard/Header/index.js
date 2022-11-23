import React from "react";
import { CgFileDocument, CgPoll } from "react-icons/cg";
import { ImMusic } from "react-icons/im";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { MdSpeakerNotes } from "react-icons/md";
import TabletMobile from "../../../modules/LoggedArea/MeetingDashboard/TabletMobile";
import DashboardRightHeaderNav from "../../Dashboard/RightHeaderNav";
import style from "./index.module.scss";
import "./meetingBoardHeader.scss";
import { togglePublicSidebar } from "../../../actions/uiAction";

function Header({
  setShowDocument,
  setShowMusic,
  setOpenResolutionModal,
  setOpenQandAModal,
  eventDetail,
  setOpenResolutionVoteModal,
  setOpenPollVoteModal,
  setOpenPollModal,
  setOpenQuestion,
  polls,
  resolutions,
  elections,
  setOpenQandAModalGallery,
  setOpenElectionVoteModal,
}) {
  const dispatch = useDispatch();

  return (
    <>
      <TabletMobile
        openMusics={setShowMusic}
        openDocuments={setShowDocument}
        eventDetail={eventDetail}
        openPoll={
          eventDetail && eventDetail.role === 1
            ? setOpenPollModal
            : setOpenPollVoteModal
        }
        openQandAModal={
          eventDetail && eventDetail.role === 1
            ? setOpenQandAModal
            : setOpenQandAModalGallery
        }
      />
      <div className={style.nav_container}>
        <div className={style.nav_container_left}>
          <div>
            <img
              src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/apemsWhiteArc_epc5h8.png"
              alt="logo"
              className={style.nav_container_left_logo}
            />
          </div>
          <div className={style.nav_navigation}>
            <span>{eventDetail?.title ?? ""}</span>
          </div>
        </div>
        <div className={style.nav_container_right}>
          <div className={style.nav_list_container}>
            {eventDetail && eventDetail.role === 1 && (
              <div
                onClick={setShowMusic}
                className={`${style.nav_right_list} ${style.mr_3}`}
              >
                <ImMusic className={style.mr_1} />
                <span>Music</span>
              </div>
            )}

            {eventDetail &&
            eventDetail.event_type &&
            eventDetail.event_type.name !== "Annual-General-Meetings" ? (
              <div
                className={`${style.nav_right_list} ${style.mr_3}`}
                onClick={
                  eventDetail && eventDetail.role === 1
                    ? setOpenPollModal
                    : setOpenPollVoteModal
                }
              >
                <CgPoll className={style.mr_1} />
                <span>Poll</span>
                <span className={style.resolution_count}>{polls.length}</span>
              </div>
            ) : (
              <>
                {resolutions && eventDetail.role === 1 && (
                  <div
                    className={`${style.nav_right_list} ${style.mr_3}`}
                    onClick={
                      eventDetail && eventDetail.role === 1
                        ? setOpenResolutionModal
                        : setOpenResolutionVoteModal
                    }
                  >
                    <CgFileDocument className={style.mr_1} />
                    <span>Resolution</span>
                    <span className={style.resolution_count}>
                      {resolutions.length}
                    </span>
                  </div>
                )}
                {resolutions.length > 0 && eventDetail.role !== 1 ? (
                  <div
                    onClick={setOpenResolutionVoteModal}
                    className={`${style.nav_right_list} ${style.mr_3}`}
                  >
                    <CgFileDocument className={style.mr_1} />
                    <span>Resolution</span>
                    <span className={style.resolution_count}>
                      {resolutions.length}
                    </span>
                  </div>
                ) : null}
                {elections && eventDetail.role === 1 ? (
                  <div
                    className={`${style.nav_right_list} ${style.mr_3}`}
                    onClick={setOpenElectionVoteModal}
                  >
                    <CgFileDocument className={style.mr_1} />
                    <span>Election</span>
                    <span className={style.resolution_count}>
                      {elections.length}
                    </span>
                  </div>
                ) : null}
                {elections.length > 0 && eventDetail.role !== 1 ? (
                  <div
                    className={`${style.nav_right_list} ${style.mr_3}`}
                    onClick={setOpenElectionVoteModal}
                  >
                    <CgFileDocument className={style.mr_1} />
                    <span>Election</span>
                    <span className={style.resolution_count}>
                      {elections.length}
                    </span>
                  </div>
                ) : null}
              </>
            )}

            <div
              className={`${style.nav_right_list} ${style.mr_3}`}
              onClick={
                eventDetail && eventDetail.role === 1
                  ? setOpenQandAModal
                  : setOpenQandAModalGallery
              }
            >
              <MdSpeakerNotes className={style.mr_1} />
              <span>
                {eventDetail && eventDetail.role === 1
                  ? "Q&A"
                  : "Ask a Question"}
              </span>
            </div>
            <div className={style.nav_right_list} onClick={setShowDocument}>
              <CgFileDocument className={style.mr_1} />
              <span>Documents</span>
            </div>
          </div>
          <DashboardRightHeaderNav
            eventDetail={eventDetail}
            position="meeting"
          />
          <div className={style.nav_bar}>
            <FiMenu
              onClick={() => dispatch(togglePublicSidebar(true))}
              size="33"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
