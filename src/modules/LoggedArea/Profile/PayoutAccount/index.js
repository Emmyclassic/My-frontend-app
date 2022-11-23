import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import { Spin } from "antd";
import { AiFillCheckCircle } from "react-icons/ai";
import style from "../SocialProfile/index.module.scss";
import Select from "react-select";
import { getBanksAction, getBankAccountAction } from "../state/action";
import {
  verifyBankAccount,
  fetchOTP,
  verifyOTP,
  deleteBankAccount,
  verifyPassword,
} from "../../../../api/settingsHandler";

const customStyles = {
  control: (base) => ({
    ...base,
    height: 46,
    minHeight: 35,
  }),
};

const truncate = (input) => {
  return "******" + input.toString().substring(7, input.length);
};
const truncatePhone = (input) => {
  if (!input) {
    Swal.fire("Oops!", "Fill phone number in Profile page", "error");
    return;
  }
  return "******" + input.toString().substring(7, input.length);
};

function PayoutAccount() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { bankList } = useSelector((state) => state.banks);
  const { bankAccount, userBankName, userBvn } = useSelector(
    (state) => state.bankDetails
  );
  const { phone_number } = useSelector((state) => state.profile);
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState({});
  const [bvn, setBvn] = useState("");
  const [password, setPassword] = useState("");
  const [submitUpdate, setSubmitUpdate] = useState(false);
  const [loadOTP, setLoadOTP] = useState(false);
  const [loadPassword, setLoadPassword] = useState(false);
  const [OTP, setOTP] = useState("");
  const [resendOTP, setResendOTP] = useState(false);
  const [OTPsent, setOTPsent] = useState(false);
  const [oPTtimer, setOTPtimer] = useState(false);
  const [, setVerifyingOTP] = useState(false);
  const [accountStep, setAccountStep] = useState(1);
  const [verifiedPassword, setVerifiedPassword] = useState(false);
  const [showSubmitPwd, setShowSubmitPwd] = useState(true);
  const [showSubmitOTP, setShowSubmitOTP] = useState(false);
  const [showSubmitUpdate, setShowSubmitUpdate] = useState(false);
  // console.log(setShowSubmitOTP, setShowSubmitUpdate);
  const handleProvince = (input) => {
    setBankName(input);
  };

  const handleVerifyAccount = async () => {
    const { id } = bankName;
    const payload = {
      account_number: accountNumber,
      bank_id: `${id}`,
      bvn: bvn,
    };
    if (!accountNumber || !id || !bvn) {
      Swal.fire("Oops!", "Fill required fields", "error");
      return;
    }
    try {
      setLoading(true);
      await verifyBankAccount(payload);
      dispatch(getBankAccountAction());
      localStorage.setItem("pAccount", "set");
      Swal.fire("Success!", "Account number successfully updated", "success");
      setSubmitUpdate(true);
      setLoading(false);
    } catch (error) {
      Swal.fire(
        "Oops!",
        `${error.response?.data?.message ?? "Something went wrong"}`,
        "error"
      );
      setLoading(false);
    }
  };

  const handleVerifyPassword = async () => {
    try {
      setLoadPassword(true);
      const res = await verifyPassword({ password });
      console.log({ res });
      setShowSubmitPwd(false);
      setVerifiedPassword(true);
      setShowSubmitOTP(true);
      setLoadPassword(false);
    } catch (error) {
      console.log({ error });
      Swal.fire("Oops!", "Password incorrect", "error");
      setLoadPassword(false);
    }
  };

  const handleFetchOTP = async () => {
    try {
      setLoadOTP(true);
      const res = await fetchOTP();
      console.log({ res });
      setOTPsent(true);
      setLoadOTP(false);
      setResendOTP(true);
    } catch (error) {
      console.log({ error });
      setLoadOTP(false);
      setResendOTP(false);
    }
  };

  const handleVerifyOTP = async (value) => {
    const numbers = /^[0-9]+$/;
    if (value.match(numbers)) {
      setOTP(value);
      try {
        if (value.length === 5) {
          const payload = {
            otp: value,
          };
          setVerifyingOTP(true);
          const res = await verifyOTP(payload);
          console.log({ res });
          Swal.fire("Done!", "OTP verified", "success");
          setShowSubmitPwd(false);
          setShowSubmitOTP(false);
          setShowSubmitUpdate(true);
          setVerifyingOTP(false);
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Oops!", "OTP incorrect or expired", "error");
        setVerifyingOTP(false);
      }
    }
    if (value === "") {
      setOTP("");
    }
  };

  const handleRemoveAccount = async () => {
    if (OTP.length < 5) {
      Swal.fire("Ooops!", "Enter OTP", "error");
      return;
    }
    const payload = {
      password: password,
      otp: OTP,
    };
    try {
      setLoading(true);
      await deleteBankAccount(payload);
      localStorage.setItem("pAccount", "");
      Swal.fire("Success!", "Account number successfully deleted", "success");
      dispatch(getBankAccountAction());
      setPassword("");
      setOTP("");
      setAccountNumber("");
      setBvn("");
      setAccountStep(1);
      setShowSubmitPwd(true);
      setShowSubmitOTP(false);
      setVerifiedPassword(false);
      setShowSubmitUpdate(false);
      setResendOTP(false);
      setOTPsent(false);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      Swal.fire("Oops!", "Enter Valid OTP", "error");
      setLoading(false);
    }
  };

  // Renderer callback with condition
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setResendOTP(false);
      setOTPtimer(true);
      return <span>finished</span>;
    } else {
      // Render a countdown
      return <span>{seconds} seconds</span>;
    }
  };

  useEffect(() => {
    dispatch(getBanksAction());
    dispatch(getBankAccountAction());
  }, []);
  useEffect(() => {
    setAccountNumber(bankAccount);
  }, [bankAccount]);
  useEffect(() => {
    if (submitUpdate) {
      setSubmitUpdate(false);
    }
  }, [submitUpdate]);

  return (
    <div className={style.container}>
      {!bankAccount && (
        <>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Account Number</h4>
              <p>We pay out your ticket revenue into the account specified</p>
            </div>
            <div className={style.group_right}>
              <input
                placeholder={`e.g "1000012345"`}
                name="accountNumber"
                type="number"
                className={style.input_form}
                maxLength="10"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Bank Name</h4>
              <p>We pay out your ticket revenue into the account specified</p>
            </div>
            <div className={style.group_right}>
              <Select
                styles={customStyles}
                onChange={handleProvince}
                options={bankList?.status === "success" ? bankList.data : []}
                placeholder="Please select bank name"
              />
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Bank Verification Number</h4>
              <p>We use this to verify your account</p>
            </div>
            <div className={style.group_right}>
              <input
                placeholder="Enter Bank Verification Number"
                name="bvn"
                type="number"
                className={style.input_form}
                maxLength="10"
                value={bvn}
                onChange={(e) => setBvn(e.target.value)}
              />
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}></div>
            <div className={style.group_right}>
              <div className={style.input_form_button}>
                <button
                  onClick={handleVerifyAccount}
                  type="button"
                  disabled={loading}
                  className={style.form__input_submit_request}
                >
                  {!loading ? (
                    <>Verify Account Number</>
                  ) : (
                    <>
                      <Spin size="large" color="#fff" />
                      Verifying...
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {accountStep === 1 && bankAccount && (
        <>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Account Number</h4>
            </div>
            <div className={style.group_right}>
              <input
                readOnly
                name="accountNumber"
                type="text"
                className={style.input_form}
                value={accountNumber}
              />
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Bank Name</h4>
            </div>
            <div className={style.group_right}>
              <input
                readOnly
                name="accountNumber"
                type="text"
                className={style.input_form}
                value={userBankName}
              />
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Bank Verification Number</h4>
            </div>
            <div className={style.group_right}>
              <input
                readOnly
                name="bvn"
                type="text"
                className={style.input_form}
                value={truncate(userBvn)}
              />
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}></div>
            <div className={style.group_right}>
              <div className={style.input_form_button}>
                <button
                  onClick={() => {
                    setAccountStep(2);
                    // console.log("clicked....");
                  }}
                  type="button"
                  disabled={loading}
                  className={style.form__input_submit_request}
                  style={{
                    backgroundColor: "red",
                    border: "none",
                  }}
                >
                  Change Account
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {accountStep === 2 && bankAccount && (
        <>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Payout Account Verified</h4>
              <p>We pay out your ticket revenue into the account specified</p>
            </div>
            <div className={style.group_right}>
              <div className={style.editable_group} style={{ width: "100%" }}>
                <input
                  readOnly
                  placeholder={`${userBankName} - ${accountNumber}`}
                  name="accountNumber"
                  type="number"
                  className={style.input_form_filled}
                  maxLength="10"
                  value={userBankName}
                />
                <AiFillCheckCircle
                  color="#09974D"
                  size="20"
                  className={style.input_card_iconLine}
                />
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Provide Account Password</h4>
              <p>
                {`You'll need to enter account information to request payout for every ticket you create. Enter Password to confirm delete`}
              </p>
            </div>
            <div className={style.group_right}>
              <input
                placeholder="Password"
                name="password"
                type="password"
                className={style.input_form}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {showSubmitPwd && (
            <div className={style.group}>
              <div className={style.group_left}></div>
              <div className={style.group_right}>
                <div
                  className={style.input_form_button}
                  style={{
                    marginTop: "-2rem",
                  }}
                >
                  <button
                    onClick={handleVerifyPassword}
                    type="button"
                    disabled={loadPassword || verifiedPassword}
                    className={style.form__input_submit_request}
                  >
                    {!loadPassword ? (
                      <>Submit Password</>
                    ) : (
                      <>
                        <Spin size="large" color="#fff" />
                        Submiting...
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          {verifiedPassword && (
            <>
              <div className={style.group}>
                <div className={style.group_left}>
                  <h4>OTP</h4>
                  <p>
                    {`An OTP has been sent to ${truncatePhone(phone_number)},
                      Please enter the 6-digit code.`}
                  </p>
                </div>
                <div className={style.group_right}>
                  <input
                    placeholder={`Enter OTP`}
                    name="accountNumber"
                    type="text"
                    className={style.input_form}
                    maxLength="6"
                    value={OTP}
                    onChange={(e) => {
                      if (e.target.value.length > 5) {
                        return;
                      }
                      handleVerifyOTP(e.target.value);
                    }}
                  />
                </div>
              </div>
              {showSubmitOTP && (
                <div className={style.group}>
                  <div className={style.group_left}></div>
                  <div className={style.group_right}>
                    <div
                      style={{
                        marginTop: "-2rem",
                        marginBottom: "-2rem",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "-2rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {resendOTP && (
                          <span
                            style={{
                              marginRight: "2rem",
                              fontSize: "0.85rem",
                              color: "#08974D",
                            }}
                          >
                            <Countdown
                              date={Date.now() + 59000}
                              renderer={renderer}
                            />
                          </span>
                        )}
                      </div>
                      <div className={style.input_form_button}>
                        <button
                          onClick={handleFetchOTP}
                          type="button"
                          disabled={loadOTP || resendOTP}
                          className={style.form__input_submit_request}
                        >
                          {!loadOTP && !OTPsent && <>Send OTP</>}
                          {loadOTP && (
                            <>
                              <Spin size="large" color="#fff" />
                              Sending...
                            </>
                          )}
                          {(resendOTP || oPTtimer) && <>Resend OTP</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {showSubmitUpdate && (
            <div className={style.group}>
              <div className={style.group_left}></div>
              <div className={style.group_right}>
                <div className={style.input_form_button}>
                  <button
                    onClick={handleRemoveAccount}
                    type="button"
                    disabled={loading || !verifiedPassword}
                    className={style.form__input_submit_request}
                    style={{
                      marginTop: "-2rem",
                    }}
                  >
                    {!loading ? (
                      <>Change Payout Account</>
                    ) : (
                      <>
                        <Spin size="large" color="#fff" />
                        Removing...
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PayoutAccount;
