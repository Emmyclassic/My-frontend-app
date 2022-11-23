import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import { AiFillQuestionCircle } from "react-icons/ai";
import shortid from "shortid";
import { Modal, Spin } from "antd";
import DocumentForm from "../../../modules/LoggedArea/CreateEvent/Resources/DocumentForm";
import style from "./index.module.scss";

const DocumentCard = ({
  closeDocument,
  documents,
  modalSubtitle,
  ModalTitle,
  selectFIle,
  eventDetail,
}) => {
  const [openDocument, setOpenDocument] = useState(false);
  const [uploading] = useState(false);
  const eventInfo = localStorage.getItem("eventInfo");

  return (
    <div className={style.documentFooter}>
      <Modal
        zIndex="999999"
        title={
          <div className={style.addProxyHeader}>
            <div className={style.proxyIconBox}>
              <span className={style.questionBox}>
                <AiFillQuestionCircle color="#fff" />
              </span>
            </div>
            <div className={style.addTitle}>ADD DOCUMENT</div>
          </div>
        }
        centered
        footer={null}
        visible={openDocument}
        closable={true}
        onCancel={() => setOpenDocument(false)}
      >
        <div style={{ width: "450px" }}>
          <DocumentForm
            id={JSON.parse(eventInfo).id}
            reload={() => setOpenDocument(false)}
            setTab={() => setOpenDocument(false)}
          />
        </div>
      </Modal>
      <div className={style.documentHeader}>
        <div className={style.documentHeader_left}>
          <h4 className={style.mainTitle}>{ModalTitle}</h4>
          <p className={style.subTitle}>{modalSubtitle}</p>
        </div>

        <span className={style.documentCloseIcon} onClick={closeDocument}>
          <IoMdClose size={20} color="rgba(255, 255, 255, 0.4)" />
        </span>
      </div>
      <div className={style.documentCard}>
        {documents && documents.length
          ? documents.map((item) => (
              <DocumentList
                item={item}
                key={shortid.generate()}
                isUpload={false}
                selectFIle={() => selectFIle(item)}
              />
            ))
          : null}

        {eventDetail && eventDetail.role === 1 && (
          <DocumentList
            item={{ title: "Upload Document" }}
            isUpload={true}
            actionHandler={() => setOpenDocument(true)}
            uploading={uploading}
            extension=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf,.csv"
          />
        )}
      </div>
    </div>
  );
};

const DocumentList = ({
  item,
  selectFIle,
  isUpload,
  uploading,
  actionHandler,
  extension = ".mp3",
}) => {
  const imageType = (filePath) => {
    if (filePath.includes(".doc")) {
      return "https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png";
    } else if (filePath.includes(".pdf")) {
      return "https://res.cloudinary.com/solomonfrank/image/upload/v1655940351/apems/pdf_dhlfew.png";
    } else if (filePath.includes(".ppt") || filePath.includes(".pptx")) {
      return "https://res.cloudinary.com/solomonfrank/image/upload/v1655940352/apems/pptxImage_oo4zsd.png";
    } else {
      return "https://res.cloudinary.com/solomonfrank/image/upload/v1655940357/apems/xls_rnpvmc.png";
    }
  };
  return (
    <>
      {/* {isUpload && (
        <input
          type="file"
          id="actual-btn"
          hidden
          accept={extension}
          onChange={actionHandler}
        />
      )} */}

      <label
        htmlFor={isUpload && "actual-btn"}
        className={style.documentCard_list}
        onClick={isUpload === false ? selectFIle : actionHandler}
      >
        <div
          className={style.documentCard_list}
          // onClick={selectFIle}
          // onClick={() => download(item.banner, item.title)}
        >
          <div className={style.iconContainer}>
            <span className={style.documentCard_list_icon}>
              {uploading ? (
                <Spin size="large" color="#fff" />
              ) : isUpload ? (
                <MdFileUpload size={50} />
              ) : (
                <img src={imageType(item.url)} className={style.uploadImg} />
              )}
            </span>
          </div>
          <div className={style.documentCardTitle}>{item.title}</div>
        </div>
      </label>
    </>
  );
};

export default DocumentCard;
