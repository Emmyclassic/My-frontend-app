import { Spin, Tooltip } from "antd";
import React, { useState } from "react";
import { ImMusic } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import shortid from "shortid";
import Swal from "sweetalert2";
import { uploadFile } from "../../../api/eventHandler";
import { createMusic } from "../../../api/resourceHandler";

import { truncate } from "../../../utils/truncate";
import style from "./index.module.scss";

const DocumentCard = ({
  closeDocument,
  documents,
  modalSubtitle,
  ModalTitle,
  reload,
  eventDetail,
  selectedMusic,
  toggleAudioModal,
}) => {
  console.log({ musicEv: eventDetail });
  const [uploading, setUploading] = useState(false);

  const uploadMusicHandler = async (e) => {
    try {
      const file = e.target.files[0];

      setUploading(true);
      const {
        data: {
          data: { file_link },
        },
      } = await uploadFile({
        file: e.target.files[0],
        file_name: file.name,
      });
      const { data } = await createMusic(eventDetail.id, {
        title: file.name,
        url: file_link,
      });
      setUploading(false);
      if (data) {
        reload();
      }
    } catch (ex) {
      setUploading(false);
      Swal.fire("error", ex?.response?.message ?? "Something went wrong");
    }
  };

  return (
    <div className={style.documentFooter}>
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
                toggleAudioModal={() => toggleAudioModal(true, item)}
                // playMusicHandler={() => playMusicHandler("play", item)}
              />
            ))
          : null}

        {eventDetail && eventDetail.role === 1 && (
          <DocumentList
            item={{ title: "Upload Music" }}
            isUpload={true}
            actionHandler={uploadMusicHandler}
            uploading={uploading}
          />
        )}
      </div>
    </div>
  );
};

const DocumentList = ({
  item,
  actionHandler,
  isUpload,
  uploading,
  extension = ".mp3",
  playMusicHandler,
  toggleAudioModal,
}) => {
  return (
    <>
      {/* <Modal
        style={{
          width: "100%",
          zIndex: "99999999",
        }}
        width={600}
        visible={openAudio}
        bodyStyle={{
          position: "relative",
          zIndex: "99999999",
          backgroundColor: "#2B2B2B",
        }}
        footer={null}
        header={null}
        position="relative"
        closeIcon={<CloseIcon closeModal={closeAudioModal} />}
      >
        <section className={style.container}>
          <ReactAudioPlayer
            src={item.url}
            onPlay={() => playMusicHandler("play")}
            controls
            onPause={() => playMusicHandler("pause")}
            // autoPlay
            ref={audioRef}
          />
        </section>
      </Modal> */}
      {isUpload && (
        <input
          type="file"
          id="actual-btn"
          hidden
          accept={extension}
          onChange={actionHandler}
        />
      )}

      <label
        htmlFor={isUpload && "actual-btn"}
        className={style.documentCard_list}
        onClick={isUpload === false ? toggleAudioModal : undefined}
      >
        <div className={style.iconContainer}>
          <span className={style.documentCard_list_icon}>
            {uploading ? (
              <Spin size="large" color="#fff" />
            ) : isUpload ? (
              <MdFileUpload size={50} />
            ) : (
              <ImMusic size={50} />
            )}
          </span>
        </div>
        <div className={style.documentCardTitle}>
          <Tooltip zIndex={90000} title={item?.title} placement="right">
            {truncate(item?.title ?? "", 15, "...")}{" "}
          </Tooltip>
        </div>
      </label>
    </>
  );
};

export default DocumentCard;
