import { Dropdown, Menu, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getResources, getSpeakers } from "../../../../api/resourceHandler";
import CircularAvatar from "../../../../components/Avatar/CircularAvatar";
import AgmLink from "./AgmLink";
import DocumentForm from "./DocumentForm";
import DocumentList from "./DocumentList";
import EntertainForm from "./EntertainerForm";
import style from "./index.module.scss";
import Landing from "./Landing";
import LinkForm from "./LinkForm";
import VideoForm from "./VideoForm";
import VideoList from "./VideoList";

const { TabPane } = Tabs;
const Resource = ({ nextStep }) => {
  const [tab, setTab] = useState("firstTab");
  const [links, setLinks] = useState([]);
  const [linkError, setLinkError] = useState();
  const [documentError, setDocumentError] = useState();
  const [videoError, setVideoError] = useState();
  const [documents, setDocuments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reloadLink, setReloadLink] = useState(false);
  const [reloadVideo, setReloadVideo] = useState(false);
  const [speakerError, setSpeakerError] = useState();
  const [reloadDocument, setReloadDocument] = useState(false);
  const eventResponse = useSelector((state) => state.eventTypes);
  const { id } = useParams();
  const [speakers, setSpeakers] = useState();
  const [reloadEntertainer, setReloadEntertainer] = useState(false);
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

  const currentEventType = eventResponse.data?.find((item) => item.id === id);
  // const { loading, imageUrl } = useState(false);

  const fetchLinks = async (filter) => {
    try {
      const {
        data: { data },
      } = await getResources(filter);
      console.log("lin", data);
      if (data.length) {
        setTab("documentList");
      }

      setLinks(data);
    } catch (err) {
      setLinkError("Something went wrong", err);
    }
  };
  console.log("tab", tab);
  const removeLink = (item) => {
    const filteredResult = links.filter((m) => m.id !== item.id);
    setLinks(filteredResult);
  };

  const removeDocument = (item) => {
    const filteredResult = documents.filter((m) => m.id !== item.id);
    setDocuments(filteredResult);
  };
  const removeVideo = (item) => {
    const filteredResult = videos.filter((m) => m.id !== item.id);
    setVideos(filteredResult);
  };
  const fetchDocuments = async (filter) => {
    try {
      const {
        data: { data },
      } = await getResources(filter);
      console.log("doc", data);
      if (data.length) {
        setTab("documentList");
      }
      setDocuments(data);
    } catch (err) {
      setDocumentError("Something went wrong", err);
    }
  };
  const fetchVideos = async (filter) => {
    try {
      const {
        data: { data },
      } = await getResources(filter);
      console.log("video", data);
      setVideos(data);
      if (data.length) {
        setTab("documentList");
      }
    } catch (err) {
      setVideoError("Something went wrong", err);
    }
  };
  const fetchSpeakers = async () => {
    try {
      const {
        data: { data },
      } = await getSpeakers(currentEvent.id);

      console.log("shshshhs", data);

      setSpeakers(data);
    } catch (err) {
      setSpeakerError("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, [reloadEntertainer]);
  useEffect(() => {
    fetchLinks("link");
    fetchDocuments("document");
    fetchVideos("video");
  }, []);
  useEffect(() => {
    fetchDocuments("document");
  }, [reloadDocument]);
  useEffect(() => {
    fetchVideos("video");
  }, [reloadVideo]);

  useEffect(() => {
    fetchLinks("link");
  }, [reloadLink]);

  console.log("hshhshshhs", speakers);

  // useEffect(() => {
  //   if (videos.length || links.length || documents.length) {
  //     setTab("documentList");
  //   }
  // }, [reload]);

  const menu = (
    <Menu>
      <Menu.Item>
        <div className={style.menuItem} onClick={() => setTab("document")}>
          Add Document
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className={style.menuItem} onClick={() => setTab("documentLink")}>
          Add Link
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className={style.menuItem} onClick={() => setTab("videoUpload")}>
          Add Video
        </div>
      </Menu.Item>

      {currentEventType.type === "concerts" && (
        <Menu.Item>
          <div className={style.menuItem} onClick={() => setTab("entertainer")}>
            Add Entertainer
          </div>
        </Menu.Item>
      )}
      {currentEventType.type === "meetings" && (
        <Menu.Item>
          <div className={style.menuItem} onClick={() => setTab("entertainer")}>
            Add Panelist/Speakers
          </div>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <>
      {tab === "documentList" && (
        <div className={style.templateContainer_content}>
          <div className={style.buttonContainer}>
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              arrow
              trigger={["click"]}
            >
              <button
                onClick={() => {}}
                className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
              >
                <span className={style.main_container_btnContainer_btn_icon}>
                  <FiPlus size={18} color="#09974d" />
                </span>
                <span className={style.main_container_btnContainer_btn_title}>
                  Add a documents, links and video
                </span>
              </button>
            </Dropdown>
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab="My Uploaded Documents"
              key="1"
              className={style.tabStyle}
            >
              {documentError && !documents.length && (
                <div>Something went wrong</div>
              )}
              <DocumentList
                items={documents}
                nextStep={nextStep}
                showNext={true}
                showSetting={true}
                removeDocument={removeDocument}
                reload={() => setReloadDocument((prev) => !prev)}
              />
            </TabPane>
            <TabPane tab="My Links" key="2" className={style.tabStyle}>
              {linkError && !links.length && <div>Something went wrong</div>}
              <AgmLink
                items={links}
                nextStep={nextStep}
                showNext={true}
                removeLink={removeLink}
                reload={() => setReloadLink((prev) => !prev)}
              />
            </TabPane>
            <TabPane tab="My Video" key="3" className={style.tabStyle}>
              {videoError && !videos.length && <div>Something went wrong</div>}
              <div className={style.uploadLink_wrap}>
                <VideoList
                  items={videos}
                  nextStep={nextStep}
                  showNext={true}
                  removeVideo={removeVideo}
                  reload={() => setReloadVideo((prev) => !prev)}
                />
              </div>
            </TabPane>
            {currentEventType.type !== "agm" && (
              <TabPane tab="Entertainer" key="4" className={style.tabStyle}>
                {speakerError && !speakers.length && (
                  <div>Something went wrong</div>
                )}
                <div className={style.uploadLink_wrap}>
                  {/* <VideoList
                items={speakers}
                nextStep={nextStep}
                showNext={true}
                removeVideo={removeVideo}
                reload={() => setReloadVideo((prev) => !prev)}
              /> */}
                  {speakers && speakers.length
                    ? speakers.map((item, idx) => (
                        <CircularAvatar
                          imageUrl={item.photo}
                          key={item.id}
                          title={item.name}
                        />
                      ))
                    : null}
                  <div
                    className={style.form__input_wrap}
                    style={{ marginTop: "7rem" }}
                  >
                    <button
                      onClick={nextStep}
                      type="button"
                      className={style.form__input_submit_request}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </TabPane>
            )}
          </Tabs>
        </div>
      )}
      <section className={style.main}>
        {tab === "firstTab" &&
          !videos.length &&
          !links.length &&
          !documents.length && (
            <Landing
              setTab={setTab}
              reload={() => {
                setReloadLink((prev) => !prev);
                setReloadVideo((prev) => !prev);
                setReloadDocument((prev) => !prev);
              }}
              nextStep={nextStep}
            />
          )}
        {tab === "document" && (
          <DocumentForm
            setTab={setTab}
            reload={() => setReloadDocument((prev) => !prev)}
            nextStep={nextStep}
          />
        )}
        {tab === "videoUpload" && (
          <VideoForm
            setTab={setTab}
            reload={() => setReloadVideo((prev) => !prev)}
            nextStep={nextStep}
          />
        )}
        {tab === "entertainer" && (
          <EntertainForm
            setTab={setTab}
            reload={() => setReloadEntertainer((prev) => !prev)}
            nextStep={nextStep}
          />
        )}
        {tab === "documentLink" && (
          <LinkForm
            nextStep={nextStep}
            setTab={setTab}
            reload={() => setReloadLink((prev) => !prev)}
          />
        )}
      </section>
    </>
  );
};

export default Resource;
