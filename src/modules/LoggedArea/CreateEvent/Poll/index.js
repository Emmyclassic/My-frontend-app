import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  getPollHandler,
  removePollHandler,
} from "../../../../api/resolutionHandler";

import ResolutionItem from "../../../../components/Cards/ResolutionItem";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
import style from "./index.module.scss";
import PollForm from "./PollForm";
import EditPollForm from "./PollForm/EditPollForm";

const Poll = ({ nextStep }) => {
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [polls, setPolls] = useState();
  const [singlePoll, setSinglePoll] = useState();
  const [pollModal, setPollModal] = useState(false);
  const [reloadPoll, setReloadPoll] = useState(false);
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

  const fetchPolls = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getPollHandler(eventId);

      setPolls(data);
    } catch (ex) {}
  };

  const openDetailModal = (item) => {
    setPollModal(true);
    setSinglePoll(item);
  };

  useEffect(() => {
    fetchPolls(currentEvent.id);
  }, [reloadPoll]);

  const removePoll = async () => {
    try {
      const resolution = polls.filter((item) => item.id !== singlePoll.id);
      setPolls(resolution);
      setPollModal(false);

      await removePollHandler(singlePoll.id);
    } catch (err) {
      setPolls([...polls, singlePoll]);
      setPollModal(false);
    }
  };
  return (
    <section className={style.main}>
      {polls && polls.length > 0 ? (
        <div className={style.main_container} style={{ marginTop: "3rem" }}>
          {polls.map((item, idx) => (
            <ResolutionItem
              item={item}
              key={idx}
              count={polls.length}
              onClick={() => openDetailModal(item)}
            />
          ))}
          <div
            className={style.main_container_btnContainer}
            style={{ justifyContent: "flex-start", marginBottom: "3rem" }}
          >
            <button
              onClick={() => setResolutionOpen(true)}
              className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
            >
              <span className={style.main_container_btnContainer_btn_icon}>
                <FiPlus size={18} color="#09974d" />
              </span>
              <span className={style.main_container_btnContainer_btn_title}>
                Create Poll
              </span>
            </button>
          </div>
          <div className={style.form__input_wrap}>
            <button
              onClick={nextStep}
              type="button"
              className={style.form__input_submit_request}
            >
              {"Continue >>>"}
            </button>
          </div>
        </div>
      ) : (
        <div className={style.main_container}>
          <img
            src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
            className={style.main_container_imgbox}
          />
          <h4 className={style.main_container_title}>Create Poll</h4>
          <div className={style.main_container_content}>
            {`A poll makes it easy to retrieve information from your intending
        participants before your event starts. Feel free to skip if you don't
        want to create poll.`}
          </div>
          <div
            className={style.main_container_btnContainer}
            style={{ marginBottom: "3rem" }}
          >
            <button
              onClick={() => setResolutionOpen(true)}
              className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
            >
              <span className={style.main_container_btnContainer_btn_icon}>
                <FiPlus size={18} color="#09974d" />
              </span>
              <span className={style.main_container_btnContainer_btn_title}>
                Create Poll
              </span>
            </button>
          </div>
          <div className={style.form__input_wrap}>
            <button
              onClick={nextStep}
              type="button"
              className={style.form__input_submit_request}
            >
              {"Skip & Continue >>>"}
            </button>
          </div>
        </div>
      )}

      <LeftDrawerModal
        visible={resolutionOpen}
        closeModal={() => setResolutionOpen(false)}
        tagName="Setup Poll"
        headerTitle="Enter question and corresponding answer for your attendees to select from."
      >
        <PollForm
          closeModal={() => {
            setResolutionOpen(false);
            setReloadPoll((prev) => !prev);
          }}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={pollModal}
        destroyOnClose={true}
        closeModal={() => setPollModal(false)}
        tagName="Setup Poll"
        headerTitle="Enter question and corresponding answer for your attendees to select from."
      >
        <EditPollForm
          item={singlePoll}
          setEditPollModal={() => setPollModal(true)}
          removePolls={removePoll}
          reloadResolution={() => setReloadPoll((prev) => !prev)}
          closeResolutionModal={() => setPollModal(false)}
        />
      </LeftDrawerModal>
    </section>
  );
};

export default Poll;
