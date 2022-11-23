import React from "react";

// import PublicGenericLayout from "../../../components/GenericLayout/PublicGenericLayout";
import RequestDemo from "../../../components/Layout/RequestDemo/RequestDemo";
import Layout from "../../../components/Layout";
import AuthModalForm from "../../../Auth/AuthModalForm";
import NavHeader from "../../../components/Layout/NavHeader";
import Footer from "../../../components/Layout/Footer/Footer";

// import style from "./index.module.scss";

const ContactUs = () => {
  return (
    <Layout>
      <div style={{ position: "relative", zIndex: "10" }}>
        <AuthModalForm component={NavHeader} />
      </div>

      <RequestDemo />
      <Footer />
    </Layout>
  );
};

export default ContactUs;
