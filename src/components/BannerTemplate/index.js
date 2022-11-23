import { Tabs } from "antd";
import React from "react";
import { template } from "../../constants/statics";
import SingleSelect, { BannerCardTemplate } from "../Cards/SingleCardSelect";
import style from "./index.module.scss";

const { TabPane } = Tabs;

const BannerTemplate = ({
  handleBannerTemplate,
  closeTemplate,
  defaultBannerUrl,
}) => {
  return (
    <div className={style.templateContainer}>
      <h3 className={style.templateContainer_title}>
        Select a Banner Template
      </h3>
      <div className={style.templateContainer_content}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab="AGM Banner Templates"
            key="1"
            className={style.tabStyle}
          >
            <SingleSelect
              onChange={handleBannerTemplate}
              selectedDefaultItem={0}
              containerStyle={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "3rem",
                justifyContent: "start",
              }}
            >
              {template.map((item) => (
                <BannerCardTemplate item={item} key={item.id} />
              ))}
            </SingleSelect>
          </TabPane>
        </Tabs>
      </div>
      <div className={style.template_footer}>
        <button
          onClick={closeTemplate}
          type="button"
          className={`${style.template_contBtd} ${
            defaultBannerUrl
              ? style.template_contBtd_danger
              : style.template_contBtd
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BannerTemplate;
