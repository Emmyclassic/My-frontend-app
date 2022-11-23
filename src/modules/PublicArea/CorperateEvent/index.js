import React from "react";
import PageCard from "../../../components/PageCard";
import PeopleEvent from "../../../components/PeopleEvent";

import Layout from "../../../components/Layout";
import AuthModalForm from "../../../Auth/AuthModalForm";
import NavHeader from "../../../components/Layout/NavHeader";
import Footer from "../../../components/Layout/Footer/Footer";

const CorperateEvent = () => {
  return (
    <Layout>
      <div style={{ position: "relative", zIndex: "10" }}>
        <AuthModalForm component={NavHeader} />
      </div>

      <PageCard
        backgroundUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940353/apems/show_qjhcwx.jpg"
        pageName="Corporate events"
        title="Never miss a corporate event for anything."
        description="Never miss an event for anything, see what’s coming up and when! Our one stop event management solution makes it easy to subscribe to your preferred events without hassles - the only way to stay up-to-date with corporate events, meetings and conferences. Get event notifications from all parts of the world for your preferred event needs when you subscribe"
        containerStyle={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <PeopleEvent
        imageContainer={{ width: "100%" }}
        imageUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940342/apems/event_y0p1g1.jpg"
        title="Physical Events"
        description="APEMS helps you get all aspects of your event ready before the main event date. Get the event you need, when you need it. We provide all-inclusive, easy-to-use and affordable solutions for any size event from small conferences to large events. Build, host and manage your events with ease. Manage event registrations, donations, ticketing, event promotion automation and much more when you use APEMS."
      />

      <PeopleEvent
        descContainer2={true}
        meetingEvent={{
          backgroundColor: "#f4f6f7",
        }}
        imageUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940355/apems/virtual_rxdvzf.jpg"
        title=" Virtual Event"
        description="Establish a presence in virtual worlds with the most comprehensive event management platform that lets you plan and execute virtual events, meetings, conferences and more with ease. Be in control of your event with best-in-class technology, state-of-the-art systems and a team of experts. Bring your team together, easily handle registrations, ticketing, event campaigns and achieve memorable events with easy to create breakout rooms and more. Everything you need to plan and execute your virtual events with zero hassles!"
      />
      <Footer />
    </Layout>
  );
};

export default CorperateEvent;
