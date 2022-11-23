import React from "react";
import DashboardLeftHeaderNav from "../../../../components/Dashboard/LeftHeaderNav";
import PrivateGenericLayout from "../../../../components/PrivateGenericLayout/PrivateGenericLayout";
import Arrow from "../../../../components/Dashboard/Arrow";
import EmailCard from "../../../../components/Cards/EmailCard";

import style from "./index.module.scss";

function EmailTemplate({ id }) {
  console.log(id);
  return (
    <PrivateGenericLayout
      leftNav={
        <>
          <Arrow />
          <DashboardLeftHeaderNav
            title="Select a Mail Template"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </>
      }
      RightNav={<></>}
    >
      <div className={style.main}>
        <div className={style.card_container}>
          <EmailCard />
          <EmailCard title="Follow Up" />
          <EmailCard title="Showcase Product" />
          <EmailCard title="Educate" />
        </div>
        <div className={style.card_container}>
          <EmailCard title="Appointment Reminder" />
          <EmailCard title="Newsletter" />
          <EmailCard title="Event" />
          <EmailCard title="Invitation" />
        </div>
      </div>
    </PrivateGenericLayout>
  );
}

export default EmailTemplate;
