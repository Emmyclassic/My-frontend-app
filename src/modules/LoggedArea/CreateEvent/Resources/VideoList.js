import { Switch } from "antd";
import React from "react";
import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  deleteResoluteItem,
  setVideoPlay,
  updateVisiblity,
} from "../../../../api/resourceHandler";
import VideoCard from "../../../../components/VideoCard";
import style from "./index.module.scss";

const VideoList = ({
  items,
  nextStep,
  showNext,
  showSetting = true,
  reload,
  removeVideo,
  showDelete = true,
}) => {
  // const [openDocument, setOpenDocument] = useState(false);

  // const [selectedItem, setSelectedItem] = useState();
  // const [selectedItemTitle, setSelectedItemTitle] = useState();
  // const [selectedDoc, setSelectedDoc] = useState();

  // const toggleFolderModal = (status, item) => {
  //   setOpenDocument(status);
  //   setSelectedItem(item?.resource_files);
  //   setSelectedItemTitle(item?.section_title);
  //   setSelectedDoc(item);
  // };
  const playVote = async (status, id) => {
    try {
      await setVideoPlay({ play_at_beginning: status ? 1 : 0 }, id);
    } catch (ex) {
      console.log(ex);
    }
  };
  const setVisibilty = (status, id) => {
    try {
      updateVisiblity({ visibility: status }, id);
    } catch (ex) {
      console.log(ex);
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
        // const newSelection = selectedItem.filter((m) => m.id !== item.id);
        // setSelectedItem(newSelection);
        deleteResoluteItem(item.id)
          .then((res) => {
            Swal.fire("Closed!", "Resources deleted", "success");
            reload();
          })

          .catch(() => {
            // const copySelected = [...selectedItem, item];
            // setSelectedItem(copySelected);
            Swal.fire("Closed!", "Something went wrong", "error");
          });
      }
    });
  };

  return (
    <div className={style.uploadedDoc_list}>
      {items && items.length ? (
        items.map((item) =>
          item.resource_files.map((item) => (
            <div key={item.id} className={style.uploadLink_item}>
              <h4>Video</h4>

              <VideoCard
                item={item}
                deleteResourceHandler={deleteResourceHandler}
                sectionBanner={item?.section_banner}
                showDelete={showDelete}
              />

              {showDelete && (
                <div className={style.header_video}>
                  <span className={style.header_tile}>{item.title}</span>
                  <span>
                    <BsTrash
                      size={20}
                      onClick={() => deleteResourceHandler(item)}
                    />
                  </span>
                </div>
              )}

              {showSetting && (
                <>
                  <div className={style.switchCosntainer}>
                    <span className={style.switchBox}>
                      <Switch
                        size="larger"
                        defaultChecked={item.play_at_beginning}
                        onChange={(status) => playVote(status, item.id)}
                      />
                    </span>
                    <div>
                      <h4 className={style.switchTitle}>
                        Play Video at the beginning of the event.
                      </h4>
                      <p className={style.switchDesc}>
                        This will play video before the attendees gets to the
                        event.
                      </p>
                    </div>
                  </div>

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
                        Make video available on the resource page.
                      </h4>
                      <p className={style.switchDesc}>
                        This will allow your video to be available under event
                        resources.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )
      ) : (
        <div>No Video found</div>
      )}

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

export default VideoList;
