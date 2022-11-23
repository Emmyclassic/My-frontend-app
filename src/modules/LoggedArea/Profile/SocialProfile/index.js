import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Switch } from "antd";
import Swal from "sweetalert2";
import style from "./index.module.scss";
import { AiOutlineTwitter, AiFillFacebook } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { updateSocialHandles } from "../../../../api/settingsHandler";
import { getSocialHandleAction } from "../state/action";

function SocialProfile() {
  const dispatch = useDispatch();
  const {
    twitter_url: userTwitter,
    facebook_url: userFacebook,
    linkedin_url: userLinkedin,
  } = useSelector((state) => state.social);
  const [isLoadoading, setLoading] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [linkedin, setLinkedIn] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState(userTwitter);
  const [facebookHandle, setFacebookHandle] = useState(userFacebook);
  const [linkedinHandle, setLinkedinHandle] = useState(userLinkedin);

  const handleTwitter = (checked) => {
    setTwitter(checked);
    console.log(`switch to ${checked}`);
  };
  const handleFacebook = (checked) => {
    setFacebook(checked);
    console.log(`switch to ${checked}`);
  };
  const handleLinked = (checked) => {
    setLinkedIn(checked);
    console.log(`switch to ${checked}`);
  };

  useEffect(() => {
    dispatch(getSocialHandleAction());
  }, []);
  useEffect(() => {
    if (userTwitter || userFacebook || userLinkedin) {
      setTwitterHandle(userTwitter);
      setFacebookHandle(userFacebook);
      setLinkedinHandle(userLinkedin);
    }
  }, [userTwitter, userFacebook, userLinkedin]);
  const handleUpdateSocials = async () => {
    const payload = {
      facebook_url: facebookHandle,
      twitter_url: twitterHandle,
      linkedin_url: linkedinHandle,
    };
    try {
      setLoading(true);
      await updateSocialHandles(payload);
      Swal.fire("Done!", "Socials updated successfully", "success");
      dispatch(getSocialHandleAction());
      setLoading(false);
    } catch (error) {
      Swal.fire("Oops!", `${error.response.data.errors.password[0]}`, "error");
      setLoading(false);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.group}>
        <div className={style.group_left}>
          <h4>Twitter</h4>
          <p>Your followers on twitter will be notified of your event</p>
        </div>
        <div className={style.group_right}>
          <div className={style.inline_block}>
            <input
              placeholder="https://www.twitter.com/apems"
              name="Twitter"
              type="text"
              className={style.input_form}
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
            />
            <AiOutlineTwitter
              color="#6D7683"
              size="18"
              className={style.icon}
            />
          </div>
          <div className={style.margin_top}>
            <Switch onChange={handleTwitter} defaultChecked={twitter} />
          </div>
        </div>
      </div>
      <div className={style.group}>
        <div className={style.group_left}>
          <h4>Facebook</h4>
          <p>Your friends on facebook will be notified of your event</p>
        </div>
        <div className={style.group_right}>
          <div className={style.inline_block}>
            <input
              placeholder="https://www.facebook.com/apems"
              name="Facebook"
              type="text"
              className={style.input_form}
              value={facebookHandle}
              onChange={(e) => setFacebookHandle(e.target.value)}
            />
            <AiFillFacebook color="#6D7683" size="18" className={style.icon} />
          </div>
          <div className={style.margin_top}>
            <Switch onChange={handleFacebook} defaultChecked={facebook} />
          </div>
        </div>
      </div>
      <div className={style.group}>
        <div className={style.group_left}>
          <h4>LinkedIn</h4>
          <p>Your friends on LinkedIn will be notified of your event</p>
        </div>
        <div className={style.group_right}>
          <div className={style.inline_block}>
            <input
              placeholder="https://www.linkedin.com/in/apems"
              name="LinkedIn"
              type="text"
              className={style.input_form}
              value={linkedinHandle}
              onChange={(e) => setLinkedinHandle(e.target.value)}
            />
            <FaLinkedin color="#6D7683" size="18" className={style.icon} />
          </div>
          <div className={style.margin_top}>
            <Switch onChange={handleLinked} defaultChecked={linkedin} />
          </div>
        </div>
      </div>
      <div className={style.group}>
        <div className={style.group_left}></div>
        <div className={style.group_right}>
          <div className={style.input_form_button}>
            <button
              onClick={handleUpdateSocials}
              type="button"
              className={style.form__input_submit_request}
            >
              {!isLoadoading ? (
                <>Save Changes</>
              ) : (
                <>
                  <Spin size="large" color="#fff" />
                  Saving...
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialProfile;
