import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Spin, Alert } from "antd";

import PollListItem from "./PollListItem";
import { pollVoteHandler } from "../../../api/resolutionHandler";
import style from "./index.module.scss";

let votePayload = [];

const VoteForm = ({ polls, isPoll, isResolution }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();

  const selectedHandler = (parentId, selectedVal) => {
    const resolutionVote = {
      votes_for: 0,
      votes_against: 0,
      votes_abstain: 0,
    };

    const authAttendee = localStorage.getItem("authAttendee");
    let payload = {
      poll_id: selectedVal.item.poll_id,
      option_id: selectedVal.item.id,
      attendee_id: JSON.parse(authAttendee).attendeeId,
      account_number: JSON.parse(authAttendee)?.account_number ?? "0011128282",
      vote_rights: JSON.parse(authAttendee).voteRights,
      channel: JSON.parse(authAttendee)?.channel ?? "web",
    };

    if (isResolution) {
      if (selectedVal.item.title === "For") {
        resolutionVote.votes_for = 1;
      } else if (selectedVal.item.title === "Against") {
        resolutionVote.votes_against = 1;
      } else {
        resolutionVote.votes_abstain = 1;
      }

      payload = {
        resolution_id: parentId,
        attendee_id: JSON.parse(authAttendee).attendeeId,
        ...resolutionVote,
      };
    }

    const exist = [...votePayload].findIndex(
      (item) => item.resolution_id === parentId
    );
    if (exist < 0) {
      const newPayload = [...votePayload, payload];
      votePayload = newPayload;

      // setVotePayload(newPayload);
    } else {
      const copyPayload = [...votePayload];
      copyPayload[exist] = payload;
      votePayload = copyPayload;
      //  votePayload[exist] = payload;
      // setVotePayload(copyPayload);
    }
  };

  const submitVote = async () => {
    try {
      setIsVoting(true);
      const payload = {
        votes: votePayload,
      };
      const { data } = await pollVoteHandler(payload);
      if (data) {
        setIsVoting(false);
        setSuccessResponse(data);
      }
    } catch (err) {
      setIsVoting(false);
      const {
        data: { errors },
      } = err.response;
      const errorArr = Object.values(errors);

      setErrorResponse(errorArr);
      Swal.fire("Closed!", "Something went wrong", "error");
    }
  };

  const onClose = () => setSuccessResponse();

  const errorClose = () => setErrorResponse();

  useEffect(() => {
    if (successResponse) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
    if (errorResponse) {
      setTimeout(() => {
        errorClose();
      }, 1000);
    }
  }, [successResponse, errorResponse]);

  return (
    <div className={style.contentPoll}>
      <div className={style.userAvatarBox}>
        <span className={style.userAvatarIcon}>AF</span>
        <div className={style.userAvatarTitle}>
          <span className={style.userAvatarName}>Ayodeji Fasore</span>
          <span className={style.userAvatarTime}>10:00 am</span>
        </div>
      </div>

      {polls.length > 0
        ? polls.map((item) => (
            <PollListItem
              item={item}
              key={item.id}
              options={item.options}
              selectedHandler={(parentId, selectedItem) =>
                selectedHandler(parentId, selectedItem)
              }
            />
          ))
        : null}

      <button
        className="btn-gray"
        onClick={submitVote}
        style={{ marginBottom: "1rem" }}
      >
        {isVoting ? <Spin size="large" color="#fff" /> : "Submit Poll"}
      </button>
      {successResponse && (
        <Alert
          message={successResponse.message}
          type="success"
          showIcon
          closable
          onClose={onClose}
        />
      )}

      {errorResponse &&
        errorResponse.map((item) => (
          <Alert
            key={item.id}
            message={item}
            type="error"
            showIcon
            closable
            onClose={errorClose}
          />
        ))}
    </div>
  );
};

export default VoteForm;
