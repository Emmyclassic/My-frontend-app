import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  getQuestionaaireHandler,
  removeQuestionHandler,
} from "../../../../api/resolutionHandler";

import ResolutionItem from "../../../../components/Cards/ResolutionItem";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
import style from "./index.module.scss";
import QuestionaireForm from "./QuestionaiireForm";
import EditQuestionaireForm from "./QuestionaiireForm/EditQuestionaireForm";

const Questionaaire = ({ nextStep }) => {
  const [questions, setQuestions] = useState();
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [editQuestionaaireModal, setEditQuestionaaireModal] = useState(false);
  const [singleQuestionaaire, setSingleQuestionaaire] = useState();
  const [reloadQuestion, setReloadQuestion] = useState(false);
  const currentEvent = JSON.parse(localStorage.getItem("currentEvent"));

  const removeQuestionaiira = async () => {
    try {
      const question = questions.filter(
        (item) => item.id !== singleQuestionaaire.id
      );
      setQuestions(question);
      setEditQuestionaaireModal(false);

      await removeQuestionHandler(singleQuestionaaire.id);
    } catch (err) {
      setQuestions([...questions, singleQuestionaaire]);
      setEditQuestionaaireModal(false);
    }
  };

  const fetchQuestions = async (eventId) => {
    try {
      const {
        data: { data },
      } = await getQuestionaaireHandler(eventId);

      setQuestions(data);
    } catch (ex) {}
  };
  const openQuestionDetailModal = (item) => {
    setEditQuestionaaireModal(true);
    setSingleQuestionaaire(item);
  };

  useEffect(() => {
    fetchQuestions(currentEvent.id);
  }, [reloadQuestion]);
  return (
    <section className={style.main}>
      {questions && questions.length > 0 ? (
        <div className={style.main_container}>
          {questions.map((item, idx) => (
            <ResolutionItem
              keyword="Question"
              item={item}
              key={idx}
              count={idx + 1}
              onClick={() => openQuestionDetailModal(item)}
            />
          ))}
          <div
            className={style.main_container_btnContainer}
            style={{ justifyContent: "flex-start" }}
          >
            <button
              onClick={() => setResolutionOpen(true)}
              className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
            >
              <span className={style.main_container_btnContainer_btn_icon}>
                <FiPlus size={18} color="#09974d" />
              </span>
              <span className={style.main_container_btnContainer_btn_title}>
                Ask Question
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className={style.main_container}>
          <img
            src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/user_oardue.jpg"
            className={style.main_container_imgbox}
          />
          <h4 className={style.main_container_title}>Ask Question</h4>
          <div className={style.main_container_content}>
            {`You can ask your attendees questions before the date of your event, this makes it easy to get information about your audience and prepare accordingly.`}
          </div>
          <div className={style.main_container_btnContainer}>
            <button
              onClick={() => setResolutionOpen(true)}
              className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
            >
              <span className={style.main_container_btnContainer_btn_icon}>
                <FiPlus size={18} color="#09974d" />
              </span>
              <span className={style.main_container_btnContainer_btn_title}>
                Ask Question
              </span>
            </button>
          </div>
        </div>
      )}

      <div className={style.form__input_wrap}>
        <button
          onClick={nextStep}
          type="button"
          className={style.form__input_submit_request}
        >
          {questions && questions.length ? "Continue" : "Skip & Continue >>>"}
        </button>
      </div>

      <LeftDrawerModal
        visible={resolutionOpen}
        closeModal={() => setResolutionOpen(false)}
        tagName="Ask Question"
        headerTitle="Ask your attendees questions to gain their opinions."
      >
        <QuestionaireForm
          closeModal={() => {
            setReloadQuestion((prev) => !prev);
            setResolutionOpen(false);
          }}
        />
      </LeftDrawerModal>
      <LeftDrawerModal
        destroyOnClose={true}
        visible={editQuestionaaireModal}
        closeModal={() => setEditQuestionaaireModal(false)}
        tagName="Ask Question"
        headerTitle="Ask your attendees questions to gain their opinions."
      >
        <EditQuestionaireForm
          item={singleQuestionaaire}
          setEditQuestionaaireModal={() => setEditQuestionaaireModal(true)}
          removeQuestionaiira={removeQuestionaiira}
          reloadQuestion={() => setReloadQuestion((prev) => !prev)}
          closeQuestionaireModal={() => {
            setEditQuestionaaireModal(false);
          }}
          closeModal={() => setEditQuestionaaireModal(false)}
        />
      </LeftDrawerModal>
    </section>
  );
};

export default Questionaaire;
