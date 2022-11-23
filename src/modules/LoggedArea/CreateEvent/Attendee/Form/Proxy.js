import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Checkbox, Radio, Space, Spin, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiTrash } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
// import { setLoader } from "../../../../../actions/uiAction";
import { uploadProxy } from "../../../../../api/eventHandler";
import {
  getElectionsHandler,
  getResolutionsHandler,
} from "../../../../../api/resolutionHandler";
import { proxyTemplateHandler } from "../../../../../api/attendeeHandler";
import AlertResponse from "../../../../../Auth/AuthModalForm/AlertResponse";
import FormInput from "../../../../../components/FormInput";
import LeftDrawerModal from "../../../../../components/LeftDrawerModal";
import resolver from "../../../../../utils/promiseWrapper";
// import { useFileUpload } from "../../../../../hooks/useFileUpload";
import { addProxyValidation } from "../../../../../utils/Validation/addProxyValidation";
import ElectionForm from "../../Resolution/ElectionForm";
import ResolutionForm from "../../Resolution/ResolutionForm";
import StatutoryForm from "../../Resolution/StatutoryForm";
import style from "../index.module.scss";
import { postProxyAction } from "../state/action";
import { resetAddProxy } from "../state/attendeeAction";
import { DownloadCsv } from "./Attendee";
import Swal from "sweetalert2";

