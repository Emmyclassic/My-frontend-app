import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  getElectionsHandler,
  getResolutionsHandler,
  removeElectionHandler,
  removeResolutionHandler,
} from "../../../../api/resolutionHandler";

import ResolutionItem from "../../../../components/Cards/ResolutionItem";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
import ElectionForm from "./ElectionForm";
import EditElectionForm from "./ElectionForm/EditElectionForm";
import style from "./index.module.scss";
import ResolutionForm from "./ResolutionForm";
import EditResolutionForm from "./ResolutionForm/EditResolutionForm";
import EditStatutoryResolutionForm from "./ResolutionForm/EditStatutoryResolution";
import StatutoryForm from "./StatutoryForm";

const Resolution = ({ nextStep }) => {
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [electionOpen, setElectionOpen] = useState(false);
  const [statutryOpen, setStatutryOpen] = useState(false);
  const [resolutions, setResolutions] = useState();
  const [elections, setElections] = useState();
  const [reloadElection, setReloadElection] = useState();
  const [singleResolution, setSingleResolution] = useState();
  const [resolutionModal, setResolutionModal] = useState(false);
  const [editStatutoryModalOpen, setEditStatutoryModalOpen] = useState(false);
  const [reloadResolution, setReloadResolution] = useState(false);
  const [singleElectionDetail, setSingleElectionDetail] = useState();
  const [editElectionModal, setEditElectionModal] = useState(false);

  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
  const handleStatutry = () => {
    setResolutionOpen(false);
    setStatutryOpen(true);
  };

  const removeResolution = async () => {
    try {
      const resolution = resolutions.filter(
        (item) => item.id !== singleResolution.id
      );
      setResolutions(resolution);
      setResolutionModal(false);
      setResolutionModal(false);

      await removeResolutionHandler(singleResolution.id);
    } catch (err) {
      setResolutions([...resolutions, singleResolution]);
      setResolutionModal(false);
    }
  };

  const openEditElectionModal = (item) => {
    setEditElectionModal(true);
    setSingleElectionDetail(item);
  };

  const openDetailModal = (item) => {
    setSingleResolution(item);

    console.log("item", item);

    if (item.allow_physical) {
      setEditStatutoryModalOpen(true);
    } else {
      setResolutionModal(true);
    }
  };

  const fetchResolutions = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getResolutionsHandler(eventId);
      setResolutions(data);
    } catch (ex) {}
  };

  const fetchElections = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getElectionsHandler(eventId);
      setElections(data);
    } catch (ex) {}
  };

  useEffect(() => {
    fetchResolutions(currentEvent.id);
  }, [reloadResolution]);

  useEffect(() => {
    fetchElections(currentEvent.id);
  }, [reloadElection]);

  const removeElection = async () => {
    try {
      const election = elections.filter(
        (item) => item.id !== singleElectionDetail.id
      );
      setElections(election);
      setEditElectionModal(false);

      await removeElectionHandler(singleElectionDetail.id);
    } catch (err) {
      setElections([...elections, singleElectionDetail]);
      setEditElectionModal(false);
    }
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <div className={style.menuItem} onClick={() => setResolutionOpen(true)}>
          Create Resolution
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className={style.menuItem} onClick={() => setStatutryOpen(true)}>
          Create Statutory Resolution
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <section className={style.main}>
      {(resolutions && resolutions.length > 0) ||
      (elections && elections.length > 0) ? (
        <div className={style.main_container}>
          {resolutions?.map((item, idx) => (
            <ResolutionItem
              item={item}
              key={idx}
              count={idx + 1}
              onClick={() => openDetailModal(item)}
              keyword={
                item.allow_physical ? "Statustory Resolution" : "Resolution"
              }
            />
          ))}
          {elections?.map((item, idx) => (
            <ResolutionItem
              item={{ ...item, title: item.position }}
              key={idx}
              count={idx + 1}
              onClick={() => openEditElectionModal(item)}
              keyword="Election"
            />
          ))}

          <div
            className={style.main_container_btnContainer}
            style={{ justifyContent: "flex-start" }}
          >
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              arrow
              trigger={["click"]}
            >
              <button
                className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
              >
                <span className={style.main_container_btnContainer_btn_icon}>
                  <FiPlus size={18} color="#09974d" />
                </span>
                <span className={style.main_container_btnContainer_btn_title}>
                  Add Resolution
                </span>
              </button>
            </Dropdown>

            <button
              onClick={() => setElectionOpen(true)}
              className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_elec}`}
            >
              Create Elections
            </button>
          </div>
          <div className={style.form__input_wrap} style={{ marginTop: "5rem" }}>
            <button
              type="button"
              className={style.form__input_submit_request}
              onClick={() => nextStep()}
            >
              {"Continue >>>"}
            </button>
          </div>
        </div>
      ) : (
        <div className={style.main_container}>
          <div className={style.content}>
            <img
              src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
              className={style.main_container_imgbox}
            />
            <h4 className={style.main_container_title}>Create Resolution</h4>
            <div className={style.main_container_content}>
              {`A resolution makes it easy to retrieve information from your
              intending participants before and during your event starts. Feel
              free to skip if you don't want to create resolution.`}
            </div>
          </div>
          <div className={style.main_container_btnContainer}>
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              arrow
              trigger={["click"]}
            >
              <button
                className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
              >
                <span className={style.main_container_btnContainer_btn_icon}>
                  <FiPlus size={18} color="#09974d" />
                </span>
                <span className={style.main_container_btnContainer_btn_title}>
                  Add Resolution
                </span>
              </button>
            </Dropdown>
            <button
              onClick={() => setElectionOpen(true)}
              className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_elec}`}
            >
              Create Elections
            </button>
          </div>
          <div className={style.form__input_wrap} style={{ marginTop: "5rem" }}>
            <button
              type="button"
              className={style.form__input_submit_request}
              onClick={() => nextStep()}
            >
              {"Skip & Continue >>>"}
            </button>
          </div>
        </div>
      )}
      <LeftDrawerModal
        visible={resolutionOpen}
        closeModal={() => setResolutionOpen(false)}
        tagName="Setup Resolution"
        modalHeight="100vh"
        headerTitle="Enter resolution for your meeting attendees to vote on"
      >
        <ResolutionForm
          handleStatutry={handleStatutry}
          closeModal={() => {
            setReloadResolution((prev) => !prev);
            setResolutionOpen(false);
          }}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={resolutionModal}
        destroyOnClose={true}
        modalHeight="100vh"
        closeModal={() => setResolutionModal(false)}
        tagName="Setup Resolution"
        headerTitle="Enter resolution for your meeting attendees to vote on"
      >
        <EditResolutionForm
          item={singleResolution}
          openEditResolution={() => setResolutionModal(true)}
          removeResolution={removeResolution}
          reloadResolution={() => setReloadResolution((prev) => !prev)}
          closeResolutionModal={() => setResolutionModal(false)}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={editStatutoryModalOpen}
        destroyOnClose={true}
        modalHeight="100vh"
        closeModal={() => setEditStatutoryModalOpen(false)}
        tagName="Setup Statutory Resolution"
        headerTitle="Enter Statutory Resolution for your meeting attendees to vote on."
      >
        <EditStatutoryResolutionForm
          item={singleResolution}
          openEditResolution={() => setEditStatutoryModalOpen(true)}
          removeResolution={removeResolution}
          reloadResolution={() => setReloadResolution((prev) => !prev)}
          closeResolutionModal={() => setEditStatutoryModalOpen(false)}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={electionOpen}
        closeModal={() => setElectionOpen(false)}
        destroyOnClose={true}
        drawerWidth={"85%"}
        tagName="Setup Election"
        top={"30px"}
        left={"-1280px"}
        modalHeight="100vh"
        headerTitle="Enter election position and the possible candidates for your attendees to select from."
      >
        <ElectionForm
          reload={() => setReloadElection((prev) => !prev)}
          closeReolutionModal={() => setElectionOpen((prev) => !prev)}
        />
      </LeftDrawerModal>

      <LeftDrawerModal
        visible={editElectionModal}
        destroyOnClose={true}
        drawerWidth={"85%"}
        closeModal={() => setEditElectionModal(false)}
        tagName="Setup Election"
        top={"30px"}
        left={"-1280px"}
        modalHeight="100vh"
        headerTitle="Enter election position and the possible candidates for your attendees to select from."
      >
        <EditElectionForm
          item={singleElectionDetail}
          setEditQuestionaaireModal={() => setEditElectionModal(true)}
          removeElection={removeElection}
          reloadElection={() => setReloadElection((prev) => !prev)}
          closeEditElectionModal={() => {
            setEditElectionModal(false);
          }}
          closeModal={() => setEditElectionModal(false)}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        visible={statutryOpen}
        modalHeight="100%"
        closeModal={() => setStatutryOpen(false)}
        tagName="Setup Statutory Resolution"
        headerTitle="Enter Statutory Resolution for your meeting attendees to vote on."
      >
        <StatutoryForm
          handleStatutry={handleStatutry}
          openResolution={() => {
            setResolutionOpen(true);
            setStatutryOpen(false);
          }}
          reload={() => {
            setReloadResolution((prev) => !prev);
            setStatutryOpen(false);
          }}
        />
      </LeftDrawerModal>
    </section>
  );
};

export default Resolution;
