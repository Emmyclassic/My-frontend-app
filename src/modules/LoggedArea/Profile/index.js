import React, { useState, useEffect } from "react";
import PrivateGenericLayout from "../../../components/PrivateGenericLayout/PrivateGenericLayout";
import style from "./index.module.scss";
import DashboardLeftHeaderNav from "../../../components/Dashboard/LeftHeaderNav";
import Tab from "../../../components/Dashboard/Tab";
import MyProfile from "./MyProfile";
import Password from "./Password";
import PayoutAccount from "./PayoutAccount";
import Pricing from "./Pricing";
import SocialProfile from "./SocialProfile";

const tabMenu = [
  { id: "0001", title: "Profile Settings" },
  { id: "0002", title: "Socials" },
  { id: "0003", title: "Bank Details" },
  { id: "0004", title: "Password" },
  { id: "0005", title: "Pricing" },
];

function Profile() {
  const [tab, setTab] = useState("Profile Settings");
  const toggleTab = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    const zoomContainer = document.getElementById("zmmtg-root");
    if (zoomContainer) {
      zoomContainer.style.display = "none";
    }
  }, []);
  return (
    <PrivateGenericLayout
      leftNav={
        <DashboardLeftHeaderNav
          title="Profile"
          subtitle="Manage your personal information, socials, bank account and password"
        />
      }
    >
      <div className={style.main}>
        <div className={style.top_session}>
          <div className={style.top_session_left}>
            <Tab list={tabMenu} handleTabClick={toggleTab} active={tab} />
          </div>
        </div>
        <div>
          {tab === "Profile Settings" && <MyProfile />}
          {tab === "Socials" && <SocialProfile />}
          {tab === "Bank Details" && <PayoutAccount />}
          {tab === "Password" && <Password />}
          {tab === "Pricing" && <Pricing />}
        </div>
      </div>
    </PrivateGenericLayout>
  );
}

export default Profile;
