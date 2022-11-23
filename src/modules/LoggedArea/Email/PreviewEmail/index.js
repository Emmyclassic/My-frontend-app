import React, { useState } from "react";
// import { Helmet } from "react-helmet";
// import DOMPurify from "dompurify";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { FiSend } from "react-icons/fi";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Arrow from "../../../../components/Dashboard/Arrow";
import { IoIosLaptop } from "react-icons/io";
import { ImMobile } from "react-icons/im";
import { MdEdit } from "react-icons/md";

import style from "./index.module.scss";

function PreviewEmail() {
  const history = useHistory();
  // const dispatch = useDispatch();
  const emailCampaign = useSelector((state) => state.emailCampaign);
  const [mobilePreview, setMobilePreview] = useState("laptop");
  const [testEmailModal, setTestEmailModal] = useState(false);
  const [sampleEmailAdd, setSampleEmailAdd] = useState("");
  const location = useLocation();
  console.log({
    emailCampaign,
    msg: "Inside Preview Page yyyyy",
    content: location.state?.campaignContent,
  });
  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <Arrow />
          <DashboardLeftHeaderNav
            title="Preview Email"
            subtitle="Preview your email draft"
          />
        </>
      }
    >
      <div className={style.main}>
        <div className={style.inner_tab}>
          <div className={style.inner_tab_con}>
            <div
              className={style.inner_tab_con_box}
              style={
                mobilePreview === "laptop" ? { backgroundColor: "#fff" } : {}
              }
              onClick={() => setMobilePreview("laptop")}
            >
              <IoIosLaptop
                size={28}
                color={mobilePreview === "laptop" ? "#EF3125" : "#000000"}
              />
            </div>
            <div
              className={style.inner_tab_con_box}
              style={
                mobilePreview === "mobile" ? { backgroundColor: "#fff" } : {}
              }
              onClick={() => setMobilePreview("mobile")}
            >
              <ImMobile
                size={20}
                color={mobilePreview === "mobile" ? "#EF3125" : "#000000"}
              />
            </div>
          </div>
        </div>
        {mobilePreview === "laptop" && (
          <div
            className={style.left_container}
            dangerouslySetInnerHTML={{
              __html: location.state?.campaignContent,
            }}
          ></div>
        )}
        {mobilePreview === "mobile" && (
          <div className={style.left_container_mobile}>
            <div className={style.title_block_mobile}>
              <p>
                {`We're Creating Something `}
                <span>Very Cool!</span>
              </p>
            </div>
            <div className={style.desc_block_mobile}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className={style.image_container}>
              <div className={style.image_container_icon}></div>
              <p>
                Drag your image here, or
                <span>browse</span>
              </p>
            </div>
            <div className={style.desc_block_mobile}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <hr />
            <div className={`${style.desc_block_mobile} ${style.padding_2}`}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        )}
        <div className={style.main_footer}>
          <div
            className={style.main_footer_edit}
            onClick={() => history.push("/Email/edit")}
          >
            <MdEdit size="14" />
            <span>Edit Email</span>
          </div>
          <div className={style.footer_btn_group}>
            <button
              className={style.send_test_email}
              onClick={() => setTestEmailModal(true)}
            >
              Send Test Email
            </button>
            <button className={style.next_btn}>Launch Email</button>
          </div>
        </div>
      </div>
      <Modal
        title={
          <div className={style.addProxyHeader}>
            <div className={style.proxyIconBox}>
              <span className={style.questionBox}>
                <FiSend color="#fff" />
              </span>
            </div>
            <div className={style.addTitle}>SEND TEST EMAIL</div>
            <div className={style.addDesc}>
              View how your email would be when sent.
            </div>
          </div>
        }
        centered
        footer={null}
        onCancel={() => setTestEmailModal(false)}
        visible={testEmailModal}
        closable={true}
        bodyStyle={{ backgroundColor: "#9999992b", minHeight: "30rem" }}
      >
        <div className={style.formContainer}>
          {/* <form onSubmit={handleSubmit(onSubmitSendSMS)}> */}
          <form>
            <p>Email</p>
            <input
              style={{
                height: "4rem",
                width: "100%",
                borderRadius: "3px",
                marginBottom: "8rem",
              }}
              placeholder="JonathanJane@gmail.com"
              value={sampleEmailAdd}
              onChange={(e) => setSampleEmailAdd(e.target.value)}
            />
            <div className={style.form__input_wrap}>
              <button
                type="submit"
                className={style.form__input_submit_request}
                // onClick={() => {
                //   if (!smsMessage) {
                //     Swal.fire("oops!", "Text cannot be empty", "error");
                //     return;
                //   }
                //   setSendSMSVisible(false);
                //   setSmsPreviewVisible(true);
                // }}
              >
                <span>Send Email</span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </PrivateGenericLayout>
  );
}

export default PreviewEmail;
