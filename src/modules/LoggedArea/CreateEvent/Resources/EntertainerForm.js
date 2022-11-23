import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Spin, Upload } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../../../api/eventHandler";
import { createEntertainer } from "../../../../api/resourceHandler";
import AlertResponse from "../../../../Auth/AuthModalForm/AlertResponse";
import UploadButton from "../../../../components/UploadButton";
import { createEntertainerSchema } from "../../../../utils/Validation/resourceValidation";
import style from "./index.module.scss";

const { Dragger } = Upload;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const EntertainForm = ({ setTab, nextStep, reload }) => {
  const [loading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [responseData, setResponseData] = useState();
  const [fileError, setFileError] = useState({ errorMsg: "", error: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createEntertainerSchema),
  });

  const handleCancel = () => setPreviewVisible(false);

  const [logoFileList, setLogoFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const onSubmit = async (data) => {
    if (logoFileList.length === 0) {
      setFileError({
        error: true,
        errorMsg: "Event logo is required",
      });
      return;
    } else {
      setFileError({
        error: false,
        errorMsg: "",
      });
    }

    if (fileError.error === false) {
      setUploading(true);
      const httpRequests = [
        uploadFile({ file: logoFileList[0], file_name: "logoUrl" }),
      ];

      try {
        const [logoData] = await Promise.all(httpRequests);
        const {
          data: {
            data: { file_link: logoUploadedUrl },
          },
        } = logoData;

        if (logoUploadedUrl) {
          const obj = {
            photo: logoUploadedUrl,
            category: data.category,
            name: data.about,
            about: data.about,
          };

          const payload = {
            entertainers: [obj],
          };

          const res = await createEntertainer(payload);
          setUploading(false);
          setResponseData({
            data: res.data.data,
            status: "success",
            message: "Entertainer created successfully",
          });
          if (setTab) {
            setTab("documentList");
          }
          if (reload) {
            reload();
          }
        }
      } catch (err) {
        const error = err.response?.data ?? "Something went wrong";
        setResponseData({ data: error, status: "fail", message: error });
      } finally {
        setUploading(false);
      }
    }
  };

  const logoProps = {
    onRemove: (file) => {
      setLogoFileList((prev) => {
        const index = prev.indexOf(file);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },

    onPreview: handlePreview,
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      if (!isJpgOrPng) {
        setFileError({
          error: true,
          errorMsg: "You can only upload JPG/PNG file!",
        });
      }
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        setFileError({ error: true, errorMsg: "Image must smaller than 2MB!" });
      }

      if (isLt2M && isJpgOrPng) {
        setLogoFileList((prev) => [...prev, file]);
      } else {
        setLogoFileList([]);
      }

      return false;
    },
    logoFileList,
  };

  const onClose = (e) => setResponseData();

  return (
    <div className={style.documentType}>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="firstName" className={style.form__input_label}>
              Select Entertainer Category
              <span style={{ color: "#ef3125" }}>(required)</span>
            </label>
            <select
              className={style.form__input}
              name="category"
              {...register("category")}
            >
              <option value="">Select category</option>
              <option value="Musician">Musician</option>
              <option value="Actor">Actor</option>
              <option value="Speaker">Speaker</option>
              <option value="Comedian">Comedian</option>
              <option value="Artist">Artist</option>
            </select>
            <span className={style.validation__error}>
              {errors.category?.message}
            </span>
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="bannerImage" className={style.form__input_label}>
              Upload Entertainer(s)
            </label>
            <span className={style.validation__error}>
              {fileError.errorMsg}
            </span>
            <Dragger
              {...logoProps}
              style={{ width: "100%" }}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              accept="image/*"
              maxCount={1}
            >
              <UploadButton loading={loading} />
            </Dragger>
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="firstName" className={style.form__input_label}>
              About this Entertainer(s)
            </label>
            <textarea
              className={`${style.form__input} ${style.form__input_textarea}`}
              type="text"
              placeholder="About"
              name="about"
              {...register("about")}
            />
            <span className={style.validation__error}>
              {errors.about?.message}
            </span>
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <button type="submit" className={style.form__input_view}>
            {loading || uploading ? (
              <Spin size="large" color="#fff" />
            ) : (
              "Add Entertainer(s)"
            )}
          </button>
          {setTab && (
            <button
              type="button"
              onClick={() => setTab("documentList")}
              className={`${style.form__input_view} ${style.form__input_view_1}`}
            >
              Cancel
            </button>
          )}
        </div>
        {/* <div className={style.form__input_wrap}>
          <button
            type="submit"
            className={`${style.main_container_btnContainer_btn} ${style.main_container_btnContainer_res}`}
          >
            {loading || uploading ? (
              <Spin size="large" color="#fff" />
            ) : (
              <>
                <span className={style.main_container_btnContainer_btn_icon}>
                  <FiPlus size={18} color="#09974d" />
                </span>
                <span className={style.main_container_btnContainer_btn_title}>
                  Add Entertainer(s)
                </span>
              </>
            )}
          </button>

        </div> */}
        {responseData && (
          <AlertResponse
            status={responseData.status}
            data={responseData.data}
            onClose={onClose}
            message={responseData.message}
          />
        )}
      </form>
      {/* <div className={style.form__input_wrap}>
        <button
          onClick={nextStep}
          type="button"
          className={style.form__input_submit_request}
        >
          {"Skip & Continue >>>"}
        </button>
      </div> */}
    </div>
  );
};

export default EntertainForm;
