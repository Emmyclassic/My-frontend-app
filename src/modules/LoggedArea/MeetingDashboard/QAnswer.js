import React, { useEffect, useState } from "react";
import moment from "moment";

import resolver from "../../../utils/promiseWrapper";
import { upVoteQuestionHandler } from "../../../api/eventHandler";

import { Dropdown, Menu } from "antd";
import { MdThumbUp } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import style from "./index.module.scss";
import { useDispatch } from "react-redux";

const QAnswer = ({
  answer,
  profile,
  item,
  eventDetail,
  // upVoteQuestion,
  setOpenAnswerQuestionModal,
  questionLabels,
  selectQuestionLabel,
  showUpvote,
  showAttachQuestionBtn,
  resolutions,
  enableVoteClick,
  userProfile,
  pusher,
  reloadQuestion,
  question,
}) => {
  console.log("volte count => ", item, question);
  console.log("volte question => ", question);
  const eventInfo = localStorage.getItem("eventInfo");

  const dispatch = useDispatch();

  const [upVoteCount, setUpVoteCount] = useState({ count: item.vote_count });
  // console.log("upVoteCount=>", upVoteCount);

  const upVoteQuestion = async () => {
    await resolver(
      upVoteQuestionHandler(item.id, JSON.parse(eventInfo).attendeeId)
    );
    // reloadQuestion();
  };

  useEffect(() => {
    if (pusher) {
      console.log({ imMeerinL: item });

      const upVoteChannel = pusher.subscribe(`UpvoteBroadcast.${item.id}`);
      upVoteChannel.bind("UpvoteEvent", function (upVote) {
        console.log({ upVoteResult: upVote.data });
        dispatch({
          type: "UPDATE_VOTE_COUNT",
          payload: {
            ...item,
            count: upVote.data?.count,
            status: upVote.data.status,
          },
        });

        setUpVoteCount(upVote.data);

        console.log({ qestionPsher: pusher });
      });
    }
  }, [item]);

  useEffect(() => {
    console.log("item.vote_count=>", item);
  });

  const getResolutionName = (id) => {
    const resolution = resolutions.find((resolution) => resolution.id === id);
    return resolution?.title ?? "";
  };

  const namePlaceHolder = (userProfile) => {
    if (userProfile) {
      console.log({ userProfile });
      const name = userProfile.split(" ");
      console.log({ userProfile, name });
      const firstName = name[0];
      let lastName = "";
      if (name.length > 1) {
        lastName = name[1];
        return `${firstName[0]}${lastName[0]}`;
      } else {
        return `${firstName[0]}`;
      }
    }
    return "";
  };

  const menu = (
    <Menu>
      {questionLabels &&
        questionLabels.length &&
        questionLabels.map((questionLabels) => (
          <Menu.Item
            key={questionLabels.id}
            onClick={() => selectQuestionLabel(questionLabels, item)}
          >
            <span>{questionLabels.title}</span>
          </Menu.Item>
        ))}
    </Menu>
  );
  return (
    <div className={`${style.qandAWrapper} ${style.qandAWrapper_cust}`}>
      <div className={style.qandASection_top}>
        <div className={style.qandAIconContainer}>
          <div className={style.qandAIconContainer_avatar}>
            {namePlaceHolder(item?.attendee?.name ?? item.attendee_name)}
          </div>
          <div className={style.qandAIconContainer_details}>
            <p className={style.qandAIconContainer_details_title}>
              {item?.attendee?.name ?? item.attendee_name}
            </p>
            <p className={style.qandAIconContainer_details_time}>
              {moment(item.created_at).format("hh:mm:ssa")}
            </p>
          </div>
        </div>
        <p className={style.resoluteHead}>
          {getResolutionName(item.resolution_id)}
        </p>
        <p>Question: {item.question}</p>
        {item && item.answer && (
          <div className={style.answeredQuestion}>Ans: {item.answer}</div>
        )}

        {eventDetail.role === 1 ? (
          <div
            className={style.answerQuestionText}
            onClick={() => setOpenAnswerQuestionModal(item)}
          >
            Answer Question
          </div>
        ) : null}
      </div>
      <div className={style.gandAGroup}>
        {showAttachQuestionBtn && (
          <div style={{ marginTop: ".5rem", display: "flex", gap: "1rem" }}>
            <Dropdown overlay={menu} placement="topLeft" trigger="click">
              <span
                className={style.gandAGroup_circle}
                style={{ backgroundColor: "#09974D" }}
                // onClick={() => setCount(count + 1)}
              >
                <FiPlus size="12" color="#fff" />
              </span>
            </Dropdown>
          </div>
        )}

        {showUpvote && (
          <div style={{ marginTop: ".5rem", display: "flex", gap: "1rem" }}>
            <span
              className={style.gandAGroup_circle}
              onClick={
                enableVoteClick && eventDetail.role !== 1
                  ? upVoteQuestion
                  : () => {}
              }
              // onClick={() => setCount(count + 1)}
            >
              <MdThumbUp size="12" />
            </span>

            {/* {item && item.vote_count > 0 && (
              <span style={{ color: "#fff" }}>{item?.vote_count}</span>
            )} */}

            {upVoteCount ? (
              <span style={{ color: "#fff" }}>{upVoteCount.count}</span>
            ) : (
              <span style={{ color: "#fff" }}>{item.vote_count}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QAnswer;