const obj = [];
const objElection = [];
const ProxyForm = ({ nextStep, proxies, reloadProxy }) => {
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [reloadResolution, setReloadResolution] = useState(false);
  const [reloadElection, setReloadElection] = useState(false);
  const [electionOpen, setElectionOpen] = useState(false);
  const [statutryOpen, setStatutryOpen] = useState(false);
  const [resolutionSelector, setResolutionSelector] = useState([]);
  const [electionSelector, setElectionSelector] = useState([]);
  // const fileUploader = useFileUpload();
  const [resolutions, setResolutions] = useState();
  const [elections, setElections] = useState();
  const [candidateList, setCandidateList] = useState([]);
  const [selectedValue] = useState("");
  // const [countQuorom] = useState(false);
  // const [quorumBy] = useState("Voting");
  const [proxyTemplate, setProxyTemplate] = useState();
  const [addingTemplate, setAddingTemplate] = useState(false);
  const [uploadingProxy, setUploadingProxy] = useState(false);
  const [stakeHolder, setStakeHolder] = useState("");
  const [proxyTemplateError, setProxyTemplateError] = useState(false);
  const [proxyTemplateSuccess, setProxyTemplateSuccess] = useState(false);
  const [proxyUploadResponse, setProxyUploadResponse] = useState({
    status: false,
    message: "",
    data: null,
  });
  const [openCloseProxy, setOpenCloseProxy] = useState("open");
  const [proxyContent, setProxyContent] = useState();
  const [votersRight, setVotersRight] = useState();
  const [proxyName, setProxyName] = useState();
  const [companyName, setCompanyName] = useState();

  const [electionProxy, setElectionProxy] = useState([]);
  const [resolutionProxy, setResolutionProxy] = useState([]);

  // const [quorumNumber] = useState(100);

  const [candidateInputCount, setCandidateInputCount] = useState([
    { name: "" },
    { name: "" },
    { name: "" },
  ]);

  const [setupProxy, setSetupProxy] = useState(false);

  const proxy = useSelector((state) => state.proxyReducer);

  const resolutionHandler = (value, selectedResolution, idx) => {
    const objIndex = obj.findIndex(
      (item) => item.resolution_id === selectedResolution.id
    );
    if (objIndex !== -1) {
      obj[objIndex].resolution_vote = value;
    } else {
      const resolution = {
        resolution_id: selectedResolution.id,
        resolution_vote: value,
      };
      obj.push(resolution);
    }

    // setResolutionList(obj);
  };
  const onChange = (e, idx) => {
    const { value } = e.target;

    const obj = [...candidateInputCount];

    obj[idx].name = value;
    setCandidateInputCount(obj);
  };
  const electionHandler = (value, selectedResolution, idx) => {
    const objIndex = objElection.findIndex(
      (item) => item.election_id === selectedResolution.id
    );
    if (objIndex !== -1) {
      objElection[objIndex].resolution_vote = value;
    } else {
      const resolution = {
        election_id: selectedResolution.id,
        election_vote: value,
      };
      objElection.push(resolution);
    }

    // setResolutionList(obj);
  };

  const dispenseCallback = React.useCallback(resolutionHandler, []);

  const dispatch = useDispatch();

  const handleStatutry = () => {
    setResolutionOpen(false);
    setStatutryOpen(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(addProxyValidation),
  });

  // const eventConfig = () => {
  //   return {
  //     count_proxy_by_quorum: countQuorom,
  //     quorum_number: quorumNumber,
  //     set_quorum_by: quorumBy,
  //   };
  // };

  useEffect(() => {
    if (resolutions && resolutions.length) {
      setResolutionSelector(resolutions);
    }
  }, [resolutions?.length]);

  useEffect(() => {
    if (elections && elections.length) {
      setElectionSelector(elections);
    }
  }, [elections?.length]);
  const addNewResolution = (idx) => {
    const resolutionArr = [...resolutionSelector];

    const currentProxy = resolutions[idx];
    if (currentProxy) {
      const exist = resolutionArr.find((item) => item.id === currentProxy.id);
      if (!exist) {
        resolutionArr.push(currentProxy);
        setResolutionSelector(resolutionArr);
      }
    }
  };
  const addNewElection = (idx) => {
    const resolutionArr = [...electionSelector];

    const currentProxy = elections[idx];
    if (currentProxy) {
      const exist = resolutionArr.find((item) => item.id === currentProxy.id);
      if (!exist) {
        resolutionArr.push(currentProxy);
        setElectionSelector(resolutionArr);
      }
    }
  };

  const addNewElectionCb = useCallback(addNewElection, [electionSelector]);

  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

  const fetchResolutions = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getResolutionsHandler(eventId);
      const proxyRes = [];
      data.forEach((item, idx) => {
        proxyRes.push({
          key: `Resolution ${idx + 1}`,
          label: `Resolution ${idx + 1}`,
        });
        proxyRes.push({
          key: `Resolution Vote`,
          label: `Resolution Vote`,
        });
      });

      setResolutions(data);
      setResolutionProxy(proxyRes);
    } catch (ex) {}
  };

  const fetchElections = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getElectionsHandler(eventId);
      const proxyRes = [];
      data.forEach((item, idx) => {
        proxyRes.push({
          key: `Election ${idx + 1}`,
          label: `Election ${idx + 1}`,
        });
        proxyRes.push({
          key: `Election_${idx + 1}_vote`,
          label: `Election_${idx + 1}_vote`,
        });
      });

      setElectionProxy(proxyRes);
      setElections(data);
    } catch (ex) {}
  };

  console.log("electionProxy", electionProxy);
  const onSubmit = (data) => {
    const attendeeList = [
      {
        participant_name: data.participantName,
        account_number: data.accountNumber,
        phone_number: data.phoneNumber,
        voting_right: Number(votersRight),
        nominated_proxy_name: data.nominatedProxy,
        setup_proxy_form: setupProxy,
        resolutions: obj,
        elections: objElection,
      },
    ];

    dispatch(postProxyAction({ attendees: attendeeList }));
    reset({
      electionVote: "",
      electionPosition: "",
      resolutionVote: "",
      resolution: "",
      nominatedProxy: "",
      votersRight: "",
      phoneNumber: "",
      accountNumber: "",
      participantName: "",
    });
    setVotersRight(0);
  };
  const onClose = (e) => {
    dispatch(resetAddProxy);
  };

  const onCloseProxy = (e) => {
    dispatch(resetAddProxy);

    setProxyUploadResponse({ status: false, message: "", data: null });
  };

  const submitFileUpload = async () => {
    setUploadingProxy(true);
    try {
      const { data } = await uploadProxy(
        { file: proxyTemplate },
        currentEvent.id
      );
      setProxyUploadResponse({
        status: false,
        data,
        message: "Uploaded successfully",
      });
      setUploadingProxy(false);
      reloadProxy();
    } catch (ex) {
      setUploadingProxy(false);

      setProxyUploadResponse({
        status: true,
        data: null,
        message: ex.response?.message ?? "Something went wrong",
      });
    }
  };

  const handleFileUpload = async (e) => {
    // uploadProxy({ file: })
    // const result = await fileUploader.uploadFile(e);

    setProxyTemplate(e.target.files[0]);

    // const attnedeeList = result.map((item) => ({
    //   name: item[`Participant Name`],
    //   email: item.Email,
    //   phone_number: item["Phone Number"],
    //   vote_rights: item.Vote,
    //   account_number: item["Account number"],
    // }));
    // setUploadAttendeeList(attnedeeList);
  };

  useEffect(() => {
    fetchResolutions(currentEvent.id);
  }, [reloadResolution]);
  useEffect(() => {
    fetchElections(currentEvent.id);
  }, [reloadElection]);

  const handleProxySetup = (e) => {
    setSetupProxy(e.target.checked);
  };

  const openCloseProxyHandler = (e) => {
    if (e.target.value === "closed") {
      setOpenCloseProxy("closed");
    } else {
      setOpenCloseProxy("open");
    }
  };

  const addCandidates = (candidate) => {
    const existUser = candidateList.find(
      (item) => item.name.toLowerCase() === candidate.name.toLowerCase()
    );

    if (!existUser) {
      setCandidateList([...candidateList, candidate]);
    }
  };
  const removeInput = (item, idx) => {
    const arr = [...candidateInputCount];
    arr.splice(idx, 1);

    if (arr.length === 0) {
      setCandidateInputCount([{ name: "" }]);
    } else {
      setCandidateInputCount(arr);
    }
  };

  useEffect(() => {
    if (proxy && proxy.data) {
      setTimeout(() => {
        dispatch(resetAddProxy);
      }, 500);
    }
  }, [proxy]);
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const quorumNumberHandle = (val) => {
    const newVal = val.target.value.replace(/,/g, "");
    setVotersRight(newVal);
  };

  console.log({ candidateInputCount });

  const submitProxyTemplate = async () => {
    const stakeHolderArr =
      openCloseProxy === "open"
        ? [proxyName]
        : candidateInputCount.map((item) => item.name);

    console.log({ companyName, proxyContent, stakeHolderArr });

    if (!companyName || !proxyContent || !stakeHolderArr.length) {
      Swal.fire("Warning", "Some fills are missing", "warning");
    } else {
      const req = {
        content: proxyContent,
        company_name: companyName,
        form_type: openCloseProxy,
        proxy_name_options: stakeHolderArr,
      };

      console.log({ req });
      setAddingTemplate(true);
      const [result, error] = await resolver(proxyTemplateHandler(req));
      console.log({ error });
      setAddingTemplate(false);
      if (result) {
        setProxyTemplateSuccess(true);
        setSetupProxy(false);
      } else {
        setProxyTemplateError(true);
      }
    }
  };

  return (
    <div className={style.main_containerLeft_form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder="Enter participant name..."
          labelTitle="Participant Name"
          inputType="text"
          isRequired={false}
          errors={errors}
          name="participantName"
          watch={watch}
          register={register("participantName")}
          showCount={false}
        />
        <FormInput
          placeholder="Enter Account Number"
          labelTitle="Participant Account Number"
          inputType="text"
          isRequired={false}
          errors={errors}
          name="accountNumber"
          watch={watch}
          maxLength={10}
          register={register("accountNumber")}
          showCount
          onKeyPress={preventMinus}
          onPaste={preventPasteNegative}
        />
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="firstName" className={style.form__input_label}>
              Attendee Voting rights (Holdings/units)
            </label>
            <NumberFormat
              value={votersRight}
              thousandSeparator={true}
              // prefix="NGN"
              placeholder="0"
              className="form__input"
              onChange={quorumNumberHandle}
              onKeyPress={preventMinus}
              onPaste={preventPasteNegative}
              required
            />
          </div>
        </div>
        <FormInput
          placeholder="Enter voters right"
          labelTitle="Nominated Proxy Name"
          inputType="text"
          isRequired={false}
          errors={errors}
          name="nominatedProxy"
          watch={watch}
          maxLength={100}
          register={register("nominatedProxy")}
          showCount={false}
        />

        <div className={style.form__input_wrap}>
          {resolutionSelector.length > 0 &&
            resolutionSelector.map((item, idx) => (
              <MemoResolutionPicker
                key={shortid.generate()}
                item={item}
                idx={idx}
                selectedValue={selectedValue}
                data={resolutionSelector}
                resolutions={resolutions}
                resolutionHandler={(e) =>
                  dispenseCallback(e.target.value, item)
                }
                addNewResolution={() => addNewResolution(idx + 1)}
              />
            ))}
        </div>
        <hr />
        <div className={style.form__input_wrap} style={{ marginTop: "10px" }}>
          {electionSelector.length > 0 &&
            electionSelector.map((item, idx) => (
              <MemoElectionPicker
                key={shortid.generate()}
                item={item}
                idx={idx}
                selectedValue={selectedValue}
                data={electionSelector}
                elections={elections}
                resolutionHandler={(e, idx) =>
                  electionHandler(e.target.value, item, idx)
                }
                addNewElection={addNewElectionCb}
                objElection={objElection}
              />
            ))}
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="firstName" className={style.form__input_label}>
              <Checkbox onChange={handleProxySetup}>
                <div className={style.form__label_text}>
                  <div className={style.form__label_title}>
                    Setup proxy form
                  </div>
                  <p className={style.form__label_content}>
                    Setup the proxy form for this event.
                  </p>
                </div>
              </Checkbox>
            </label>
          </div>
        </div>

        <div className={style.btnGroup}>
          <div className={style.btnGroup_left}>
            <button
              type="submit"
              disabled={proxy.loading}
              className={`${style.btnGroup_item} ${style.btnGroup_item_bg}`}
            >
              {proxy.loading ? <Spin size="large" color="#fff" /> : "Add Proxy"}
            </button>
            {proxy.data && (
              <AlertResponse
                status={proxy.status}
                data={proxy.data}
                onClose={onClose}
                message={proxy.message}
              />
            )}
          </div>
          <div className={style.uploadOption}>Or</div>
          <div className={style.btnGroup_right}>
            <Tooltip placement="right" title="Upload excel">
              <button
                type="button"
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFileUpload}
                />
              </button>
            </Tooltip>
            <Button onClick={submitFileUpload} disabled={uploadingProxy}>
              {uploadingProxy ? (
                <Spin size="large" color="#fff" />
              ) : (
                "Upload File"
              )}
            </Button>
            <Tooltip placement="right" title="Download Attendee template">
              <DownloadCsv
                data={proxies}
                csvHeader={[
                  { label: "Participant Name", key: "participant_name" },
                  {
                    label: "Participant Account Number",
                    key: "account_number",
                  },
                  {
                    label: "Nominated Proxy Name",
                    key: "nominated_proxy_name",
                  },
                  { label: "Voting Right", key: "voting_right" },

                  ...resolutionProxy,
                  ...electionProxy,
                ]}
                csvFileName="proxy.csv"
              />
              {/* <button
                type="button"
                onClick={() => download(ProxyTemplate, "proxyTemplate.csv")}
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <MdFileDownload className={style.uploadIcon} />
              </button> */}
            </Tooltip>
          </div>
          {proxyUploadResponse.status && (
            <Alert
              message={proxyUploadResponse.message}
              type="error"
              showIcon
              closable
              onClose={onCloseProxy}
            />
          )}
          {proxyUploadResponse.data && (
            <Alert
              message={proxyUploadResponse.message}
              type="success"
              showIcon
              closable
              onClose={onCloseProxy}
            />
          )}
        </div>
      </form>
      <LeftDrawerModal
        visible={setupProxy}
        modalHeight={"100vh"}
        drawerWidth="60%"
        closeModal={() => setSetupProxy(false)}
        tagName="Proxy Setup"
        headerTitle="Allow Proxy Voting"
        closeIcon={closeIcon}
      >
        <section>
          <div className={style.proxyFormTemp}>
            <div className={style.resolutionTab}>
              I/We{"  "}
              <input
                className={style.stakeHolderBox}
                placeholder="{ Shareholder  name }"
                value={stakeHolder}
                onChange={(e) => setStakeHolder(e.target.value)}
              />
              being a member/ members of{" "}
              <input
                className={style.stakeHolderBox}
                placeholder="{ Company name }"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              , hereby appoint{" "}
              {openCloseProxy !== "open" ? (
                <select>
                  <option value="">Select proxy</option>
                  {candidateInputCount.map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className={style.stakeHolderBox}
                  placeholder="{ Proxy name }"
                  value={proxyName}
                  onChange={(e) => setProxyName(e.target.value)}
                />
              )}
              <textarea
                value={proxyContent}
                onChange={(e) => setProxyContent(e.target.value)}
                className={style.stalkholder_textarea}
                placeholder={`failing him, the Chairman of the meeting as my/our proxy to act and vote for me/us and on my/our behalf at the 5TH Annual General Meeting of the Company to be held on Monday, May 31, 2021, at Radisson Blu Anchorage Hotel, 1a Ozumba Mbadiwe Avenue
Victoria Island Lagos, at 11.00a.m. and at any adjournment
thereof. A member (Shareholder) who is unable to attend an
Annual General Meeting is allowed by law to vote by proxy. The
above proxy form has been prepared to enable you exercise your
right to vote, in case you cannot personally attend the meeting.
Please sign this proxy form and forward it, so as to reach the
registered office of the Registrar, Africa Prudential Plc, 220B
Ikorodu Road, Palmgrove, Lagos, or via email at
cfc@africaprudential.com not later than 48 hours before the time
fixed for the meeting. If executed by a Corporation, the proxy
form must be under its common seal or under the hand of a duly
authorized officer or attorney. It is a requirement of the law
under the Stamp Duties Act, Cap S8, Laws of the Federation of
Nigeria, 2004, that any instrument of proxy to be used for the
purpose of voting by any person entitled to vote at any meeting
of shareholders must be stamped by the Commissioner for Stamp
Duties. However, in compliance with the CAC Guidelines for
conduct of AGM by Proxy, the Company has made arrangement at its
cost, for the stamping of the duly completed and signed proxy
forms submitted to the Company’s Registrars. The Proxy must
produce the Admission Card below to gain entrance into the
Meeting.`}
              ></textarea>
            </div>
            <div className={style.form__input_wrap}>
              <div className={style.form__input_box}>
                <label
                  htmlFor="question"
                  className={style.proxy__input_label}
                ></label>
                <div className={style.form__label_text}>
                  <div className={style.form__label_title}>
                    {/* Open Proxy/ Closed Proxy */}
                    <Radio.Group onChange={openCloseProxyHandler}>
                      <Space direction="vertical">
                        <Radio value="open">Open Proxy</Radio>
                        <Radio value="closed">Closed Proxy</Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                </div>
                {openCloseProxy === "closed" &&
                  candidateInputCount.length > 0 &&
                  candidateInputCount.map((item, idx) => (
                    <Candidate
                      key={idx}
                      addCandidates={addCandidates}
                      removeInput={() => removeInput(item, idx)}
                      onChange={(e) => onChange(e, idx)}
                      item={item}
                      disabled={openCloseProxy}
                    />
                  ))}
              </div>

              {openCloseProxy === "closed" && (
                <div className={style.resolutionSubBtn}>
                  <div
                    className={style.resolutionSubBtn_left}
                    onClick={() =>
                      setCandidateInputCount([
                        ...candidateInputCount,
                        { name: "" },
                      ])
                    }
                  >
                    <span className={style.addProxyBox}>
                      <FiPlus className={style.uploadIcon} size={18} />{" "}
                    </span>
                    <span className={style.addProxyText}>Add New Proxy</span>
                  </div>
                </div>
              )}
            </div>
            <div className={style.form__input_wrap}>
              <button
                onClick={submitProxyTemplate}
                type="button"
                className={style.form__input_view}
              >
                {addingTemplate ? <Spin size="large" color="#fff" /> : "Save"}
              </button>
            </div>

            {proxyTemplateSuccess && (
              <Alert
                message="Template created successfully"
                type="success"
                showIcon
                closable
                onClose={() => setProxyTemplateSuccess(false)}
              />
            )}

            {proxyTemplateError && (
              <Alert
                message="Template creation failed"
                type="error"
                showIcon
                closable
                onClose={() => setProxyTemplateError(false)}
              />
            )}
          </div>
        </section>
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={resolutionOpen}
        closeModal={() => setResolutionOpen(false)}
        tagName="Setup Resolution"
        headerTitle="Enter question and corresponding answer for your attendees to select
    from."
      >
        <ResolutionForm
          handleStatutry={handleStatutry}
          closeModal={() => setResolutionOpen(false)}
          reload={() => setReloadResolution((prev) => !prev)}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={electionOpen}
        closeModal={() => setElectionOpen(false)}
        tagName="Setup Election"
        headerTitle="Enter election and corresponding vote for your attendees to select from.."
      >
        <ElectionForm reload={() => setReloadElection((prev) => !prev)} />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={statutryOpen}
        closeModal={() => setStatutryOpen(false)}
        tagName="Statutory Resolution"
        headerTitle="Enter Statutory Resolution and corresponding vote for your attendees to select from."
      >
        <StatutoryForm handleStatutry={handleStatutry} />
      </LeftDrawerModal>
    </div>
  );
};

