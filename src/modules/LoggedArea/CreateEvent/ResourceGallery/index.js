import { Modal, Tabs } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { BsAlarmFill, BsCaretRightFill } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { HiDownload, HiShare } from "react-icons/hi";
import { MdClose, MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

import SingleSelect, {
  RadioCard,
} from "../../../../components/Cards/SingleCardSelect";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
// import VirtalEvent from "../../../../assets/images/panorama1.png";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import style from "./index.module.scss";

const { TabPane } = Tabs;

const PreviewEvent = () => {
  const [tab, setTab] = useState("eventTab");
  const [openQuestion, setOpenQuestion] = useState(false);
  return (
    <PrivateGenericLayout
      leftNav={
        <DashboardLeftHeaderNav
          title="Types of Event"
          subtitle="Select the type of event you want to create and proceed"
        />
      }
    >
      <section>
        <div className={style.container}>
          <div className={style.containerNav}>
            <div className={style.containerNav_left}>
              <span className={style.containerNav_iconBox}>
                <MdKeyboardArrowLeft size={20} />
              </span>
            </div>
            <div className={style.containerNav_right}>
              <Link to="/Edit/create" className={style.editContinue}>
                Continue Edit
              </Link>
              <button className={style.publishEvent}>
                Create & Publish Event
              </button>
            </div>
          </div>
          <section>
            <div className={style.resourceNav}>
              <div className={style.resourecLeft}>
                <div className={style.resourceTop}>
                  <div
                    className={style.tabContent}
                    onClick={() => setTab("eventTab")}
                  >
                    <span
                      className={classNames(`${style.eventIndicate}`, {
                        [`${style.selectedTab}`]: tab === "eventTab",
                      })}
                    >
                      <BsCaretRightFill
                        size={18}
                        className={style.eventDirection}
                        color="#EF3125"
                      />
                    </span>
                    <span
                      className={classNames(`${style.indicatorTitle}`, {
                        [`${style.selectedTitleTab}`]: tab === "eventTab",
                      })}
                    >
                      Event Information
                    </span>
                  </div>
                  <div
                    className={style.tabContent}
                    onClick={() => setTab("resourceTab")}
                  >
                    <span
                      className={classNames(`${style.eventIndicate}`, {
                        [`${style.selectedTab}`]: tab === "resourceTab",
                      })}
                    >
                      <BsCaretRightFill
                        size={18}
                        className={style.eventDirection}
                        color="#EF3125"
                      />
                    </span>
                    <span
                      className={classNames(`${style.indicatorTitle}`, {
                        [`${style.selectedTitleTab}`]: tab === "resourceTab",
                      })}
                    >
                      Event Resources
                    </span>
                  </div>
                  <div
                    className={style.tabContent}
                    onClick={() => setTab("pollTab")}
                  >
                    <span
                      className={classNames(`${style.eventIndicate}`, {
                        [`${style.selectedTab}`]: tab === "pollTab",
                      })}
                    >
                      <BsCaretRightFill
                        size={18}
                        className={style.eventDirection}
                        color="#EF3125"
                      />
                    </span>
                    <span
                      className={classNames(`${style.indicatorTitle}`, {
                        [`${style.selectedTitleTab}`]: tab === "pollTab",
                      })}
                    >
                      Proxy Form
                    </span>
                  </div>
                </div>
                <div className={style.shareSocial}>
                  <div className={style.shareBox}>
                    <span>Share event</span>
                    <span className={style.sharable}>
                      <HiShare />
                    </span>
                  </div>
                  <div
                    className={`${style.footer__contact_social} ${style.footer__short_desc}`}
                  >
                    <ul className={style.social__list}>
                      <li className={style.social__list_item}>
                        <Link to="#" className={style.social__list__link}>
                          <span className={style.social__icon}>
                            <FaFacebookF color="#fff" size="15" />
                          </span>
                        </Link>
                      </li>
                      <li className={style.social__list_item}>
                        <Link to="#" className={style.social__list__link}>
                          <span className={style.social__icon}>
                            <FaInstagram color="#fff" size="15" />
                          </span>
                        </Link>
                      </li>
                      <li className={style.social__list_item}>
                        <Link to="#" className={style.social__list__link}>
                          <span className={style.social__icon}>
                            <FaTwitter color="#fff" size="15" />
                          </span>
                        </Link>
                      </li>
                      <li className={style.social__list_item}>
                        <Link to="#" className={style.social__list__link}>
                          <span className={style.social__icon}>
                            <FaLinkedinIn color="#fff" size="15" />
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={style.resourecRight}>
                <div className={style.resourceType}>
                  {tab === "eventTab" && (
                    <div>
                      <h3 className={style.resourceType_title}>
                        About This Event
                      </h3>
                      <p className={style.resourceType_para}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                        ipsum dolor sit amet, consetetur sadipscing elitr, sed
                        diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua. At vero eos et
                        accusam et justo duo dolores et ea rebum. Stet clita
                        kasd gubergren, no sea takimata sanctus est Lorem ipsum
                        dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam
                        voluptua. At vero eos et accusam et justo duo dolores et
                        ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                        dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna
                        aliquyam erat, sed diam voluptua. At vero eos et accusam
                        et justo duo dolores et ea rebum. Stet clita kasd
                        gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam
                        voluptua. At vero eos et accusam et justo duo dolores et
                        ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                        dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna
                        aliquyam erat, sed diam voluptua. At vero eos et accusam
                        et justo duo dolores et ea rebum. Stet clita kasd
                        gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam
                        voluptua. At vero eos et accusam et justo duo dolores et
                        ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                        dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna
                        aliquyam erat, sed diam voluptua. At vero eos et accusam
                        et justo duo dolores et ea rebum. Stet clita kasd
                        gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam
                        voluptua. At vero eos et accusam et justo duo dolores et
                        ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor.
                      </p>
                    </div>
                  )}
                  {tab === "resourceTab" && (
                    <div>
                      <h3 className={style.resourceType_title}>
                        Documents and materials for event
                      </h3>
                      <div className={style.resourceColl}>
                        <div className={style.uploadedDoc_list}>
                          <div className={style.uploadedDoc_list_item}>
                            <div className={style.uploadImg_name}>
                              <img
                                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                                className={style.uploadImg}
                              />
                              <span className={style.uploadFile}>
                                Brief Report .pdf (1.5mb)
                              </span>
                            </div>
                            <div className={style.uploadFooter}>
                              <span>
                                <HiDownload color="#EF3125" size={19} />
                              </span>
                            </div>
                          </div>
                          <div className={style.uploadedDoc_list_item}>
                            <div className={style.uploadImg_name}>
                              <img
                                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                                className={style.uploadImg}
                              />
                              <span className={style.uploadFile}>
                                Brief Report .pdf (1.5mb)
                              </span>
                            </div>
                            <div className={style.uploadFooter}>
                              <span>
                                <HiDownload color="#EF3125" size={19} />
                              </span>
                            </div>
                          </div>
                          <div className={style.uploadedDoc_list_item}>
                            <div className={style.uploadImg_name}>
                              <img
                                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940351/apems/pdf_dhlfew.png"
                                className={style.uploadImg}
                              />
                              <span className={style.uploadFile}>
                                Brief Report .pdf (1.5mb)
                              </span>
                            </div>
                            <div className={style.uploadFooter}>
                              <span>
                                <HiDownload color="#EF3125" size={19} />
                              </span>
                            </div>
                          </div>
                          <div className={style.uploadedDoc_list_item}>
                            <div className={style.uploadImg_name}>
                              <img
                                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940351/apems/pdf_dhlfew.png"
                                className={style.uploadImg}
                              />
                              <span className={style.uploadFile}>
                                Brief Report .pdf (1.5mb)
                              </span>
                            </div>
                            <div className={style.uploadFooter}>
                              <span>
                                <HiDownload color="#EF3125" size={19} />
                              </span>
                            </div>
                          </div>
                          <div className={style.uploadedDoc_list_item}>
                            <div className={style.uploadImg_name}>
                              <img
                                src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png"
                                className={style.uploadImg}
                              />
                              <span className={style.uploadFile}>
                                Brief Report .pdf (1.5mb)
                              </span>
                            </div>
                            <div className={style.uploadFooter}>
                              <span>
                                <HiDownload color="#EF3125" size={19} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {tab === "pollTab" && (
                    <div>
                      <div className={style.headerTab}>
                        <h3 className={style.resourceType_title}>Proxy Form</h3>
                        <div className={style.headerLeft}>
                          <span className={style.iconBox}>
                            {" "}
                            <BsAlarmFill size={18} />
                          </span>
                          <div className={style.duration}>
                            <span className={style.duration_left}>
                              Time left until form expires
                            </span>
                            <span className={style.duration_date}>
                              24:09: 23
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={style.templateContainer}>
                        <Tabs defaultActiveKey="1">
                          <TabPane
                            tab="Resolutions"
                            key="1"
                            className={style.tabStyle}
                          >
                            <div className={style.resolutionTab}>
                              I/We{"  "}
                              <input
                                className={style.stakeHolderBox}
                                placeholder="{ Stakeholder name }"
                              />
                              being a member/ members of Africa Prudential PLC,
                              hereby appoint /{" "}
                              <select
                                className={style.selectHolderTake}
                                placeholder="{ Stakeholder position }"
                              >
                                <option>Seun Sokeye</option>
                                <option>Chijindu Amadi</option>
                                <option>Ridwan Ajayi</option>
                                <option>Ayodeji Fasore</option>
                              </select>
                              <input
                                className={style.stakeHolderBox}
                                placeholder="{ Stakeholder position }"
                              />
                              failing him, the Chairman of the meeting as my/our
                              proxy to act and vote for me/us and on my/our
                              behalf at the 5TH Annual General Meeting of the
                              Company to be held on Monday, May 31, 2021, at
                              Radisson Blu Anchorage Hotel, 1a Ozumba Mbadiwe
                              Avenue Victoria Island Lagos, at 11.00a.m. and at
                              any adjournment thereof. A member (Shareholder)
                              who is unable to attend an Annual General Meeting
                              is allowed by law to vote by proxy. The above
                              proxy form has been prepared to enable you
                              exercise your right to vote, in case you cannot
                              personally attend the meeting. Please sign this
                              proxy form and forward it, so as to reach the
                              registered office of the Registrar, Africa
                              Prudential Plc, 220B Ikorodu Road, Palmgrove,
                              Lagos, or via email at cfc@africaprudential.com
                              not later than 48 hours before the time fixed for
                              the meeting. If executed by a Corporation, the
                              proxy form must be under its common seal or under
                              the hand of a duly authorized officer or attorney.
                              It is a requirement of the law under the Stamp
                              Duties Act, Cap S8, Laws of the Federation of
                              Nigeria, 2004, that any instrument of proxy to be
                              used for the purpose of voting by any person
                              entitled to vote at any meeting of shareholders
                              must be stamped by the Commissioner for Stamp
                              Duties. However, in compliance with the CAC
                              Guidelines for conduct of AGM by Proxy, the
                              Company has made arrangement at its cost, for the
                              stamping of the duly completed and signed proxy
                              forms submitted to the Company’s Registrars. The
                              Proxy must produce the Admission Card below to
                              gain entrance into the Meeting.
                            </div>
                            <div className={style.resolutionWrapper}>
                              <div className={style.pollContainer}>
                                <h4 className={style.pollTitle}>
                                  Resolution 1
                                </h4>
                                <div className={style.pollPara}>
                                  1. The actual market value of a right will
                                  differ from its theoretical value for all of
                                  the following reasons except for?
                                </div>
                                <div className={style.userReaction}>
                                  <div
                                    className={`${style.userReactionBox} ${style.userFor}`}
                                  >
                                    <span className={style.handleReaction}>
                                      For
                                    </span>
                                  </div>
                                  <div
                                    className={`${style.userReactionBox} ${style.userAgainst}`}
                                  >
                                    <span className={style.handleReaction}>
                                      Against
                                    </span>
                                  </div>
                                  <div
                                    className={`${style.userReactionBox} ${style.userAbstain}`}
                                  >
                                    <span className={style.handleReaction}>
                                      Abstain
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className={style.pollContainer}>
                                <h4 className={style.pollTitle}>
                                  Resolution 2
                                </h4>
                                <div className={style.pollPara}>
                                  1. The actual market value of a right will
                                  differ from its theoretical value for all of
                                  the following reasons except for?
                                </div>
                                <div className={style.userReaction}>
                                  <div
                                    className={`${style.userReactionBox} ${style.userFor}`}
                                  >
                                    <span className={style.handleReaction}>
                                      For
                                    </span>
                                  </div>
                                  <div
                                    className={`${style.userReactionBox} ${style.userAgainst}`}
                                  >
                                    <span className={style.handleReaction}>
                                      Against
                                    </span>
                                  </div>
                                  <div
                                    className={`${style.userReactionBox} ${style.userAbstain}`}
                                  >
                                    <span className={style.handleReaction}>
                                      Abstain
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className={style.resolutionWrapper}>
                              <div className={style.pollContainer}>
                                <h4 className={style.pollTitle}>
                                  Statutory Resolution
                                </h4>
                                <div className={style.pollPara}>
                                  1. To retain Seun Sokeye as a member of the
                                  statutory committee.
                                </div>
                                <div className={style.userReaction}>
                                  <div className={style.userReactionBox}>
                                    <img
                                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                                      className={style.handleEmoji}
                                    />
                                    <span className={style.handleReaction}>
                                      For
                                    </span>
                                  </div>
                                  <div className={style.userReactionBox}>
                                    <img
                                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                                      className={style.handleEmoji}
                                    />
                                    <span className={style.handleReaction}>
                                      Against
                                    </span>
                                  </div>
                                  <div className={style.userReactionBox}>
                                    <span className={style.handleReaction}>
                                      Against
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className={style.pollContainer}>
                                <h4 className={style.pollTitle}>
                                  Statutory Resolution
                                </h4>
                                <div className={style.pollPara}>
                                  1. To retain Seun Sokeye as a member of the
                                  statutory committee.
                                </div>
                                <div className={style.userReaction}>
                                  <div className={style.userReactionBox}>
                                    <img
                                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                                      className={style.handleEmoji}
                                    />
                                    <span className={style.handleReaction}>
                                      For
                                    </span>
                                  </div>
                                  <div className={style.userReactionBox}>
                                    <img
                                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                                      className={style.handleEmoji}
                                    />
                                    <span className={style.handleReaction}>
                                      Against
                                    </span>
                                  </div>
                                  <div className={style.userReactionBox}>
                                    <span className={style.handleReaction}>
                                      Against
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className={style.pollContainer}>
                                <h4 className={style.pollTitle}>
                                  Resolution 2
                                </h4>
                                <div className={style.pollPara}>
                                  1. The actual market value of a right will
                                  differ from its theoretical value for all of
                                  the following reasons except for?
                                </div>
                                <div className={style.userReaction}>
                                  <div className={style.userReactionBox}>
                                    <img
                                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                                      className={style.handleEmoji}
                                    />
                                    <span className={style.handleReaction}>
                                      For
                                    </span>
                                  </div>
                                  <div className={style.userReactionBox}>
                                    <img
                                      src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/handEmoji_qkjnpa.png"
                                      className={style.handleEmoji}
                                    />
                                    <span className={style.handleReaction}>
                                      Against
                                    </span>
                                  </div>
                                  <div className={style.userReactionBox}>
                                    <span className={style.handleReaction}>
                                      Against
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={style.containerNav_right}
                              style={{ justifyContent: "flex-end" }}
                            >
                              <Link
                                to="/Edit/create"
                                className={style.editContinue}
                              >
                                Continue Edit
                              </Link>
                              <button
                                className={style.publishEvent}
                                style={{ backgroundColor: "#6D7683" }}
                              >
                                Continue
                              </button>
                            </div>
                          </TabPane>
                          <TabPane
                            tab="Elections"
                            key="2"
                            className={style.tabStyle}
                          >
                            <div className={style.electionTab}>
                              <h3 className={style.electionTitle}>Elections</h3>
                              <div className={style.electionType}>
                                <h4>Vote for the Office of the President.</h4>
                                <div className={style.electionCand}>
                                  <SingleSelect
                                    containerStyle={{
                                      flexDirection: "column",
                                    }}
                                  >
                                    <RadioCard
                                      position="1"
                                      title="Ayodeji Fasore"
                                    />
                                    <RadioCard
                                      position="2"
                                      title="Seun Sokeye"
                                    />
                                    <RadioCard
                                      position="2"
                                      title="Ridwan Ajayi"
                                    />
                                  </SingleSelect>
                                </div>
                              </div>
                              <div className={style.electionType}>
                                <h4>
                                  Vote for the Office of the Vice President.
                                </h4>
                                <div className={style.electionCand}>
                                  <SingleSelect
                                    containerStyle={{
                                      flexDirection: "column",
                                    }}
                                  >
                                    <RadioCard
                                      position="1"
                                      title="Ayodeji Fasore"
                                    />
                                    <RadioCard
                                      position="2"
                                      title="Seun Sokeye"
                                    />
                                    <RadioCard
                                      position="2"
                                      title="Ridwan Ajayi"
                                    />
                                  </SingleSelect>
                                </div>
                              </div>
                              <div
                                className={style.containerNav_right}
                                style={{ justifyContent: "flex-end" }}
                              >
                                <Link
                                  to="#"
                                  className={style.askQuestion}
                                  onClick={() => setOpenQuestion(true)}
                                >
                                  Ask a Question
                                </Link>
                                <button
                                  className={style.publishEvent}
                                  style={{ backgroundColor: "#6D7683" }}
                                >
                                  Submit votes
                                </button>
                              </div>
                            </div>
                          </TabPane>
                        </Tabs>
                        <Modal
                          style={{
                            width: "100%",
                            maxWidth: "100%",
                            position: "absolute",
                            right: 0,
                            top: 0,
                          }}
                          visible={openQuestion}
                          onCancel={() => setOpenQuestion(false)}
                          width={"38%"}
                          bodyStyle={{
                            height: "180vh",
                            position: "relative",
                          }}
                          footer={null}
                          header={null}
                          position="relative"
                          closeIcon={
                            <span
                              className={style.closeModal}
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "-960%",
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
                          }
                        >
                          <section className={style.modalResolution}>
                            <span className={style.modalResolution_badge}>
                              Question
                            </span>
                            <h3 className={style.modalResolution_header}>
                              Ask Question
                            </h3>
                            <div className={style.modalResolution_formWrapper}>
                              <form>
                                <div className={style.form__input_wrap}>
                                  <div className={style.form__input_box}>
                                    <label
                                      htmlFor="question"
                                      className={style.form__input_label}
                                    >
                                      Select Question
                                    </label>
                                    <input
                                      className={style.form__input}
                                      type="text"
                                      placeholder="Select question"
                                      name="question"
                                    />
                                  </div>
                                </div>
                                <div className={style.form__input_wrap}>
                                  <div className={style.form__input_box}>
                                    <label
                                      htmlFor="question"
                                      className={style.form__input_label}
                                    >
                                      Question
                                    </label>
                                    <textarea
                                      className={style.form__input}
                                      placeholder="Type on your question"
                                      name="question"
                                    ></textarea>
                                  </div>
                                </div>
                                <button
                                  className={style.publishEvent}
                                  style={{ backgroundColor: "#6D7683" }}
                                >
                                  Send
                                </button>
                              </form>
                            </div>
                          </section>
                        </Modal>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </PrivateGenericLayout>
  );
};

export default PreviewEvent;
