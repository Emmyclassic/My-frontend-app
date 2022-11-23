import React from "react";
import { Collapse } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import FooterCard from "../../../components/FooterCard";
import Layout from "../../../components/Layout";
import AuthModalForm from "../../../Auth/AuthModalForm";
import NavHeader from "../../../components/Layout/NavHeader";
import Footer from "../../../components/Layout/Footer/Footer";

import style from "./index.module.scss";

const PrivacyPolicy = () => {
  const { Panel } = Collapse;
  return (
    <Layout>
      <div style={{ position: "relative", zIndex: "10" }}>
        <AuthModalForm component={NavHeader} navMenuBlack="true" />
      </div>
      <FooterCard
        headerIcon="https://res.cloudinary.com/solomonfrank/image/upload/v1655940339/apems/circleRng_yp346j.png"
        title="Privacy & Policy"
        description="We at Africa Prudential treat the privacy of our visitors with the highest importance. This policy details the measures we take to preserving and safely guarding your privacy when you visit our site or communicate with our personnel. The Privacy Policy here has been approved and provided by our legal advisors."
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
            expandIcon={({ isActive }) => (
              <CaretRightFilled color="#EF3125" rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
            expandIconPosition="right"
            ghost
          >
            <Panel header="Glossary" key="1">
              <div className={style.collapse_content}>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>
                    Affiliated Third Parties{" "}
                  </span>
                  <span>
                    includes companies with which we have common ownership or
                    management or other contractual strategic support or
                    partnership relationships with, our advisers, consultants,
                    bankers, vendors or sub-contractors.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>Data </span>
                  <span>
                    is information, which is stored electronically, on a
                    computer, or in certain paper-based filing systems.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>Data Controller </span>
                  <span>
                    is a person responsible for determining the manner in which
                    Personal Data would be processed.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>NDPR </span>
                  <span>means the Nigerian Data Protection Regulations.</span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>NITDA </span>
                  <span>
                    means the National Information Technology Development
                    Agency.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>Personal Data </span>
                  <span>
                    is the information relating to an identified or identifiable
                    natural person. These include a name, gender, a photo, an
                    email address, bank details, medical information, computer
                    internet protocol address and any other information specific
                    to the physical, physiological, genetic, mental, economic,
                    cultural or social identity of that natural person.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>Processing </span>
                  <span>
                    is any activity that involves use of Personal Data. It
                    includes obtaining, recording or holding the data, or
                    carrying out any operation or set of operations on the data
                    including organising, amending, recording, retrieving,
                    using, disclosing, erasing or destroying it. Processing also
                    includes transferring personal data to third parties.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>
                    Sensitive Personal Data{" "}
                  </span>
                  <span>
                    includes information about a person’s racial origin,
                    political opinions, religious or similar beliefs, trade
                    union membership, physical or mental health or condition or
                    sexual life.
                  </span>
                </div>
              </div>
            </Panel>
            <Panel header="Privacy Policy" key="2">
              <div className={style.collapse_content}>
                <p className={style.collapse_title}>Data Collection</p>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>
                    1). Identity Data{" "}
                  </span>
                  <span>
                    includes first name, last name, username or similar
                    identifier, title, date of birth and gender.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>
                    2). Contact Data{" "}
                  </span>
                  <span>
                    includes residential address, email address and telephone
                    numbers.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>
                    3). Human Resource Data{" "}
                  </span>
                  <span>
                    includes information on your employment history,
                    professional and educational information submitted upon
                    applying for employment with us.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>
                    4).Technical Data{" "}
                  </span>
                  <span>
                    includes internet protocol (IP) address, domain name, your
                    login data, browser type and version, time zone setting and
                    location, browser plug-in types and versions, operating
                    system and platform, and other technology on the devices you
                    use to access this website.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>5).Profile Data </span>
                  <span>
                    includes your username and password, purchases or orders
                    made by you, your interests, preferences, feedback and
                    survey responses.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>6).Usage Data </span>
                  <span>
                    includes information about how you use our website and
                    services.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span className={style.collapse_title}>
                    7).Marketing and Communications Data{" "}
                  </span>
                  <span>
                    includes your preferences in receiving marketing
                    communications from us and our Affiliated Third Parties and
                    your communication preferences.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    You provide this information through direct interaction when
                    you visit our website, sign up to our newsletters or
                    publications, request marketing materials to be sent to you,
                    respond to surveys, complete our feedback or comment form,
                    provide your business card to any of our staff, sign our
                    visitor management form, complete other forms, apply for
                    employment through our careers page, or contact us to
                    request for any information or other correspondence by post,
                    email, our website or otherwise.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    As you interact with our website, we will automatically
                    collect technical data about your equipment, browsing
                    actions and patterns. We collect this data by using cookies,
                    and other similar technologies. Please see our cookies
                    policy for further details.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    We do not intentionally or knowingly collect any Sensitive
                    Personal Data. We ask that you do not send to us nor
                    disclose such Sensitive Personal Data save where required
                    for a specific purpose.
                  </span>
                </div>
                <p className={style.collapse_title}>
                  Your Personal Data and How It Is Used
                </p>
                <div className={style.margin_bottom}>
                  <span>
                    Primarily, we collect, process and store your Personal Data
                    to help us better connect with you. The following are the
                    purposes for which we collect your Personal Data:
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    To monitor, review, evaluate and improve your experience
                    when you visit our website
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    To analyse the traffic on our website, including determining
                    the number of visitors to the website and analyse how they
                    navigate the website.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    To invite you to complete a survey or provide feedback to us
                    on specific matters.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    At any time, you request information from us via a form or
                    other electronic transmission we may use your Personal Data
                    to fulfil that request and keep a record of such request and
                    how it was handled, for quality assurance and service
                    improvement purposes.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    To keep you updated on our activities, programmes and events
                    where your explicit consent has been given.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    To notify you of changes to our websites or relevant
                    processes.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    We may also use your information or allow Affiliated Third
                    Parties such as our affiliate companies or partners use of
                    this Personal Data, to offer you information about unrelated
                    products or services you may be interested in. We or such
                    Affiliated Third Parties can only communicate with you if
                    you have expressly consented to such communication and data
                    use.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    We may share your personal data with Affiliated Third
                    Parties such as service providers who we have engaged to
                    assist with providing certain services on our behalf, for
                    which they require your personal data.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    Where we have any contracts with you which create a
                    commitment, we may require contact or use of your
                    information to perform the contract.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    To process or manage your appointments with any of our
                    staff.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    To fulfil legal/ regulatory obligations or to report any
                    criminal or unethical activity.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    To store either on our central computer system or a
                    third-party Computer’s central computer system for archiving
                    and back up purposes.
                  </span>
                </div>
                <div className={style.collapse_bullet_option}>
                  <div className={style.container_bullet}>
                    <span className={style.collapse_bullet}></span>
                  </div>
                  <span>
                    Beaware that we do not reveal identifiable information about
                    you to our advertisers, though we may at times share
                    statistical visitor information with our advertisers.
                  </span>
                </div>
                <p className={style.collapse_title}>Change of Purpose</p>
                <div className={style.margin_bottom}>
                  <span>
                    We will only use your Personal Data for the aforementioned
                    purposes, unless we reasonably consider that we need to use
                    it for another reason and that reason is compatible with the
                    original purpose.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    If you wish to get an explanation as to how the processing
                    for the new purpose is compatible with the original purpose,
                    please contact us. If we need to use your Personal Data for
                    an unrelated purpose, we will notify you and request for
                    your express consent.
                  </span>
                </div>
                <p className={style.collapse_title}>
                  Your Personal Data Rights
                </p>
                <div className={style.margin_bottom}>
                  <span>
                    Data Protection Laws provides you with certain rights in
                    relation to the information that we collect about you.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    The right to withdraw consent previously given to us or our
                    Affiliated Third Parties. In order to make use of your
                    personal data, we would have obtained your consent. For
                    consent to be valid, it must be given voluntarily. In line
                    with regulatory requirements, consent cannot be implied, and
                    we ensure that you have the opportunity to read our data
                    protection privacy policy before you provide your consent.
                    Consent in respect of Sensitive Personal Data must be
                    explicit and will be given by you in writing to us. The
                    consent of minors (under the age of 18) will always be
                    protected and obtained from the minor’s representatives in
                    accordance with applicable regulatory requirements.You can
                    ask us or Affiliated Third Parties to stop sending you
                    marketing messages at any time by unsubscribe or unchecking
                    relevant boxes to adjust your marketing preferences or by
                    following the opt-out links on any marketing message sent to
                    you.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    The right to request that we delete your Personal Data that
                    is in our possession, subject however to retention required
                    for legal purposes and the time required technically to
                    delete such information. The right to request for access to
                    your Personal Data or object to us processing the same.
                    Where personal data is held electronically in a structured
                    form, such you have a right to receive that data in a common
                    electronic format. The right to update your Personal Data
                    that is kept with us. You may do this at any time your
                    personal data changes and you wish to update us.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    The right to receive your Personal Data and have it
                    transferred to another Data Controller, as applicable. The
                    right to lodge a complaint. You may exercise any of the
                    above stated rights following our Data Subject Access
                    Request Procedure. Persons who have access to your Personal
                    Data In addition to our staff who have a business need to
                    know, the following trusted third parties have access to
                    your information: We use a customer relationship management
                    tool to help manage our contact database and send out email
                    communications to you. Our Affiliate Third Parties who
                    require your information for the same purposes described in
                    this Policy and who have adopted similar privacy policy
                    standards further to contractual obligations to us under a
                    third party data processing agreement we have entered with
                    them. Professional service providers such as IT service
                    providers and website hosts. Regulatory authorities.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    We will transfer your Personal Data to only those Affiliated
                    Third Parties who we are sure can offer the required level
                    of protection to your privacy and information and who are
                    also contractually obligated to us to do so. We do not and
                    will not at any point in time sell your Personal Data. We
                    require all Affiliated Third Parties to respect the security
                    of your personal data and to treat it in accordance with the
                    law. We do not allow our professional service providers to
                    use your Personal Data for their own purposes and only
                    permit them to process your Personal Data for specified
                    purposes and in accordance with our instructions.
                  </span>
                </div>
                <p className={style.collapse_title}>
                  Security & Confidentiality
                </p>
                <div className={style.margin_bottom}>
                  <span>
                    Information submitted by you is stored on secure servers we
                    have which are encrypted and access is restricted to only
                    authorised persons in charge of maintaining the servers. We
                    have put in place physical, electronic and procedural
                    processes that safeguard and protect your information
                    against unauthorised access, modification or erasure.
                    However, we cannot guarantee 100% security as no security
                    programme is completely fool proof. In the unlikely event
                    that we experience any breach to your personal data, such
                    breach shall be handled in accordance with our Personal Data
                    Breach Management Procedures. All such breaches shall be
                    notified to the NITDA within 72 hours of occurrence and
                    where deemed necessary, based on the severity and potential
                    risks, we shall notify you of such occurrence, steps taken
                    and remedies employed to prevent a reoccurrence.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    Our staff also have an obligation to maintain the
                    confidentiality of any Personal Data held by us.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    As you know, transmission of data on the internet is never
                    guaranteed regarding safety. It is impossible to completely
                    guarantee your safety with electronic data and transmission.
                    You are therefore at your own risk if you elect to transmit
                    any data electronically.
                  </span>
                </div>
                <p className={style.collapse_title}>
                  Transfer of Personal Data outside Nigeria
                </p>
                <div className={style.margin_bottom}>
                  <span>
                    The Personal Data we collect may be transferred to and
                    processed in another country other than your country of
                    residence for the purposes stated above. The data protection
                    laws in those countries may be different from, and less
                    stringent than the laws applicable in your country of
                    residence.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    By accepting this Policy or by providing your Personal Data
                    to us, you expressly consent to such transfer and
                    Processing. We will however take all reasonable steps to
                    ensure that your data is treated securely and transfer of
                    your Personal Data will only be done in accordance with the
                    requirements of applicable laws and to parties who have put
                    in place adequate controls to secure and protect your
                    Personal Data.
                  </span>
                </div>
                <p className={style.collapse_title}>
                  Retention of Personal Data
                </p>
                <div className={style.margin_bottom}>
                  <span>
                    We retain your Personal Data for no longer than reasonably
                    necessary for the purposes set out in this Policy and in
                    accordance with legal, regulatory, tax, accounting or
                    reporting requirements.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    We may retain your Personal Data for a longer period in the
                    event of a complaint or if we reasonably believe there is a
                    prospect of litigation in respect to our relationship with
                    you.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    To determine the appropriate retention period for personal
                    data, we consider the amount, nature and sensitivity of the
                    Personal Data, the potential risk of harm from unauthorised
                    use or disclosure of your Personal Data, the purposes for
                    which we process your Personal Data and whether we can
                    achieve those purposes through other means, and the
                    applicable legal, regulatory, tax, accounting or other
                    requirements.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    Where your Personal Data is contained within a document, the
                    retention period applicable to such type of document in our
                    document retention policy shall apply.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    This website or our email communication may include links to
                    third party websites, plug-ins and applications. Clicking on
                    those links or enabling those connections may allow third
                    parties to collect or share data about you. We do not
                    control these third-party websites and are not responsible
                    for their privacy statements. When you leave our website, we
                    encourage you to read the privacy policy of every website
                    you visit
                  </span>
                </div>
              </div>
            </Panel>
            <Panel header="Cookies Policy" key="3">
              <div className={style.collapse_content}>
                <div className={style.margin_bottom}>
                  <span>
                    Our advertisers and organisation may have the occasion to
                    collect information in regard to your computer for our
                    services. The information is gained in a statistical manner
                    for our use or advertisers on our site.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    Data gathered will not identify you personally. It is
                    strictly aggregate statistical data about our visitors and
                    how they used our resources on the site. No identifying
                    Personal Data will be shared at any time via cookies.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    Close to the above, data gathering can be about general
                    online use through a cookie file. When used, cookies are
                    automatically placed in your hard drive where information
                    transferred to your computer can be found. These cookies are
                    designed to help us correct and improve our site’s services
                    for you.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    You may elect to decline all cookies via your computer or
                    set up alerts to prompt you when websites set or access
                    cookies. Every computer has the ability to decline file
                    downloads like cookies. Your browser has an option to enable
                    the declining of cookies. If you do decline cookie downloads
                    you may be limited to certain areas of our site, as there
                    are parts of our site that require cookies.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    Any of our advertisers may also have a use for cookies. We
                    are not responsible, nor do we have control of the cookies
                    downloaded from advertisements. They are downloaded only if
                    you click on the advertisement.
                  </span>
                </div>
              </div>
            </Panel>
            <Panel header="Subject Access Request Response Procedure" key="4">
              <div className={style.collapse_content}>
                <div className={style.margin_bottom}>
                  <span>
                    Our advertisers and organisation may have the occasion to
                    collect information in regard to your computer for our
                    services. The information is gained in a statistical manner
                    for our use or advertisers on our site.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    Data gathered will not identify you personally. It is
                    strictly aggregate statistical data about our visitors and
                    how they used our resources on the site. No identifying
                    Personal Data will be shared at any time via cookies.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    Close to the above, data gathering can be about general
                    online use through a cookie file. When used, cookies are
                    automatically placed in your hard drive where information
                    transferred to your computer can be found. These cookies are
                    designed to help us correct and improve our site’s services
                    for you.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    You may elect to decline all cookies via your computer or
                    set up alerts to prompt you when websites set or access
                    cookies. Every computer has the ability to decline file
                    downloads like cookies. Your browser has an option to enable
                    the declining of cookies. If you do decline cookie downloads
                    you may be limited to certain areas of our site, as there
                    are parts of our site that require cookies.
                  </span>
                </div>
                <div className={style.margin_bottom}>
                  <span>
                    Any of our advertisers may also have a use for cookies. We
                    are not responsible, nor do we have control of the cookies
                    downloaded from advertisements. They are downloaded only if
                    you click on the advertisement.
                  </span>
                </div>
              </div>
            </Panel>
            <Panel header="Contacting Us" key="5">
              <div className={style.collapse_content}>
                <div className={style.margin_bottom}>
                  <span>
                    We welcome any queries, requests you may have regarding our
                    Data Protection Privacy Policies, or our privacy practices.
                    Please feel free to contact us at
                    dataprotectionofficer@africaprudential.com
                  </span>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default PrivacyPolicy;
