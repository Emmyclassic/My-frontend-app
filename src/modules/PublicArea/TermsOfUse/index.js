import React from "react";

// import PublicGenericLayout from "../../../components/GenericLayout/PublicGenericLayout";
import FooterCard from "../../../components/FooterCard";
import Layout from "../../../components/Layout";
import AuthModalForm from "../../../Auth/AuthModalForm";
import NavHeader from "../../../components/Layout/NavHeader";
import Footer from "../../../components/Layout/Footer/Footer";

import style from "./index.module.scss";

const TermsOfUse = () => {
  return (
    <Layout>
      <div style={{ position: "relative", zIndex: "10" }}>
        <AuthModalForm component={NavHeader} navMenuBlack="true" />
      </div>
      <FooterCard
        headerIcon="https://res.cloudinary.com/solomonfrank/image/upload/v1655940339/apems/circleRng_yp346j.png"
        title="Terms of Uses"
        containerStyle={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <div className={style.container_wrapper}>
        <div className={style.content_container}>
          <p className={style.content_title}>IMPORTANT INFORMATION</p>
          <p>
            This page states the Terms and Conditions under which you may use
            the website www.africaprudential.com (referred to as the Site).
            Please read these Terms and Conditions carefully. If you do not
            accept the Terms and Conditions stated here, do not use the Site.
            Africa Prudential Plc reserves the right to revise the enclosed
            Terms and Conditions on a frequent basis. You as the viewer agree to
            review the Terms and Conditions on a periodical basis. As a repeat
            visitor to the Site, you may consider the Terms and Conditions
            binding to successive visits.
          </p>
          <p className={style.content_title}>INFORMATION ON THE SITE</p>
          <p>
            This Site aims to provide commercial information to clients
            prospective and current. However, personal comments, opinions and
            views expressed on this Site are not necessarily a representation of
            the views of Africa Prudential Plc its directors or its clients.
            Africa Prudential Plc is not responsible for any injury, loss,
            damage or expense incurred by any individual as a result either
            directly or indirectly of any information published on this website.
            In using this site, you acknowledge and agree that the terms set
            forth above are fundamental to the usage of the Site, and that the
            Site would not be provided to you in the absence of such terms.
          </p>
          <p className={style.content_title}>USER INTERACTIONS</p>
          <p>
            Generally, any communication which you transfer to the Site is
            considered to be non-confidential. Africa Prudential Plc will not
            guarantee the privacy or confidentiality of any information relating
            to the user passing over the Internet.
          </p>
          <p className={style.content_title}>DISCLAIMER</p>
          <p>
            Africa Prudential Plc does not claim the Site will operate free of
            errors or that the Site and its servers are free of possibly harmful
            elements.
          </p>
          <p className={style.content_title}>THIRD PARTY LINKS</p>
          <p>
            The Site may contain links to third party Web Sites. These links are
            provided solely as a convenience to you. Africa Prudential Plc is
            not responsible for the content of linked third party sites and does
            not make any representations regarding the content or accuracy of
            materials on such third party Web Sites. If you decide to access
            linked third-party Web Sites, you do so at your own risk and in
            accordance with the prevailing terms and conditions and privacy
            policies of third party sites.
          </p>
          <p className={style.content_title}>GENERAL</p>
          <p>
            Any disputes, claims or proceedings arising out of or in any way
            relating to the materials on site shall be governed by the laws of
            the Federal Republic of Nigeria. The Nigerian Courts shall have
            exclusive jurisdiction for the purpose of any proceedings arising
            out of or in any way relating to the materials on site. If any
            provision of this Agreement is found to be invalid by any court
            having competent jurisdiction, the invalidity of such provision
            shall not affect the validity of the remaining provisions of this
            Agreement, which shall remain in full force and effect. No waiver of
            any term of this Agreement shall be deemed a further or continuing
            waiver of such term or any other term. Africa Prudential Plc may at
            any time and without liability modify, suspend or discontinue the
            Site or any materials (or any part or specification thereof), with
            or without notice, for any valid technical, operational or
            commercial reasons. These Terms and Conditions constitute the entire
            agreement between you and Africa Prudential Plc with respect to the
            use of the Site.
          </p>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default TermsOfUse;
