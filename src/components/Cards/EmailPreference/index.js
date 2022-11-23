import React from "react";
import style from "./index.module.scss";

function EmailPrfereence({ title, desc }) {
  return (
    <div className={style.card_container}>
      <h6 className={style.card_title}>{title || "Title"}</h6>
      <p className={style.card_desc}>{desc || "Description..."}</p>
      <hr />
      <div className={style.card_group}>
        <FooterCard footer="Text" />
        <FooterCard footer="Image" />
        <FooterCard footer="Button" />
      </div>
    </div>
  );
}

const FooterCard = ({ footer }) => {
  return (
    <div className={style.footer_container}>
      <div className={style.footer_card}>Aa |</div>
      <span>{footer || "Footer"}</span>
    </div>
  );
};

export default EmailPrfereence;
