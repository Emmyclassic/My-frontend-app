import React from "react";
import PageCard from "../../../components/PageCard";
import PeopleEvent from "../../../components/PeopleEvent";

import Layout from "../../../components/Layout";
import AuthModalForm from "../../../Auth/AuthModalForm";
import NavHeader from "../../../components/Layout/NavHeader";
import Footer from "../../../components/Layout/Footer/Footer";

const ShowEvent = () => {
  return (
    <Layout>
      <div style={{ position: "relative", zIndex: "10" }}>
        <AuthModalForm component={NavHeader} />
      </div>

      <PageCard
        backgroundUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940353/apems/show5_xc11dn.jpg"
        pageName="Shows"
        title="Easily Plan and Execute Memorable Shows"
        description="Promote your events and shows with ease. Effortlessly manage sales of tickets, event promotions, registrations, reporting and give your users an intriguing experience regardless of location when you use APEMS. Manage shows with real-time documented tracking, analytics and reporting. Create smooth experiences for you and your attendees."
        containerStyle={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <PeopleEvent
        imageContainer={{ width: "100%" }}
        imageUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940354/apems/show6_yirqrk.jpg"
        title="Music concert"
        description="Create an unforgettable global virtual music concert with our event management solution that lets you plan, promote and execute your modern music concert with ease. Easily manage all your artists, and reach a large audience from all parts of the world. Be a part of the virtual music concert revolution and create an electrifying online experience when you use APEMS to promote your next event, get reach more people with your events."
      />

      <PeopleEvent
        descContainer2={true}
        meetingEvent={{
          backgroundColor: "#f4f6f7",
        }}
        imageUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940353/apems/show2_lywckh.jpg"
        title="Art Shows"
        description="Our one stop event management solution makes exhibiting artworks and running art shows easy. It combines interactive features with an easy-to-use interface and best in class technology to deliver an immersive experience for artists and collectors. Our solution lets art galleries and museums manage their collection, exhibitions, events and sales."
      />
      <PeopleEvent
        meetingEvent={{ paddingTop: "5rem" }}
        imageUrl="https://res.cloudinary.com/solomonfrank/image/upload/v1655940353/apems/show5_xc11dn.jpg"
        title="Religious events"
        imageContainer={{ width: "100%" }}
        description="Easily collect donations online, raise funds, bring your members closer and stream your next religious events with APEMS. Host and manage your online religious conference, spiritual event or other religious gatherings. We provide all the necessary tools to convert your events into a success story. Our solution helps churches and religious associations manage their events and grow their communities’ faith. Book a Demo Today"
      />
      <Footer />
    </Layout>
  );
};

export default ShowEvent;
