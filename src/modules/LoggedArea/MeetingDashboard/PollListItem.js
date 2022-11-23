import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import axios from "axios";
import { Alert, Spin } from "antd";

import { pollVoteHandler } from "../../../api/resolutionHandler";
import SingleSelect, {
  PollList,
} from "../../../components/Cards/SingleCardSelect";
import style from "./index.module.scss";
import resolver from "../../../utils/promiseWrapper";

const PollListItem = ({ item, options, pusher, reloadResolution }) => {
  console.log("res item", item);
  const eventInfo = localStorage.getItem("eventInfo");
  const [resolutionVotePayload, setResolutionVotePayload] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const selectedTicket = (val) => {
    console.log({ startEdMe: item });
    if (item.status === "ended") {
      Swal.fire("Oops", "Voting suspended", "warning");
    } else if (item.status === "initial" || !item.status) {
      Swal.fire("Oops", "Voting has not started", "warning");
    } else {
      selectedHandler(item.id, val);
    }
  };

  const selectedHandler = (parentId, selectedVal) => {
    let payload = {
      resolution_id: selectedVal.item.poll_id,
      attendee_id: JSON.parse(eventInfo).attendeeId,
      account_number: "0011128282",
      vote_rights: JSON.parse(eventInfo).voteRights,
      channel: JSON.parse(eventInfo)?.channel ?? "web",
    };

    if (selectedVal.item.title === "For") {
      payload.vote_type = "votes_for";
    } else if (selectedVal.item.title === "Against") {
      payload.vote_type = "votes_against";
    } else {
      payload.vote_type = "votes_abstain";
    }

    payload = {
      resolution_id: parentId,
      attendee_id: JSON.parse(eventInfo).attendeeId,
      ...payload,
    };
    const exist = [...resolutionVotePayload].findIndex(
      (item) => item.resolution_id === parentId
    );
    if (exist < 0) {
      const newPayload = [...resolutionVotePayload, payload];
      setResolutionVotePayload(newPayload);
    } else {
      const copyPayload = [...resolutionVotePayload];
      copyPayload[exist] = payload;
      setResolutionVotePayload(copyPayload);
    }
  };

  const submitVote = async () => {
    setIsVoting(true);
    const payload = {
      votes: resolutionVotePayload,
    };

    const [result, error] = await resolver(pollVoteHandler(payload));
    if (result) {
      setIsVoting(false);
      setSuccessResponse(result.data);
      // reloadResolution();
    } else {
      setIsVoting(false);
      const {
        data: { errors },
      } = error.response;
      const errorArr = Object.values(errors);

      setErrorResponse(errorArr);
      Swal.fire("Closed!", "Something went wrong", "error");
    }
  };

  // const eventHandler = (setResolution) => {
  //   const voteChannel = pusher.subscribe(
  //     `VoteChannel.${resolutionRef.current?.id}`
  //   );
  //   voteChannel.bind("voteBC", function (data) {
  //     console.log("outside VoteChannel", data);
  //   });
  //   const voteModelStatusEventChannel = pusher.subscribe(
  //     `ModelVoteStatus.${resolutionRef.current?.id}`
  //   );
  //   voteModelStatusEventChannel.bind(
  //     "VoteModelStatusEvent",
  //     function (resolution) {
  //       console.log("VoteModelStatusEvent", resolution);
  //       // const resolut = resolution.data;
  //       resolutionRef.current = resolution.data;
  //       // setResolution((prev) => ({ ...prev, ...resolut }));
  //     }
  //   );
  // };

  const onClose = () => setSuccessResponse();

  const errorClose = () => setErrorResponse();

  useEffect(() => {
    if (successResponse) {
      setTimeout(() => {
        onClose();
      }, 5000);
    }
    if (errorResponse) {
      setTimeout(() => {
        errorClose();
      }, 5000);
    }
  }, [successResponse, errorResponse]);
  return (
    <>
      <div className={style.pollItemTitle}>{item.title}</div>

      <SingleSelect
        containerStyle={{ flexDirection: "column" }}
        onChange={(item) => selectedTicket(item)}
      >
        {options && options.length > 0
          ? options.map((option) => (
              <PollList
                key={option.id}
                item={{
                  status: item.status,
                  poll_id: option.poll_id,
                  title: option.name,
                  id: option.id,
                }}
                position={option.id}
                customBaseClass={style.customBaseClass}
              />
            ))
          : null}
      </SingleSelect>
      <button
        className="btn-gray"
        onClick={submitVote}
        disabled={item.status === "ended"}
        style={{ marginBottom: "1rem" }}
      >
        {isVoting ? <Spin size="large" color="#fff" /> : "Submit Resolution"}
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
    </>
  );
};

export default PollListItem;
