import React from "react";
import PageCard from "../../../components/PageCard";
import PeopleEvent from "../../../components/PeopleEvent";
import AuthModalForm from "../../../Auth/AuthModalForm";
import NavHeader from "../../../components/Layout/NavHeader";
import Layout from "../../../components/Layout";
import Footer from "../../../components/Layout/Footer/Footer";

const GeneralMeeting = () => {
  return (
    <Layout>
      <div style={{ position: "relative", zIndex: "10" }}>
        <AuthModalForm component={NavHeader} />
      </div>
      <PageCard
        containerStyle={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        backgroundUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/meeting1_aciyul.jpg"
        pageName="Annual General Meetings"
        title=" Keep your stakeholders connected and up to date."
        description="Our solution helps you make the most of your Annual General Meeting. Engage and interact with your stakeholders in a secure environment where they can easily access information and engage with your company's business. Facilitate and modernize your AGM with our Online Proxy form, In Meeting Resolution Voting and Virtual Voice Question amongst others that helps you enhance the quality of your meetings and keeps everyone connected no matter their location."
      />
      <PeopleEvent
        imageUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940350/apems/meeting3_bykf7z.jpg"
        // imageContainer={{ width: "100%" }}
        title="Hybrid AGM"
        description="APEMS makes Hybrid AGM meetings seamless combining traditional and virtual meetings allowing stakeholders to attend in person or virtually. The best of both worlds – the convenience of a virtual meeting and the benefit of being able to meet in person at a physical venue. Enjoy Real-time interaction, no need to travel - A truly hybrid meeting solution that gets all your attendees connected to your meetings"
      />

      <PeopleEvent
        descContainer2={true}
        meetingEvent={{
          backgroundColor: "#f4f6f7",
        }}
        imageUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940349/apems/meeting2_xaorcj.jpg"
        title=" Virtual Event"
        description="Our innovative event management solution helps you to plan and execute unforgettable virtual Annual General Meetings that enables your stakeholders to interact, report business activities, vote on business resolutions, ask questions and participate electronically in real time in a virtual setting. APEMS is the go to virtual AGM software solution for all businesses sizes. It's affordable, easy to use and you don't need any IT skills to manage your meetings!"
      />
      <PeopleEvent
        imageUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940348/apems/meeting1_aciyul.jpg"
        title="Electronic Voting"
        description="Enjoy seamless electronic voting or pre-voting experience, APEMS allows you to easily and securely manage your elections from anywhere in the world with instant voting results. Vote anytime, anywhere and from any device. APEMS provides an easy to use voting system that enables you to quickly and easily vote online in a secure environment."
      />
      <Footer />
    </Layout>
  );
};

export default GeneralMeeting;
