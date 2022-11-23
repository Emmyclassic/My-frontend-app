import React, { useState } from "react";
import { Spin } from "antd";
import Swal from "sweetalert2";
import style from "../SocialProfile/index.module.scss";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from "../../../../api/settingsHandler";

function Password() {
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState("password");
  const [showPwd, setShowPwd] = useState("false");
  const [showOP, setShowOP] = useState("false");
  const [showCP, setShowCP] = useState("false");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const toggleResetPassword = () => {
    setToggle("resetPassword");
  };

  const handleUpdatePassword = async () => {
    if (!checked) {
      Swal.fire("Oops!", "Kindly terminate all other active sessions", "error");
      return;
    } else if (oldPassword.length === 0) {
      Swal.fire("Oops!", "Enter Current Password", "error");
      return;
    } else if (newPassword.length === 0) {
      Swal.fire("Oops!", "Password minimum 8 characters", "error");
      return;
    } else if (confirmPassword.length === 0) {
      Swal.fire("Oops!", "Enter Cofirm Password", "error");
      return;
    }
    const payload = {
      current_password: oldPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    };
    try {
      setLoading(true);
      await changePassword(payload);
      Swal.fire("Done!", "Password update successfully", "success");
      setLoading(false);
    } catch (error) {
      console.log(error);

      Swal.fire(
        "Oops!",
        `${
          error?.response?.data?.errors?.password[0] ||
          error?.response?.data?.message
        }`,
        "error"
      );
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.group}>
        <div className={style.group_left}>
          <h4>Password</h4>
          <p>Change and edit your password</p>
        </div>
        <div className={style.group_right}>
          <h4>Password</h4>
          {toggle === "password" ? (
            <>
              <div className={style.inline_block}>
                <input
                  readOnly
                  placeholder="******************"
                  name="password"
                  type="password"
                  className={style.input_form}
                />
                <AiFillEye color="#6D7683" size="18" className={style.icon} />
              </div>
              <h6 className={style.password_last_updated}>
                Updated 6 months ago
              </h6>
              <h6
                className={style.change_password}
                onClick={toggleResetPassword}
              >
                Change password
              </h6>
            </>
          ) : toggle === "resetPassword" ? (
            <>
              <p>Current password</p>
              <div className={style.inline_block}>
                <input
                  readOnly={loading}
                  placeholder="*****************"
                  name="password"
                  type={!showPwd ? "text" : "password"}
                  className={style.input_form}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <div onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? (
                    <AiFillEye
                      color="#6D7683"
                      size="18"
                      className={style.icon}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      color="#6D7683"
                      size="18"
                      className={style.icon}
                    />
                  )}
                </div>
              </div>
              <div className={style.flex}>
                <div>
                  <p>New Password</p>
                  <div className={style.inline_block}>
                    <input
                      readOnly={loading}
                      placeholder="*****************"
                      name="newPassword"
                      className={style.input_form}
                      type={!showOP ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div onClick={() => setShowOP(!showOP)}>
                      {showOP ? (
                        <AiFillEye
                          color="#6D7683"
                          size="18"
                          className={style.icon}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          color="#6D7683"
                          size="18"
                          className={style.icon}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <p>Confirm Password</p>
                  <div className={style.inline_block}>
                    <input
                      readOnly={loading}
                      placeholder="*****************"
                      name="confirmPassword"
                      className={style.input_form}
                      type={!showCP ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div onClick={() => setShowCP(!showCP)}>
                      {showCP ? (
                        <AiFillEye
                          color="#6D7683"
                          size="18"
                          className={style.icon}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          color="#6D7683"
                          size="18"
                          className={style.icon}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.attempt}>
                <div className={style.passwordCheckbox}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    name="terminate"
                  />
                  <label htmlFor="terminate">
                    Terminate all other active sessions
                  </label>
                </div>
              </div>
              <div className={style.group}>
                <div className={style.input_form_button}>
                  <button
                    onClick={handleUpdatePassword}
                    type="button"
                    disabled={loading}
                    className={style.form__input_submit_request}
                  >
                    {!loading ? (
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
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Password;
