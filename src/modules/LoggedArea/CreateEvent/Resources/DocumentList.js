import { Switch } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { HiDownload } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import shortid from "shortid";
import Swal from "sweetalert2";
import {
  deleteResoluteItem,
  deleteResource,
  updateVisiblity,
} from "../../../../api/resourceHandler";

import DocumentItem from "../../../../components/DocumentList";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
import { download } from "../../../../utils/download";
import style from "./index.module.scss";

const DocumentList = ({
  items,
  nextStep,
  showNext,
  showSetting,
  reload,
  removeDocument,
  showDelete = true,
}) => {
  const [openDocument, setOpenDocument] = useState(false);

  const [selectedItem, setSelectedItem] = useState();
  const [selectedItemTitle, setSelectedItemTitle] = useState();
  const [selectedDoc, setSelectedDoc] = useState();

  const toggleFolderModal = (status, item) => {
    setOpenDocument(status);
    setSelectedItem(item?.resource_files);
    setSelectedItemTitle(item?.section_title);
    setSelectedDoc(item);
  };

  const setVisibilty = async (status, id) => {
    try {
      const { data } = await updateVisiblity({ visibility: status }, id);

      if (data) {
        reload();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const imageType = (filePath) => {
    if (filePath.includes(".doc")) {
      return "https://res.cloudinary.com/solomonfrank/image/upload/v1655940356/apems/word_ki7ugm.png";
    } else if (filePath.includes(".pdf")) {
      return "https://res.cloudinary.com/solomonfrank/image/upload/v1655940351/apems/pdf_dhlfew.png";
    } else if (filePath.includes(".pptx") || filePath.includes(".ppt"))
      return "https://res.cloudinary.com/solomonfrank/image/upload/v1655940352/apems/pptxImage_oo4zsd.png";
    else {
      return "https://res.cloudinary.com/solomonfrank/image/upload/v1655940357/apems/xls_rnpvmc.png";
    }
  };
  const deleteResourceHandler = (item) => {
    console.log("item dwd", item);
    Swal.fire({
      title: "Delete Resource",

      text: "Resource will be delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#eddcd2",
      confirmButtonText: "Delete",
      customClass: {
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newSelection = selectedItem.filter((m) => m.id !== item.id);
        setSelectedItem(newSelection);
        deleteResoluteItem(item.id)
          .then((res) => {
            Swal.fire("Closed!", "Resources deleted", "success");
            reload();
          })

          .catch(() => {
            const copySelected = [...selectedItem, item];
            setSelectedItem(copySelected);
            Swal.fire("Closed!", "Something went wrong", "error");
          });
      }
    });
  };

  const deleteFolder = (item) => {
    Swal.fire({
      title: "Delete Resource",

      text: "Resource will be delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#eddcd2",
      confirmButtonText: "Delete",
      customClass: {
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        removeDocument(item);
        deleteResource(item.id)
          .then((res) => {
            Swal.fire("Closed!", "Resources deleted", "success");
            reload();

            if (openDocument) {
              setOpenDocument(false);
            }
          })

          .catch(() => {
            Swal.fire("Closed!", "Something went wrong", "error");
          });
      }
    });
  };

  return (
    <div className={style.uploadedDoc_list}>
      {items && items.length ? (
        items.map((item) => (
          <DocumentItem
            handleClick={() => toggleFolderModal(true, item)}
            imageUrl={item.section_banner}
            key={shortid.generate()}
            title={item.section_title}
            date={moment(item.created_at).format("YYYY")}
            showSetting={showSetting}
            deleteFolder={() => deleteFolder(item)}
            showDelete={showDelete}
          />
        ))
      ) : (
        <div>No document Found</div>
      )}

      <LeftDrawerModal
        drawerWidth={"65%"}
        visible={openDocument}
        tagName={selectedItemTitle}
        destroyOnClose={true}
        deleteResource={true}
        modalHeight={"100vh"}
        top
        headerTitle={`See ${selectedItemTitle} Document`}
        closeModal={() => setOpenDocument(false)}
        closeIcon={CloseIcon}
        deleteAllHandler={() => deleteFolder(selectedDoc)}
      >
        <div className={style.uploadedDoc_list}>
          {selectedItem && selectedItem.length > 0
            ? selectedItem.map((item) => (
                <div
                  key={item.id}
                  style={{
                    marginRight: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <span className={style.removeIconBox}>
                    <RiCloseCircleFill
                      size={20}
                      className={style.removeIcon}
                      onClick={() => deleteResourceHandler(item)}
                    />
                  </span>
                  <div
                    className={style.uploadedDoc_list_item}
                    style={{ width: "100%", marginRight: "10px" }}
                  >
                    <div className={style.uploadImg_name}>
                      <img
                        src={imageType(item.url)}
                        className={style.uploadImg}
                      />
                      <span className={style.uploadFile}>{item.title}</span>
                    </div>
                    <div
                      className={style.uploadFooter}
                      onClick={() => download(item.banner, item.title)}
                    >
                      <span>
                        <HiDownload color="#EF3125" size={19} />
                      </span>
                    </div>
                  </div>
                  {showSetting && (
                    <div className={style.switchContainer}>
                      <span>
                        <Switch
                          size="larger"
                          defaultChecked={item.visible}
                          onChange={(status) => setVisibilty(status, item.id)}
                        />
                      </span>
                      <div>
                        <h4 className={style.switchTitle}>
                          Make document visible during event
                          {/* Play Video at the beginning of the event. */}
                        </h4>
                      </div>
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>
      </LeftDrawerModal>
      {showNext && (
        <div className={style.form__input_wrap} style={{ marginTop: "7rem" }}>
          <button
            onClick={nextStep}
            type="button"
            className={style.form__input_submit_request}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

const CloseIcon = () => (
  <span
    className={style.closeModal}
    style={{
      position: "absolute",
      top: "50%",
      left: "-1680%",
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

export default DocumentList;
