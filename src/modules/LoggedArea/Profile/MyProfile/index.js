import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import style from "./index.module.scss";
import { Spin } from "antd";
import Swal from "sweetalert2";
import { MdModeEdit } from "react-icons/md";
import Select from "react-select";
import { ToggleSelect } from "../../../../components/Cards/SingleCardSelect";
import {
  getProfileAction,
  getStatesAction,
  // updateProfileAction,
} from "../state/action";
import { month, day, years } from "./contant";
import { updateProfile } from "../../../../api/settingsHandler";
import { uploadFile } from "../../../../api/eventHandler";
import { ErrorFallback } from "../../../../components/ErrorBoundaryComponentLevel";
const customStyles = {
  control: (base) => ({
    ...base,
    height: 46,
    minHeight: 35,
  }),
};

function MyProfile() {
  const dispatch = useDispatch();
  const {
    city,
    // country_id,
    date_of_birth,
    email,
    email_verified_at,
    gender,
    id,
    name,
    phone_number,
    postal_code,
    profile_picture_path,
    state_id,
    street_address,
    user_type,
    status,
  } = useSelector((state) => state.profile);
  const { stateList } = useSelector((state) => state.states);
  const { loading } = useSelector((state) => state.ui);
  const [, setUserProfile] = useState(null);
  const [userProfileUrl, setUserProfileUrl] = useState("");
  const [onUpload, setOnUpload] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAd, setEmailAd] = useState(email);
  const [phone, setPhone] = useState(phone_number);
  const [userGender, setUserGender] = useState("");
  const [dayDOB, setDayDOB] = useState("");
  const [monthDOB, setMonthDOB] = useState("");
  const [yearDOB, setYearDOB] = useState("");
  const [userStreet, setUserStreet] = useState(street_address);
  const [userCity, setUserCity] = useState("");
  const [postCode, setCitPostCode] = useState(postal_code);
  const [stateId, setStateId] = useState(state_id);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const handleToggleSelect = (label) => {
    setUserGender(label);
  };

  const handleProvince = ({ value }) => {
    setStateId(value);
  };

  const handleDOBMonth = ({ value }) => {
    setMonthDOB(value);
  };

  const handleDOBDay = ({ value }) => {
    setDayDOB(value);
  };

  const handleDOBYear = ({ value }) => {
    setYearDOB(value);
  };

  const loadingSkeleton = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          <div style={{ width: "100%", marginBottom: "2rem" }}>
            <Skeleton height={50} width={"100%"} />
          </div>
          <div style={{ width: "100%", marginTop: "1rem" }}>
            <Skeleton height={50} width={"100%"} />
          </div>
        </div>
      );
    }
  };

  const handleUpdate = async () => {
    const payload = {
      id,
      first_name: firstName,
      last_name: lastName,
      email: emailAd,
      user_type,
      email_verified_at,
      profile_picture_path: userProfileUrl,
      gender: userGender,
      date_of_birth: `${dayDOB}/${monthDOB}/${yearDOB}`,
      street_address: userStreet,
      phone_number: phone,
      city: userCity,
      postal_code: postCode,
      state_id: stateId,
      country_id: "160",
    };
    if (
      !userStreet ||
      !firstName ||
      !lastName ||
      !emailAd ||
      !phone ||
      !userCity ||
      !postCode ||
      !stateId ||
      !dayDOB ||
      !monthDOB ||
      !yearDOB
    ) {
      Swal.fire("Oops!", "Fill all the fields", "error");
      return;
    }
    try {
      setIsLoading(true);
      await updateProfile(payload);
      Swal.fire("Success!", "Profile successfully updated", "success");
      setReload(true);
      setIsLoading(false);
    } catch (error) {
      Swal.fire("Oops!", `${error.response.data.message}`, "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getProfileAction());
    dispatch(getStatesAction());
  }, []);
  useEffect(() => {
    const fullName = name?.split(" ");
    const firstName = fullName[0] || "";
    const secondName = fullName[1] || "";
    const dob = date_of_birth ? date_of_birth?.split("/") : ["", "", ""];
    setDayDOB(dob[0]);
    setMonthDOB(dob[1]);
    setYearDOB(dob[2]);
    setUserProfileUrl(profile_picture_path);
    setFirstName(firstName);
    setLastName(secondName);
    setEmailAd(email);
    setUserGender(gender);
    setPhone(phone_number || "");
    setUserStreet(street_address || "");
    setCitPostCode(postal_code || "");
    setUserCity(city || "");
    setStateId(state_id || "");
  }, [
    email,
    phone_number,
    street_address,
    postal_code,
    city,
    state_id,
    // monthDOB,
  ]);
  useEffect(() => {
    if (reload) {
      dispatch(getProfileAction());
      dispatch(getStatesAction());
    }
  }, [reload]);
  useEffect(() => {
    if (onUpload) {
      setOnUpload(false);
    }
  }, [onUpload]);
  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  const handleImage = async (e) => {
    fileToDataUri(e.target.files[0]).then((dataUri) => {
      setUserProfile(dataUri);
    });
    const res = await uploadFile({
      file: e.target.files[0],
      file_name: "profileImage",
    });
    const {
      data: {
        data: { file_link: profileImageUrl },
      },
    } = res;
    setUserProfileUrl(profileImageUrl);
    setOnUpload(true);
  };
  return (
    <div className={style.container}>
      {loading === false && status === "fail" && (
        <ErrorFallback resetErrorBoundary={() => console.log("error")} />
      )}
      {loadingSkeleton(status)}
      {loading === false && status === "success" && (
        <>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Profile Picture</h4>
              <p>Change your current profile picture</p>
            </div>
            <div className={style.group_right}>
              <div className={style.inline_block}>
                <div>
                  <div className={style.user_name_avatar}>
                    {!userProfileUrl && <span>AF</span>}
                    <img src={userProfileUrl || null} alt="" />
                    {/* {!profileImg && <span>AF</span>}
                    <img src={profileImg} alt="" /> */}
                  </div>
                </div>
                <div className={style.border_left}>
                  <p>
                    We accept files in PNG or JPG Format, with a maximum size of
                    5mb{" "}
                    <span
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <span className={style.change_photo}>
                        Change my photo
                      </span>
                      <input
                        type="file"
                        placeholder=""
                        accept="image/*"
                        onChange={handleImage}
                        style={{
                          opacity: 0,
                          position: "absolute",
                          left: 0,
                          width: "11rem",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Edit Full Name</h4>
              <p>Changes can not be made to your name after account creation</p>
            </div>
            <div className={style.group_right}>
              <div className={style.inline_block}>
                <div className={style.even_box}>
                  <div className={style.editable_group}>
                    <input
                      // readOnly={!firstNameEditable}
                      value={firstName}
                      // autoFocus={firstNameEditable}
                      name="firstName"
                      placeholder="Enter first name"
                      className={style.input_form}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <MdModeEdit
                      color="#09974D"
                      className={style.input_card_iconLine}
                      // onClick={() => setFirstNameEdit(!firstNameEditable)}
                    />
                  </div>
                </div>
                <div className={style.even_box}>
                  <div className={style.editable_group}>
                    <input
                      value={lastName}
                      placeholder="Enter last name"
                      name="secondtName"
                      className={style.input_form}
                      type="text"
                      // readOnly={!lastNameEdit}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <MdModeEdit
                      color="#09974D"
                      className={style.input_card_iconLine}
                      // onClick={() => setLastNameEdit(!lastNameEdit)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Email</h4>
              <p>
                We send notifications and account updates to your verified mail
              </p>
            </div>
            <div className={style.group_right}>
              <div className={style.editable_group} style={{ width: "100%" }}>
                <input
                  readOnly
                  value={emailAd}
                  name="email"
                  type="email"
                  placeholder="seun@APEM.com"
                  className={style.input_form}
                  onChange={(e) => setEmailAd(e.target.value)}
                />
                {/* <MdModeEdit
                    color="#09974D"
                    className={style.input_card_iconLine}
                    onClick={() => setEmailEdit(!emailEdit)}
                  /> */}
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Phone Number</h4>
              <p>We send verification code to your phone number</p>
            </div>
            <div className={style.group_right}>
              <div className={style.editable_group} style={{ width: "100%" }}>
                <input
                  // readOnly={!phoneEdit}
                  value={phone}
                  name="phone"
                  type="phone"
                  placeholder="08033221144"
                  className={style.input_form}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <MdModeEdit
                  color="#09974D"
                  className={style.input_card_iconLine}
                  // onClick={() => setPhoneEdit(!phoneEdit)}
                />
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Gender</h4>
              <p>{`What's your gender?`}</p>
            </div>
            <div className={style.group_right}>
              <div className={style.inline_block}>
                <ToggleSelect
                  firstLabel="male"
                  secondLabel="female"
                  userGender={userGender}
                  handleToggleSelect={handleToggleSelect}
                />
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Date of Birth</h4>
              <p>
                We use it to verify your Bank Verification Number and Payout
                processes
              </p>
            </div>
            <div className={style.group_right}>
              <div className={style.inline_block}>
                <div className={style.triple_box}>
                  <Select
                    styles={customStyles}
                    onChange={handleDOBMonth}
                    options={month}
                    placeholder="Month"
                    defaultValue={{
                      label: date_of_birth
                        ? month.find(
                            (item) =>
                              item.value === date_of_birth?.split("/")[1]
                          ).label
                        : "",
                      value: date_of_birth ? date_of_birth?.split("/")[1] : "",
                    }}
                  />
                </div>
                <div className={style.triple_box}>
                  <Select
                    styles={customStyles}
                    onChange={handleDOBDay}
                    options={day}
                    placeholder="Day"
                    defaultValue={{
                      label: date_of_birth
                        ? day.find(
                            (item) =>
                              item.value === date_of_birth?.split("/")[0]
                          ).label
                        : "",
                      value: date_of_birth ? date_of_birth?.split("/")[0] : "",
                    }}
                  />
                </div>
                <div className={style.triple_box}>
                  <Select
                    styles={customStyles}
                    onChange={handleDOBYear}
                    options={years}
                    placeholder="Year"
                    defaultValue={{
                      label: date_of_birth
                        ? years.find(
                            (item) =>
                              item.value === date_of_birth?.split("/")[2]
                          ).label
                        : "",
                      value: date_of_birth ? date_of_birth?.split("/")[2] : "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Street Address</h4>
              <p>
                Residential Street address is required for your account
                validation
              </p>
            </div>
            <div className={style.group_right}>
              <div className={style.editable_group} style={{ width: "100%" }}>
                <input
                  placeholder="Enter Street Address"
                  name="address"
                  type="text"
                  className={style.input_form}
                  value={userStreet}
                  onChange={(e) => setUserStreet(e.target.value)}
                />
                <MdModeEdit
                  color="#09974D"
                  className={style.input_card_iconLine}
                  // onClick={() => setStreetEdit(!streetEdit)}
                />
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>City</h4>
              <p>City of Residence is required for your account validation</p>
            </div>
            <div className={style.group_right}>
              <div className={style.editable_group} style={{ width: "100%" }}>
                <input
                  placeholder="Enter City"
                  name="city"
                  type="text"
                  className={style.input_form}
                  value={userCity}
                  // readOnly={!cityEdit}
                  onChange={(e) => setUserCity(e.target.value)}
                />
                <MdModeEdit
                  color="#09974D"
                  className={style.input_card_iconLine}
                  // onClick={() => setCityEdit(!cityEdit)}
                />
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>State / Province</h4>
              <p>State of Residence is required for your account validation </p>
            </div>
            <div className={style.group_right}>
              <Select
                styles={customStyles}
                onChange={handleProvince}
                options={stateList?.status === "success" ? stateList.data : []}
                placeholder="Select State / Province"
                defaultValue={{
                  label:
                    stateList?.data?.length > 0
                      ? stateList.data[stateId - 1]?.label
                      : "",
                  value: 0,
                }}
              />
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Country of Residence</h4>
              <p>
                Your Country of Residence is required for your account
                validation
              </p>
            </div>
            <div className={style.group_right}>
              <input
                readOnly
                value="Nigeria"
                name="city"
                type="text"
                className={style.input_form}
              />
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}>
              <h4>Postal Code</h4>
              <p>Your Post Code is required for verification</p>
            </div>
            <div className={style.group_right}>
              <div className={style.editable_group} style={{ width: "100%" }}>
                <input
                  placeholder="Enter postal code"
                  // readOnly={!postCodeEdit}
                  name="city"
                  type="text"
                  // postCodeEdit, setPostCodeEdit
                  className={style.input_form}
                  value={postCode}
                  onChange={(e) => setCitPostCode(e.target.value)}
                />
                <MdModeEdit
                  color="#09974D"
                  className={style.input_card_iconLine}
                  // onClick={() => setPostCodeEdit(!postCodeEdit)}
                />
              </div>
            </div>
          </div>
          <div className={style.group}>
            <div className={style.group_left}></div>
            <div className={style.group_right}>
              <div className={style.input_form_button}>
                <button
                  onClick={handleUpdate}
                  type="button"
                  disabled={isLoading}
                  className={style.form__input_submit_request}
                >
                  {isLoading && <Spin size="large" color="#fff" />}
                  {!isLoading ? "Update Profile" : "Updating..."}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyProfile;
