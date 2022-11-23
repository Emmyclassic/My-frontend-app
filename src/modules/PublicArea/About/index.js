import React from "react";

// import PublicGenericLayout from "../../../components/GenericLayout/PublicGenericLayout";

import PeopleEvent from "../../../components/PeopleEvent";
import PageCard from "../../../components/PageCard";
import style from "./index.module.scss";
import Layout from "../../../components/Layout";
import AuthModalForm from "../../../Auth/AuthModalForm";
import NavHeader from "../../../components/Layout/NavHeader";
import Footer from "../../../components/Layout/Footer/Footer";

const About = () => {
  return (
    <Layout>
      <div style={{ position: "relative", zIndex: "10" }}>
        <AuthModalForm component={NavHeader} navMenuBlack="true" />
      </div>

      <div className={style.header_container}>
        <div className={style.float_image_container}>
          <img
            src="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/about11_ppyxhb.jpg"
            className={style.float_image}
          />
        </div>
        <div className={style.header_hero}>
          <PageCard
            backgroundUrl={""}
            pageName=""
            title="We help you host high quality events"
            description="Apems helps you plan and host your events creating unforgettable experiences for your attendees. Our Hybrid solution enables you to effortlessly manage and execute exceptional virtual and Hybrid experiences for your Annual General Meetings, Corporate Events and Shows."
            containerStyle={{
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))
     `,
            }}
            containerTitleStyle={{
              color: "#000",
              fontFamily: "ttnorms",
              fontWeight: "700",
            }}
            containerDescStyle={{
              color: "rgba(0, 0, 0, 0.7)",
              fontFamily: "ttnorms",
              fontSize: "1.5rem",
            }}
          />
        </div>
      </div>
      <section className={style.about}>
        <section className={style.about_container}>
          <div className={style.about_container_title}>About APEMS</div>
          <div className={style.about_container_description}>
            APEMS is an innovative event management solution that lets you
            seamlessly and efficiently execute virtual and hybrid events such as
            annual general meetings, corporate events, art shows, music
            concerts, religious events, meetings and much more. We help create
            experiences at your events, as we provide a one stop shop for all
            your virtual and hybrid event management and reporting needs. Our
            innovative event management platform provides you with Event Notices
            and Campaigns, Registrations, Ticketing, Self-Accreditation, Q&A,
            Voting, In Meeting Collaboration, Payments, Reporting and so much
            more, helping you create that memorable experience for your
            attendees in an efficient and flexible manner.
          </div>
        </section>
      </section>

      <PeopleEvent
        imageContainer={{ width: "100%" }}
        meetingEvent={{ paddingTop: "5rem" }}
        imageUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/about1_saxjmq.jpg"
        title="Our Mission & Vision"
        description="Our goal is to provide you with a seamless platform that helps you create, manage and track all your event activities with ease, providing a one stop shop for all your virtual and hybrid event needs.

        To become the best event management software and solution. From one-on-one meetings to your most complex user conferences, APEMS event management software seeks to create robust and flexible solutions enough to surpass your event needs."
      />
      <Footer />
    </Layout>
  );
};

export default About;
