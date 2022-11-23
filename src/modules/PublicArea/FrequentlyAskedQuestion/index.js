import React from "react";
import { Link } from "react-router-dom";
import { openPopupWidget } from "react-calendly";
// import { FiMinus, FiPlus } from "react-icons/fi";
// import PublicGenericLayout from "../../../components/GenericLayout/PublicGenericLayout";
import PageCard from "../../../components/FooterCard";
import { Collapse } from "antd";
// import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import style from "./index.module.scss";
import { FiMinus, FiPlus } from "react-icons/fi";
import "./index.scss";
import Layout from "../../../components/Layout";
import AuthModalForm from "../../../Auth/AuthModalForm";
import NavHeader from "../../../components/Layout/NavHeader";
import Footer from "../../../components/Layout/Footer/Footer";

const { Panel } = Collapse;

const FrequentlyAskedQuestion = () => {
  return (
    <Layout>
      <div style={{ position: "relative", zIndex: "10" }}>
        <AuthModalForm component={NavHeader} navMenuBlack="true" />
      </div>

      <PageCard
        headerIcon="https://res.cloudinary.com/solomonfrank/image/upload/v1655940339/apems/circleRng_yp346j.png"
        title="Frequently Asked Question"
        description="We have taken our time to answer some of the questions we think you'll have"
        containerStyle={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <div className={style.container_wrapper}>
        <div className={style.content_container}>
          <Collapse
            bordered={false}
            expandIconPosition="right"
            // defaultActiveKey={["1"]}
            // expandIcon={({ isActive }) =>
            //   isActive ? (
            //     <FiPlus color="red" size={50} />
            //   ) : (
            //     <FiMinus color="red" size={50} />
            //   )
            // }
            expandIcon={({ isActive }) =>
              isActive ? (
                <span>
                  <FiMinus color="red" size={15} />{" "}
                </span>
              ) : (
                <span>
                  <FiPlus color="red" size={15} />
                </span>
              )
            }
            className="site-collapse-custom-collapse site-collapse-custom-collapse-faq"
          >
            <Panel
              header="What is APEMS"
              key="1"
              className="site-collapse-custom-panel site-collapse-custom-panel-faq"
            >
              <p>
                APEMS is a robust cloud-based event management software that
                makes it easy to plan and execute all online events such as
                Annual General Meetings, Corporate Events and Shows
              </p>
            </Panel>
            <Panel
              header="Can I host virtual events on APEMS?"
              key="2"
              className="site-collapse-custom-panel"
            >
              <p>
                Yes! APEMS allows you to easily organize and host virtual events
                such as Annual General Meetings, Corporate Events and more.
                Apems also allows you to automatically generate all meeting
                reports without doing extra work
              </p>
            </Panel>
            <Panel
              header="Does APEMS allow hybrid events"
              key="3"
              className="site-collapse-custom-panel"
            >
              <p>
                Yes! APEMS allows event managers to create hybrid events and
                allow attendees the choice of attending the event physically or
                virtually
              </p>
            </Panel>
            <Panel
              header="Can I host corporate events on APEMS"
              key="4"
              className="site-collapse-custom-panel"
            >
              <p>
                Yes! APEMS makes it easy to create corporate events such as
                Annual General Meetings and Conferences, Trainings, Seminars
                among others.
              </p>
            </Panel>
            <Panel
              header="What services do you offer"
              key="5"
              className="site-collapse-custom-panel"
            >
              <p>
                We offer high quality event planning and hosting services to
                allow you plan and execute your virtual, physical and hybrid
                corporate events and art shows.
              </p>
            </Panel>
            <Panel
              header="How much do you charge?"
              key="6"
              className="site-collapse-custom-panel"
            >
              <p>
                Our pricing page gives a breakdown of all our charges. The
                pricing plans are based on your event needs and prices may vary
                based on your event needs, book a demo today and our sales team
                will reach out to understand your event needs
              </p>
            </Panel>
            <Panel
              header="What is an event management system?"
              key="7"
              className="site-collapse-custom-panel"
            >
              <p>
                An event management system is solution that is used to organize
                and manage events. This includes planning, scheduling, billing,
                invoicing, reporting and more
              </p>
            </Panel>
            <Panel
              header="What are the features of APEMS?"
              key="8"
              className="site-collapse-custom-panel"
            >
              <p>
                Our robust cloud-based event management system has so many
                features that meet all your needs, the platform allows easy
                planning, execution and reporting of events. Other features
                include self-registration and accreditation, electronic voting,
                proxy voting, meeting notices, meeting promotion, reporting,
                conference registration and more.
              </p>
            </Panel>
            <Panel
              header="How do I join an event?"
              key="9"
              className="site-collapse-custom-panel"
            >
              <p>
                To join an event online, simply click on your event invitation
                link, fill in your Event ID and passcode and click on the join
                event button.
              </p>
            </Panel>
            <Panel
              header="How do I register for an event?"
              key="10"
              className="site-collapse-custom-panel"
            >
              <p>
                To register for an event, simply select the event from the list
                of upcoming events or the invitation link that was sent to you
                then click on register and fill out the form. Do not forget to
                submit the form after filling in all required information.
              </p>
            </Panel>
            <Panel
              header="How do I book a demo?"
              key="11"
              className="site-collapse-custom-panel"
            >
              <p>
                To book a demo, click on this{" "}
                <Link
                  to="#"
                  onClick={() =>
                    openPopupWidget({ url: "https://calendly.com/apems/demo" })
                  }
                >
                  link
                </Link>{" "}
                and fill in all the required information. You can also visit our{" "}
                <Link to="/">homepage</Link> and select book a demo from the
                navigation bar.
              </p>
            </Panel>
            <Panel
              header="Can I buy an event ticket online?"
              key="12"
              className="site-collapse-custom-panel"
            >
              <p>
                Yes! To buy an event ticket, simply select your preferred event
                and click on register. Proceed to fill out the form and complete
                your payment. Your ticket will be sent to your email once
                payment is completed.
              </p>
            </Panel>
            <Panel
              header="I can’t find my event invite, what should I do?"
              key="13"
              className="site-collapse-custom-panel"
            >
              <p>
                No need to panic, please send your registered name and event
                name to our support email (
                <a href="mailto:support@apems.co">support@apems.co</a>) to help
                you.
              </p>
            </Panel>
            <Panel
              header="How do I donate to an event?"
              key="14"
              className="site-collapse-custom-panel"
            >
              <p>
                To donate to an event, simply select the event’s resource center
                and click on the donations. Proceed to complete your donation.
                Once your donation is received, the host will get in touch with
                you.
              </p>
            </Panel>
            <Panel
              header="How can I sponsor an event?"
              key="15"
              className="site-collapse-custom-panel"
            >
              <p>
                No need to worry, simply select an event and click on the
                sponsor an event tab, then proceed to complete your payment.
              </p>
            </Panel>
            <Panel
              header="How do I submit my proxy form?"
              key="16"
              className="site-collapse-custom-panel"
            >
              <p>
                Simply select the event’s resource center and click on Proxy
                Form, kindly fill out your form online and click on the submit
                button.
              </p>
            </Panel>
            <Panel
              header="How can I attend AGM?"
              key="17"
              className="site-collapse-custom-panel"
            >
              <p>
                Kindly be informed that the time and venue of the AGM date will
                be communicated to you promptly.
              </p>
            </Panel>
            <Panel
              header="Why can't I attend online?"
              key="18"
              className="site-collapse-custom-panel"
            >
              <p>
                Kindly be informed that as a shareholder you can attend the
                event online. The link to attend and vote has been sent to you
                already. Do check for the link sent with the SMS.
              </p>
            </Panel>
            <Panel
              header="What is the process flow to vote?"
              key="19"
              className="site-collapse-custom-panel"
            >
              <p>
                Kindly click on the link sent to you, input your unique code,
                wait for the prompt and then vote your preferred choice.
              </p>
            </Panel>
            <Panel
              header="What is the process flow for using *4018*8#?"
              key="20"
              className="site-collapse-custom-panel"
            >
              <p>
                Kindly dial *4018*8# on your phone, hit the send button, select
                your preferred company Meeting, then Select the resolution
                number, Vote: For or Against or Abstain and send. To change your
                vote, kindly repeat the process
              </p>
            </Panel>
            <Panel
              header="I couldn't use the USSD code, what do I do?"
              key="21"
              className="site-collapse-custom-panel"
            >
              <p>
                Kindly use the phone number the link was sent or contact
                enquiries@apems.co to change your contact details
              </p>
            </Panel>
            <Panel
              header="How can our shareholders subscribe to this?"
              key="22"
              className="site-collapse-custom-panel"
            >
              <p>
                Kindly go below, input your email address in the request demo
                filed and our representative will contact you on how this can be
                possible.
              </p>
            </Panel>
            <Panel
              header="I did not receive the link to attend the AGM, what do I do?"
              key="23"
              className="site-collapse-custom-panel"
            >
              <p>
                If you are a shareholder, kindly check your SMS or spam section
                of your email to confirm receipt of the link, if not received
                please contact enquiries@apems.co for assistance with this.
              </p>
            </Panel>
            <Panel
              header="Why can't I visit the venue of the meeting?"
              key="24"
              className="site-collapse-custom-panel"
            >
              <p>
                Kindly be informed that due to the Covid-19 restrictions and
                guidelines, you are encouraged to join the meeting virtually
                using the link sent to your registered contact details as
                captured in our database
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default FrequentlyAskedQuestion;
