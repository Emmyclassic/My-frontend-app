import { Tooltip } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  deleteResoluteItem,
  deleteResource,
} from "../../../../api/resourceHandler";
import LeftDrawerModal from "../../../../components/LeftDrawerModal";
import { truncate } from "../../../../utils/truncate";
import style from "./index.module.scss";

const AgmLink = ({
  items,
  nextStep,
  showNext = false,
  showSetting = true,
  reload,
  removeLink,
  showDelete = true,
}) => {
  const [openDocument, setOpenDocument] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedItemTitle, setSelectedItemTitle] = useState();
  const [selectedDoc, setSelectedDoc] = useState();

  const styleObj = (image) => {
    return {
      background: `
        url(${image})`,
      position: "relative",
      backgroundRrepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "120px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  const toggleFolderModal = (status, item) => {
    setOpenDocument(status);
    setSelectedItem(item?.resource_files);
    setSelectedItemTitle(item?.section_title);
    setSelectedDoc(item);
  };

  const deleteResourceHandler = (item) => {
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
        removeLink(item);
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
    <>
      <div className={style.uploadLink_wrap}>
        {items && items.length ? (
          items.map((item) => (
            <div key={item.id} className={style.uploadLink_item}>
              <h4>AGM link</h4>

              <div style={{ position: "relative" }}>
                {showDelete && (
                  <span className={style.removeIconBox}>
                    <RiCloseCircleFill
                      size={20}
                      className={style.removeIcon}
                      onClick={() => deleteFolder(item)}
                    />
                  </span>
                )}

                <div
                  onClick={() => toggleFolderModal(true, item)}
                  className={style.linkImg}
                  style={styleObj(item.section_banner)}
                ></div>
                <h4>{item.section_title}</h4>
              </div>
              {/* <div className={style.linkImg_desc}>
                Use the link below to project your event on YouTube, Facebook
                etc
              </div>
              <InviteLink
                buttonStyle={{ backgroundColor: "#09974D" }}
                placeholde={item.link}
              /> */}
            </div>
          ))
        ) : (
          <div>No Link found</div>
        )}
      </div>

      <LeftDrawerModal
        drawerWidth={"65%"}
        visible={openDocument}
        tagName={selectedItemTitle}
        modalHeight="100vh"
        top
        headerTitle={`See ${selectedItemTitle} Link`}
        closeModal={() => setOpenDocument(false)}
        closeIcon={CloseIcon}
        deleteResource={true}
        resourceTitle="Link"
        deleteAllHandler={() => deleteFolder(selectedDoc)}
      >
        <div className={style.uploaded}>
          {selectedItem && selectedItem.length > 0
            ? selectedItem.map((item) => (
                <>
                  <AGMCard
                    item={item}
                    key={item.id}
                    deleteResourceHandler={() => deleteResourceHandler(item)}
                  />
                </>
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
    </>
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

export const AGMCard = ({ item, deleteResourceHandler }) => {
  const styleObj = (image) => {
    return {
      background: `linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
        url(${image.banner})`,
      position: "relative",
      backgroundRrepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "120px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };
  return (
    <div key={item.id} className={style.linkCard}>
      <span className={style.removeIconBox}>
        <RiCloseCircleFill
          size={20}
          className={style.removeIcon}
          onClick={deleteResourceHandler}
        />
      </span>
      <div className={style.linkImg} style={styleObj(item)}></div>
      <div className={style.linkImg_desc}>
        {item?.title} {moment(item?.created_at).format("YYYY")}
      </div>
      <div className={style.linkCard_lk}>
        <Tooltip title={item?.url}>
          <span> {truncate(item?.url ?? "", 30, "...")}</span>
        </Tooltip>
      </div>
    </div>
  );
};
export default AgmLink;
