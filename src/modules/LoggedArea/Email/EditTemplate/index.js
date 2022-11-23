import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Spin, Upload } from "antd";
import "./index.scss";
import { useSelector } from "react-redux";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Arrow from "../../../../components/Dashboard/Arrow";
import EmailPrfereence from "../../../../components/Cards/EmailPreference";
import { MdEdit, MdDelete } from "react-icons/md";
import { addEmailContent } from "../../../../api/emailHandler";
import style from "./index.module.scss";
import Swal from "sweetalert2";
// import { addEmailContent } from "../../../../api/emailHandler";
// import { addCampaignContent } from "../state/action";
const { Dragger } = Upload;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function EmailTemplate() {
  const history = useHistory();
  const emailCampaign = useSelector((state) => state.emailCampaign);
  // const { loading } = useSelector((state) => state.ui);
  const [loading, setLoading] = useState(false);
  // console.log({ history, dispatch });
  console.log({ emailCampaign });
  const [companyLogo, setCompanyLogo] = useState([]);
  const [mailHeader, setMailHeader] = useState("");
  const [mailParagraph1, setMailParagraph1] = useState("");
  // const [contentImage, setContentImage] = useState([]);
  const [mailParagraph2, setMailParagraph2] = useState("");
  const [mailFooter, setMailFooter] = useState("");
  const [compAddress, setCompAddress] = useState("");
  const [fileBannerError, setFileBannerError] = useState({
    errorMsg: "",
    error: false,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);

  console.log({ fileBannerError, previewImage, previewVisible });

  const handleEmailPreview = async () => {
    const campaignId = "95765f10-eb45-4350-9b1e-6e566abd644c";
    console.log({
      mailHeader,
      mailParagraph1,
      mailParagraph2,
      mailFooter,
      compAddress,
    });
    const contentBody = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Apems</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body
        style="
          width: 76%;
          background-color: #fafafa;
          padding: 4% 10%;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <div
          style="
            background-color: rgb(180, 153, 153);
            width: 50rem;
            min-width: 100%;
          "
        >
          <div style="font-size: 44px; width: 60%; min-width: 100%">
            ${mailHeader}
          </div>
          <p
            style="
              color: #5c6574;
              letter-spacing: 0.48px;
              font-family: ttnorms;
              font-weight: 300;
              letter-spacing: 2px;
              font-size: 16px;
            "
          >
            ${mailParagraph1}
          </p>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 10rem;
              background-color: purple;
              color: #5c6574;
            "
          >
            Images
          </div>
          <p
            style="
              color: #5c6574;
              letter-spacing: 0.48px;
              font-family: ttnorms;
              font-weight: 300;
              letter-spacing: 2px;
              font-size: 16px;
            "
          >
            ${mailParagraph2}
          </p>
          <hr />
          <div
            style="
              /* margin-top: 2rem; */
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            "
          >
            <div style="width: 80%">
              <p
                style="
                  color: #5c6574;
                  letter-spacing: 0.48px;
                  font-family: ttnorms;
                  font-weight: 300;
                  letter-spacing: 2px;
                  font-size: 16px;
                "
              >
                ${mailFooter}
              </p>
            </div>
            <div>Icons, Icons, Icons, Icons</div>
            <div
              style="
                margin-top: 1rem;
                color: #bfbfbf;
                width: 25%;
                text-align: center;
              "
            >
              ${compAddress}
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
    try {
      setLoading(true);
      const payload = {
        email_content: contentBody,
      };
      const {
        data: { data },
      } = await addEmailContent(campaignId, payload);
      console.log("uwwbdwbdwb", data);
      // dispatch(addCampaignContent(campaignId, payload));
      history.push("/Email/preview", { campaignContent: data.content });
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      Swal.fire("oops!!", "Something went wrong", "error");
      setLoading(false);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    // setPreviewTitle(
    //   file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    // );
  };

  const props = {
    onRemove: (file) => {
      setCompanyLogo((prev) => {
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
        setFileBannerError({
          error: true,
          errorMsg: "You can only upload JPG/PNG file!",
        });
      }
      const isLt10M = (Math.round(+file.size / 1024) / 1000).toFixed(2);

      if (isLt10M > 10) {
        setFileBannerError({
          error: true,
          errorMsg: "Image must smaller than 10MB!",
        });
      }

      if (isLt10M && isJpgOrPng) {
        setCompanyLogo((prev) => [...prev, file]);
      } else {
        setCompanyLogo([]);
      }

      return false;
    },
    companyLogo,
  };

  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <Arrow />
          <DashboardLeftHeaderNav
            title="Edit Mail Template"
            subtitle="Lorem ipsum eiusmod tempor labore et dolore magna aliqua."
          />
        </>
      }
      // RightNav={
      //   <div
      //     className={style.save_continue_button}
      //     onClick={() => history.push("/Email/Send")}
      //   >
      //     Save & Continue
      //   </div>
      // }
    >
      <div className={style.main}>
        <div className={style.left_container}>
          <Dragger
            style={{ width: "10%", height: "5%" }}
            name="avatar"
            listType="picture-card"
            // className="avatar-uploader"
            {...props}
            accept="image/*"
            maxCount={1}
          >
            <div className={style.company_logo}>
              <div className={style.company_logo_icon}></div>
              <span>Company Logo Here</span>
            </div>
          </Dragger>
          <div className={style.text_editor_container}>
            <textarea
              className={style.text_editor}
              placeholder="Email Header"
              value={mailHeader}
              onChange={(e) => setMailHeader(e.target.value)}
            />
            <div className={style.text_editor_icon}>
              <MdEdit color="#ccc" />
            </div>
            <div
              className={style.text_editor_delete}
              onClick={() => setMailHeader("")}
            >
              <MdDelete color="#ccc" />
            </div>
          </div>
          {/* <div className={style.title_block}>
            <p>
              {`We're Creating Something `}
              <span>Very Cool!</span>
            </p>
          </div> */}
          <div className={style.desc_block}>
            <div className={style.text_editor_container}>
              <textarea
                className={style.text_editor_body}
                placeholder="New Paragraph"
                value={mailParagraph1}
                onChange={(e) => setMailParagraph1(e.target.value)}
              />
              <div className={style.text_editor_icon}>
                <MdEdit color="#ccc" />
              </div>
              <div
                className={style.text_editor_delete}
                onClick={() => setMailParagraph1("")}
              >
                <MdDelete color="#ccc" />
              </div>
            </div>
          </div>
          <Dragger
            style={{
              width: "100%",
              height: "6%",
              marginTop: "2rem",
              marginBottom: "8rem",
            }}
            name="avatar"
            listType="picture-card"
            // className="avatar-uploader"
            {...props}
            accept="image/*"
            maxCount={1}
          >
            <div className={style.image_container}>
              <div className={style.image_container_icon}></div>
              <p>
                Drag your image here, or
                <span>browse</span>
              </p>
            </div>
          </Dragger>
          <div className={style.desc_block}>
            <div className={style.text_editor_container}>
              <textarea
                style={{ minHeight: "10rem" }}
                className={style.text_editor_body}
                placeholder="New Paragraph"
                value={mailParagraph2}
                onChange={(e) => setMailParagraph2(e.target.value)}
              />
              <div className={style.text_editor_icon}>
                <MdEdit color="#ccc" />
              </div>
              <div
                className={style.text_editor_delete}
                onClick={() => setMailParagraph2("")}
              >
                <MdDelete color="#ccc" />
              </div>
            </div>
          </div>
          <div className={style.footer_container}>
            <div className={style.footer_wrapper}>
              <div className={style.text_editor_container}>
                <textarea
                  style={{ minHeight: "10rem" }}
                  className={style.text_editor_body}
                  placeholder="Email Content"
                  value={mailFooter}
                  onChange={(e) => setMailFooter(e.target.value)}
                />
                <div className={style.text_editor_icon}>
                  <MdEdit color="#ccc" />
                </div>
                <div className={style.text_editor_delete}>
                  <MdDelete color="#ccc" />
                </div>
              </div>
              <div>
                <p>Icons iscons isonc</p>
              </div>
              <div className={style.footer_address_container}>
                <div className={style.footer_wrapper}>
                  <div className={style.text_editor_container}>
                    <textarea
                      style={{ minHeight: "10rem" }}
                      className={style.text_editor_body}
                      placeholder={compAddress}
                      onChange={(e) => setCompAddress(e.target.value)}
                    />
                    <div className={style.text_editor_icon}>
                      <MdEdit color="#ccc" />
                    </div>
                    <div className={style.text_editor_delete}>
                      <MdDelete color="#ccc" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.right_group}>
          <div className={style.right_container}>
            <div className={style.right_container_wrapper}>
              <EmailPrfereence
                title="DESIGN ELEMENTS"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
              />
              <EmailPrfereence
                title="CONTENT ELEMENTS"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
              />
              <EmailPrfereence
                title="FOOTER ELEMENTS"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
              />
            </div>
          </div>
          <div className={style.preview_group}>
            <button onClick={handleEmailPreview}>
              {<span>{`Preview Email >`}</span>}
              {loading && <Spin />}
            </button>
          </div>
        </div>
      </div>
    </PrivateGenericLayout>
  );
}

export default EmailTemplate;