export const ResolutionPicker = ({
  register,
  item,
  errors,
  data,
  idx,
  addNewResolution,
  resolutionHandler,
  resolutions,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const onChangeHandler = (e) => {
    setSelectedValue(e.target.value);
    resolutionHandler(e);
  };
  return (
    <div className={style.form__input_wrap}>
      <div className={style.form__input_inline}>
        <div className={`${style.form__input_box} ${style.form__input_box_1}`}>
          <label className={style.form__input_label} htmlFor="firstName">
            Resolution
          </label>
          <div className={style.input__date}>
            <input className={style.form__input} defaultValue={item.title} />
          </div>
        </div>
        <div className={`${style.form__input_box} ${style.form__input_box_2}`}>
          <label htmlFor="endDate" className={style.form__input_label}>
            Resolution Vote
          </label>
          <div className={style.input__date}>
            <select
              className={style.form__input}
              onChange={onChangeHandler}
              value={selectedValue}
            >
              <option value="">Select vote</option>
              <option value="For">For</option>
              <option value="Against">Against</option>
              <option value="Abstain">Abstain</option>
            </select>
          </div>
        </div>
        {/* {resolutions && resolutions.length > 1 && data.length === idx + 1 && (
          <div
            className={`${style.form__input_box} ${style.form__input_box_3}`}
          >
            <Tooltip placement="right" title="Add Resolution">
              <button
                onClick={addNewResolution}
                type="button"
                style={{ backgroundColor: "#E5F4ED" }}
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <FiPlus className={style.uploadIcon} color="#09974D" />
              </button>
            </Tooltip>
          </div>
        )} */}
      </div>
    </div>
  );
};

export const ElectionPicker = ({
  register,
  item,
  errors,
  data,
  idx,
  addNewElection,
  resolutionHandler,
  elections,
  objElection,
}) => {
  const [selectedValue, setSelectedValue] = useState("for");
  const onChangeHandler = (e) => {
    setSelectedValue(e.target.value);
    resolutionHandler(e, idx);
  };
  console.log("Render: ElectionPicker");
  return (
    <div className={style.form__input_wrap}>
      <div className={style.form__input_inline}>
        <div className={`${style.form__input_box} ${style.form__input_box_1}`}>
          <label className={style.form__input_label} htmlFor="firstName">
            Election Position
          </label>
          <div className={style.input__date}>
            <input className={style.form__input} defaultValue={item.position} />
          </div>
        </div>
        <div className={`${style.form__input_box} ${style.form__input_box_2}`}>
          <label htmlFor="endDate" className={style.form__input_label}>
            Election Vote
          </label>
          <div className={style.input__date}>
            <select
              value={selectedValue}
              className={style.form__input}
              onChange={onChangeHandler}
            >
              <option value="">Select candidate</option>
              {item &&
                item.candidates.length > 0 &&
                item.candidates.map((item) => (
                  <option key={shortid.generate()} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* {elections && elections.length > 1 && data.length === idx + 1 && (
          <div
            className={`${style.form__input_box} ${style.form__input_box_3}`}
          >
            <Tooltip placement="right" title="Add Resolution">
              <button
                onClick={() => addNewElection(idx + 1)}
                type="button"
                style={{ backgroundColor: "#E5F4ED" }}
                className={`${style.btnGroup_item} ${style.btnGroup_item_noBg}`}
              >
                <FiPlus className={style.uploadIcon} color="#09974D" />
              </button>
            </Tooltip>
          </div>
        )} */}
      </div>
    </div>
  );
};

const MemoResolutionPicker = React.memo(ResolutionPicker);
const MemoElectionPicker = React.memo(ElectionPicker);

const closeIcon = () => {
  return (
    <span
      className={style.closeModal}
      style={{
        position: "absolute",
        top: "50%",
        left: "-1550%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        height: "40px",
        width: "40px",
        borderRadius: "50%",
        zIndex: 100000,
      }}
    >
      <MdClose color="#fff" />
    </span>
  );
};

const Candidate = ({ removeInput, item, onChange, inputRef, disabled }) => {
  return (
    <div className={style.input_box}>
      <input
        className={style.form__input}
        type="text"
        placeholder="Seun Sokeye"
        name="actions"
        value={item.name}
        onChange={onChange}
        readOnly={!disabled}
      />
      <span className={style.input_box_trash} onClick={() => removeInput(item)}>
        <FiTrash size={20} />
      </span>
    </div>
  );
};
export default ProxyForm;
