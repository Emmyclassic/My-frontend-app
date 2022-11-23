import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Spin, Upload } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiTrash } from "react-icons/fi";
import { uploadFile } from "../../../../api/eventHandler";
import { createResource } from "../../../../api/resourceHandler";

import AlertResponse from "../../../../Auth/AuthModalForm/AlertResponse";
import UploadButton from "../../../../components/UploadButton";
import { createDocumentSchema } from "../../../../utils/Validation/resourceValidation";
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

const DocumentForm = ({ setTab, reload, nextStep, id }) => {
  const [fileError, setFileError] = useState({ errorMsg: "", error: false });
  const [loading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [logoFileList, setLogoFileList] = useState([]);
  const [linkLoader, setLinkLoader] = useState(false);
  const [responseData, setResponseData] = useState();
  // const [bannerFileList] = useState([]);
  const [resourceInputCount, setResourceInputCount] = useState([
    { title: "", url: "", banner: "" },
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createDocumentSchema),
  });

  const onClose = (e) => setResponseData();

  const handleCancel = () => setPreviewVisible(false);

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
  const addResources = (resource) => {
    const existUser = resourceInputCount.find(
      (item) => item.title.toLowerCase() === resource.title.toLowerCase()
    );

    if (!existUser) {
      setResourceInputCount([...resourceInputCount, resource]);
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
      const isLt50M = (Math.round(+file.size / 1024) / 1000).toFixed(2);

      if (isLt50M > 50) {
        setFileError({ error: true, errorMsg: "File must smaller than 50MB!" });
      }

      if (isLt50M) {
        setLogoFileList((prev) => [...prev, file]);
      } else {
        setLogoFileList([]);
      }

      return false;
    },
    logoFileList,
  };
  const onSubmit = async (data) => {
    if (fileError.error === false) {
      setUploading(true);
      const httpRequests = [
        //     uploadFile({ file: bannerFileList[0], file_name: "bannerUrl" }),
      ];

      logoFileList.forEach((item, idx) => {
        httpRequests.push(
          uploadFile({
            file: item,
            file_name: resourceInputCount[idx].title,
          })
        );
      });

      try {
        const response = await Promise.all(httpRequests);

        const copyResponse = [...response];
        // const bannerResponse = copyResponse.shift();
        const copyResponseData = copyResponse.map((item) => {
          const {
            data: {
              data: { file_link: bannerUrl },
            },
          } = item;

          return {
            bannerUrl,
          };
        });

        // const {
        //   data: {
        //     data: { file_link: bannerUrl },
        //   },
        // } = bannerResponse;

        const mapLinksResponse = resourceInputCount.map((item, idx) => {
          return {
            ...item,
            banner: copyResponseData[idx].bannerUrl,
            url: item.url || copyResponseData[idx].bannerUrl,
          };
        });

        const payload = {
          section_title: data.sectionTitle,
          type: "Document",
          section_banner:
            "https://res.cloudinary.com/solomonfrank/image/upload/v1655940336/apems/closeFolder_emox8q.svg",
          resource_files: mapLinksResponse,
        };

        setLinkLoader(true);
        const res = await createResource(payload, id);
        setResponseData({
          data: res.data.data,
          status: "success",
          message: "Document created successfully",
        });
        reload();
        setLinkLoader(false);
        if (setTab) {
          setTab("documentList");
        }
      } catch (err) {
        console.log("errrrr", err);
        const error = err.response?.data ?? "Something went wrong";
        setResponseData({ data: error, status: "fail", message: error });
      } finally {
        setUploading(false);
        setLinkLoader(false);
      }
    }
  };

  // const bannerProps = {
  //   onRemove: (file) => {
  //     setLogoFileList((prev) => {
  //       const index = prev.indexOf(file);
  //       const newFileList = prev.slice();
  //       newFileList.splice(index, 1);
  //       return newFileList;
  //     });
  //   },

  //   onPreview: handlePreview,
  //   beforeUpload: (file) => {
  //     const isJpgOrPng =
  //       file.type === "image/jpeg" || file.type === "image/png";

  //     if (!isJpgOrPng) {
  //       setFileError({
  //         error: true,
  //         errorMsg: "You can only upload JPG/PNG file!",
  //       });
  //     }
  //     const isLt2M = file.size / 1024 / 1024 < 2;

  //     if (!isLt2M) {
  //       setFileError({ error: true, errorMsg: "Image must smaller than 2MB!" });
  //     }

  //     if (isLt2M && isJpgOrPng) {
  //       setBannerFileList((prev) => [...prev, file]);
  //     } else {
  //       setBannerFileList([]);
  //     }

  //     return false;
  //   },
  //   bannerFileList,
  // };

  const onChangeText = (e, idx) => {
    const { value } = e.target;

    const obj = [...resourceInputCount];

    obj[idx].title = value;
    setResourceInputCount(obj);
  };

  const removeInput = (item, idx) => {
    const arr = [...resourceInputCount];
    arr.splice(idx, 1);

    const logoListArr = [...logoFileList];
    logoListArr.splice(idx, 1);
    setLogoFileList(logoListArr);

    if (arr.length === 0) {
      setResourceInputCount([{ name: "" }]);
    } else {
      setResourceInputCount(arr);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <div className={style.documentType}>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="firstName" className={style.form__input_label}>
              Section Title
              <span
                style={{
                  color: errors && errors.sectionTitle ? "#ef3125" : "#8d8d8d",
                }}
              >
                &nbsp;*
              </span>
            </label>
            <input
              className={style.form__input}
              type="text"
              placeholder="Enter title"
              name="title"
              {...register("sectionTitle")}
            />
            <span className={style.validation__error}>
              {errors.sectionTitle?.message}
            </span>
          </div>
        </div>
        {/* <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="bannerImage" className={style.form__input_label}>
              Upload Section Banner
            </label>
            <span className={style.validation__error}>
              {fileError.errorMsg}
            </span>
            <Dragger
              {...bannerProps}
              style={{ width: "100%" }}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              accept="image/*"
            >
              <UploadButton loading={loading} text="" />
            </Dragger>
          </div>
        </div> */}
        <div>
          {resourceInputCount.length > 0 &&
            resourceInputCount.map((item, idx) => (
              <ResourceUpload
                key={idx}
                addCandidates={addResources}
                item={item}
                loading={loading}
                resourceInputCount={resourceInputCount}
                removeInput={() => removeInput(item, idx)}
                logoProps={logoProps}
                onChangeText={(e) => onChangeText(e, idx)}
              />
            ))}
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: "2rem",
            gap: "5rem",
          }}
        >
          <div
            onClick={() =>
              setResourceInputCount([
                ...resourceInputCount,
                { title: "", url: "", banner: "" },
              ])
            }
            style={{
              fontFamily: "ttnorms",
              fontSize: "1.4rem",
              fontWeight: "500",
              color: "#ef3125",
              display: "flex",
            }}
          >
            <span className={style.main_container_btnContainer_btn_icon}>
              <FiPlus size={14} color="#09974d" />
            </span>
            <span className={style.addNewDoc}> Add New Document</span>
          </div>
        </div>
      </div>
      <div className={style.form__input_wrap}>
        <button type="submit" className={style.form__input_view}>
          {linkLoader || uploading ? (
            <Spin size="large" color="#fff" />
          ) : (
            "Save Documents"
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

      {responseData && (
        <AlertResponse
          status={responseData.status}
          data={responseData.data}
          onClose={onClose}
          message={responseData.message}
        />
      )}
    </form>
  );
};

export const ResourceUpload = ({
  logoProps,
  loading,
  onChangeLink,
  onChangeText,
  removeInput,
  item,
  resourceInputCount,
  type = "Link",
}) => {
  return (
    <div style={{ position: "relative", display: "flex" }}>
      <div style={{ width: "100%" }}>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="firstName" className={style.form__input_label}>
              Document Title
              <span style={{ color: "#ef3125" }}>*</span>
            </label>
            <input
              className={style.form__input}
              type="text"
              placeholder="Enter title"
              name="title"
              onChange={onChangeText}
            />
          </div>
        </div>
        <div className={style.form__input_wrap}>
          <div className={style.form__input_box}>
            <label htmlFor="bannerImage" className={style.form__input_label}>
              Upload Document
            </label>
            <Dragger
              {...logoProps}
              style={{ width: "100%" }}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              maxCount={1}
              accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf,.csv"
            >
              <UploadButton
                loading={loading}
                title="Drag your document here,"
                subTitle="Supports: pdf, docs, xlsx, csv, ppt"
              />
            </Dragger>
          </div>
        </div>
      </div>

      {resourceInputCount.length > 1 && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "1rem",
            position: "absolute",
            right: "-5rem",
          }}
          className={style.input_box_trash}
          onClick={() => removeInput(item)}
        >
          <FiTrash size={20} />
        </span>
      )}
    </div>
  );
};
export default DocumentForm;
