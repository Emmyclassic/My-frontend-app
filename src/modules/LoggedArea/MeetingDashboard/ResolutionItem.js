import React, { useEffect, useState } from "react";
import { BiAlarm } from "react-icons/bi";
import moment from "moment";
import { useStopwatch } from "react-timer-hook";
import NumberFormat from "react-number-format";
import { IoMdMore } from "react-icons/io";
import { Menu, Dropdown, Modal, Spin, Alert } from "antd";
import { MdEdit, MdClose } from "react-icons/md";
import { CgPoll } from "react-icons/cg";

import { StatutoryProgressVote } from "./ProgressVote";

import style from "./index.module.scss";
import resolver from "../../../utils/promiseWrapper";
import {
  publishResultHandler,
  collateResultHandler,
  addStatutoryVote,
  getStatutoryVote,
  updateStatutoryVote,
} from "../../../api/resolutionHandler";
import Swal from "sweetalert2";

const CloseIcon = ({ closeModal }) => {
  return (
    <span
      onClick={closeModal}
      className={style.closeModal}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#363636",
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        zIndex: 100000,
        cursor: "pointer",
      }}
    >
      <MdClose color="#fff" />
    </span>
  );
};

const ResolutionItemWrapper = ({
  item,
  setOpenResolutionModal,
  setOpenResolutionResult,
  setOpenVotingCollation,
  stopResolutionVoting,
  voteTimeHandler,
  pusher,
  reloadResolution,
  currentTimerCount,
}) => {
  const [openAddVote, setOpenAddVote] = useState(false);
  const [forCount, setForCount] = useState();
  const [statutoryCount, setStatutoryCount] = useState();
  const [abstainCount, setAbstainCount] = useState();
  const [againstCount, setAgainstCount] = useState();
  const [editForCount, setEditForCount] = useState();
  const [editAbstainCount, setEditAbstainCount] = useState();
  const [editAgainstCount, setEditAgainstCount] = useState();
  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const [refreshResolution, setRefreshResolution] = useState(false);

  const [openEditVote, setOpenEditVote] = useState(false);
  const { seconds, minutes, hours, days, pause, start, isRunning } =
    useStopwatch({
      autoStart: false,
      expiryTimestamp: moment(item.duration),
    });
  const [timer, setTimer] = useState("start");
  // useEffect(() => {
  //   currentTimerCount(days, hours, minutes, seconds);
  // }, []);

  const timeHandler = (val) => {
    if (val === "start") {
      pause();
      stopResolutionVoting(false, item);
      voteTimeHandler({ status: "ended" });
    } else {
      start();
      stopResolutionVoting(true, item);
      voteTimeHandler({ status: "started" });
      // currentTimerCount({ days, hours, minutes, seconds });
    }
    setTimer(val);
  };
  const ResolutionCounter = () => {
    return (
      <>
        {timer === "start" ? (
          <div
            className={style.resolutionTime}
            onClick={() => timeHandler("stop")}
          >
            <BiAlarm color="#2F89FE" />
            <span className={style.startResolution}>Start Time</span>
          </div>
        ) : (
          <div
            className={style.resolutionTime}
            onClick={() => {
              timeHandler("start");
            }}
          >
            <BiAlarm color="#2F89FE" />
            <span className={style.startResolution}>
              Stop Time <span>{days}</span>:<span>{hours}</span>:
              <span>{minutes}</span>:<span>{seconds}</span>
            </span>
          </div>
        )}
      </>
    );
  };
  const dropdownList = (recordId) => {
    return (
      <Menu className={style.menu_container}>
        {!statutoryCount ? (
          <Menu.Item key="1">
            <span
              className={style.menu_container_desc}
              onClick={() => setOpenAddVote(true)}
            >
              + Add physical vote
            </span>
          </Menu.Item>
        ) : (
          <Menu.Item key="2">
            <span
              className={style.menu_container_desc}
              onClick={() => setOpenEditVote(true)}
            >
              <MdEdit />
              Edit physical vote
            </span>
          </Menu.Item>
        )}
      </Menu>
    );
  };

  useEffect(() => {
    if (isRunning) {
      // start time and end time
    }
  }, [isRunning]);

  const publishCollation = async () => {
    const [result, error] = await resolver(
      collateResultHandler({
        resolution_id: item.id,
        id: item.id,
        type: "resolutions",
      })
    );
    console.log("result", result, error);
  };

  const publishResult = async () => {
    const [result, error] = await resolver(
      publishResultHandler({
        resolution_id: item.id,
        id: item.id,
        type: "resolutions",
      })
    );
    if (result) {
      pause();
      reloadResolution();
    }
    console.log("result", result, error);
  };

  const addVoteCount = (val, setCount) => {
    const newVal = val.target.value.replace(/,/g, "");
    setCount(newVal);
  };

  const getStatutoryCount = async () => {
    const [result, error] = await resolver(getStatutoryVote(item.id));
    if (result) {
      setStatutoryCount(result.data.data);
    }
    console.log({ result, error });
  };

  useEffect(() => {
    getStatutoryCount();
  }, [refreshResolution]);

  const updateStatutoryCount = async () => {
    const req = {
      votes_for: Number(editForCount || statutoryCount.votes_for),
      votes_against: Number(editAgainstCount || statutoryCount.votes_against),
      votes_abstain: Number(editAbstainCount || statutoryCount.votes_abstain),
    };
    setLoading(true);
    const [result, error] = await resolver(updateStatutoryVote(req, item.id));
    setLoading(false);

    if (result) {
      setRefreshResolution((prev) => !prev);
      setSuccessResponse(true);
      setEditAbstainCount();
      setEditForCount();
      setEditAbstainCount();
      setOpenEditVote(false);
    } else {
      setErrorResponse(true);
    }
    console.log({ result, error });
  };

  const addStatutoryCount = async () => {
    if (!forCount || !againstCount || !abstainCount) {
      Swal.fire("Warning", "Please fill all the input", "warning");
    } else {
      const req = {
        votes_for: Number(forCount),
        votes_against: Number(againstCount),
        votes_abstain: Number(abstainCount),
      };
      setLoading(true);
      const [result] = await resolver(addStatutoryVote(req, item.id));
      setLoading(false);

      if (result) {
        setRefreshResolution((prev) => !prev);
        setSuccessResponse(true);
        setAbstainCount();
        setForCount();
        setAbstainCount();
        setOpenAddVote(false);
      } else {
        setErrorResponse(true);
      }
    }
  };

  useEffect(() => {
    if (successResponse || errorResponse) {
      setTimeout(() => {
        setSuccessResponse();
        setErrorResponse();
      }, 5000);
    }
  }, [successResponse, errorResponse]);
  return (
    <div className={style.resolutionContent}>
      <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        destroyOnClose
        width={400}
        visible={openAddVote}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
        }}
        footer={null}
        // header={null}
        position="relative"
        closable

        // closeIcon={<CloseIcon closeModal={() => setOpenAddVote(false)} />}
      >
        <section className={style.container}>
          <div
            className={style.resultContainer}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginRight: "auto",
                alignItems: "center",
              }}
            >
              <span className={style.pollResultIcon}>
                <CgPoll color="#fff" size="20" />
              </span>
              <span className={style.pollResultTitle}>Add Physical Vote</span>
            </div>
            <CloseIcon closeModal={() => setOpenAddVote(false)} />
          </div>

          <div className={style.resultContent}>
            <div className={style.resultPara} style={{ color: "#fff" }}>
              Add number of physical vote for each option.
            </div>
            <div className={style.addVoteWrap}>
              <div style={{ width: "80px" }}>
                <StatutoryProgressVote title="For" isStatutory={true} />
              </div>

              <div className={style.form__input_box}>
                <label htmlFor="question" className={style.form__input_label}>
                  Number of votes
                </label>
                <NumberFormat
                  value={forCount}
                  thousandSeparator={true}
                  className={style.form__input}
                  onChange={(e) => addVoteCount(e, setForCount)}
                  required
                />
              </div>
            </div>
            <div className={style.addVoteWrap}>
              <div style={{ width: "80px" }}>
                <StatutoryProgressVote title="Against" isStatutory={true} />
              </div>

              <div className={style.form__input_box}>
                <label htmlFor="question" className={style.form__input_label}>
                  Number of votes
                </label>
                <NumberFormat
                  value={againstCount}
                  thousandSeparator={true}
                  className={style.form__input}
                  onChange={(e) => addVoteCount(e, setAgainstCount)}
                  required
                />
              </div>
            </div>
            <div className={style.addVoteWrap} style={{ border: "none" }}>
              <div style={{ width: "80px" }}>
                <StatutoryProgressVote title="Abstain" isStatutory={false} />
              </div>

              <div className={style.form__input_box}>
                <label htmlFor="question" className={style.form__input_label}>
                  Number of votes
                </label>
                <NumberFormat
                  value={abstainCount}
                  thousandSeparator={true}
                  className={style.form__input}
                  onChange={(e) => addVoteCount(e, setAbstainCount)}
                  required
                />
              </div>
            </div>

            <div className={style.addVoteBtnWrap}>
              <button
                type="button"
                className={style.addVoteBtn}
                onClick={addStatutoryCount}
              >
                {loading ? (
                  <Spin size="large" color="#fff" />
                ) : (
                  "Add Physical vote count"
                )}
              </button>
            </div>
            {successResponse && (
              <div style={{ marginTop: "1.5rem" }}>
                <Alert
                  message="Count added successfully"
                  type="success"
                  showIcon
                  closable
                  onClose={() => setSuccessResponse(false)}
                />
              </div>
            )}
            {errorResponse && (
              <div style={{ marginTop: "1.5rem" }}>
                <Alert
                  message="Count Failed"
                  type="error"
                  showIcon
                  closable
                  onClose={() => setErrorResponse(false)}
                />
              </div>
            )}
          </div>
        </section>
      </Modal>
      <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        destroyOnClose
        width={400}
        visible={openEditVote}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
        }}
        footer={null}
        // header={null}
        position="relative"
        closable

        // closeIcon={<CloseIcon closeModal={() => setOpenAddVote(false)} />}
      >
        <section className={style.container}>
          <div
            className={style.resultContainer}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginRight: "auto",
                alignItems: "center",
              }}
            >
              <span className={style.pollResultIcon}>
                <MdEdit color="#fff" size="20" />
              </span>
              <span className={style.pollResultTitle}>Edit Physical Vote</span>
            </div>
            <CloseIcon closeModal={() => setOpenEditVote(false)} />
          </div>

          <div className={style.resultContent}>
            <div className={style.resultPara} style={{ color: "#fff" }}>
              Add number of physical vote for each option.
            </div>
            <div className={style.addVoteWrap}>
              <div style={{ width: "80px" }}>
                <StatutoryProgressVote title="For" isStatutory={true} />
              </div>

              <div className={style.form__input_box}>
                <label htmlFor="question" className={style.form__input_label}>
                  Number of votes
                </label>
                <NumberFormat
                  value={forCount}
                  thousandSeparator={true}
                  className={style.form__input}
                  onChange={(e) => addVoteCount(e, setEditForCount)}
                  required
                  defaultValue={statutoryCount?.votes_for}
                />
              </div>
            </div>
            <div className={style.addVoteWrap}>
              <div style={{ width: "80px" }}>
                <StatutoryProgressVote title="Against" isStatutory={true} />
              </div>

              <div className={style.form__input_box}>
                <label htmlFor="question" className={style.form__input_label}>
                  Number of votes
                </label>
                <NumberFormat
                  value={againstCount}
                  thousandSeparator={true}
                  className={style.form__input}
                  onChange={(e) => addVoteCount(e, setEditAgainstCount)}
                  required
                  defaultValue={statutoryCount?.votes_against}
                />
              </div>
            </div>
            <div className={style.addVoteWrap} style={{ border: "none" }}>
              <div style={{ width: "80px" }}>
                <StatutoryProgressVote title="Abstain" isStatutory={false} />
              </div>

              <div className={style.form__input_box}>
                <label htmlFor="question" className={style.form__input_label}>
                  Number of votes
                </label>
                <NumberFormat
                  value={abstainCount}
                  thousandSeparator={true}
                  className={style.form__input}
                  onChange={(e) => addVoteCount(e, setEditAbstainCount)}
                  required
                  defaultValue={statutoryCount?.votes_abstain}
                />
              </div>
            </div>

            <div className={style.addVoteBtnWrap}>
              <button
                type="button"
                className={style.addVoteBtn}
                onClick={updateStatutoryCount}
              >
                {loading ? (
                  <Spin size="large" color="#fff" />
                ) : (
                  "Update Physical vote count"
                )}
              </button>
            </div>
            {successResponse && (
              <div style={{ marginTop: "1.5rem" }}>
                <Alert
                  message="Count added successfully"
                  type="success"
                  showIcon
                  closable
                  onClose={() => setSuccessResponse(false)}
                />
              </div>
            )}
            {errorResponse && (
              <div style={{ marginTop: "1.5rem" }}>
                <Alert
                  message="Count Failed"
                  type="error"
                  showIcon
                  closable
                  onClose={() => setErrorResponse(false)}
                />
              </div>
            )}
          </div>
        </section>
      </Modal>
      <div className={style.resolutionWrap}>
        <div className={style.resolutionItem}>
          <span> {item.title}</span>
          {item.allow_physical && !item.results.length && (
            <Dropdown
              overlay={() => dropdownList()}
              trigger={["click"]}
              placement="bottomRight"
            >
              <span>
                <IoMdMore size="14" />
              </span>
            </Dropdown>
          )}
        </div>
        <StatutoryProgressVote title="For" isStatutory={false} />
        <StatutoryProgressVote title="Against" isStatutory={false} />
        <StatutoryProgressVote title="Abstain" isStatutory={false} />
      </div>

      <div className={style.resolutionFooter}>
        <div style={{ marginRight: "auto" }}>
          <ResolutionCounter />
        </div>

        <div className={style.resolutionRight}>
          <span
            className={style.publishLink}
            onClick={() => {
              setOpenVotingCollation();
              publishCollation();
              // setOpenResolutionModal(false);
            }}
          >
            Publish Collation
          </span>
          <button
            className={style.publishBtn}
            onClick={() => {
              setOpenVotingCollation();
              publishResult();
              // setOpenResolutionModal(false);
            }}
          >
            Publish Result
          </button>
        </div>
      </div>
    </div>
  );
};

const ResolutionItem = React.memo(ResolutionItemWrapper);

export default ResolutionItem;
