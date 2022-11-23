import React from "react";

import NavHeader from "../Layout/PricingNavHeader/NavHeader";
import Footer from "../../components/Layout/Footer/Footer";

import style from "./PublicGenericLayout.module.scss";
import AuthModalForm from "../../Auth/AuthModalForm";

import Layout from "../../components/Layout";

const PublicGenericLayout = ({ children }) => {
  return (
    <Layout>
      <div className={`${style.layout} other__layout`}>
        <AuthModalForm component={NavHeader} />
      </div>
      {children}
      <Footer />
    </Layout>
  );
};

export default PublicGenericLayout;
