import { Tooltip } from "antd";
import React from "react";
import { FiEdit, FiMoreVertical } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { ApLogo } from "../../ApemLogo/ApemsLogo";
import style from "./EventCard.module.scss";

const EventCards = ({
  url,
  style: containerStyle,
  date,
  title,
  bannerUrl,
  logoUrl,
  item,
  showMenu,
}) => {
  const history = useHistory();
  const dStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bannerUrl})`,
    ...containerStyle,
  };

  const text = (
    <div
      className={style.promptBox}
      onClick={() => history.push(`/EventSummary/${item.id}`)}
    >
      <span>
        <FiEdit />
      </span>
      <span>Create new event using this setup</span>
    </div>
  );
  return (
    <div
      className={style.event__list__card}
      style={dStyle}
      onClick={() => history.push(`${url}`)}
    >
      <div className={style.card__top__logo}>
        <ApLogo
          logoUrl={logoUrl}
          customStyle={{ width: "100%", height: "100%", borderRadius: "50%" }}
          containerStyle={{
            alignItem: "center",
            display: "flex",
            justifyContent: "center",
            order: -1,
          }}
        />
      </div>

      <div className={style.card__bottom}>
        {/* <button className={style.btn__small}>{props.price}</button> */}
        <h6
          className={style.card__bottom__caption}
          onClick={() => history.push(`${url}`)}
        >
          {title}
        </h6>
        {showMenu && (
          <div className={style.card_left}>
            <span className={style.card__bottom__date}>{date}</span>
            <Tooltip
              placement="topRight"
              title={text}
              color="#fff"
              arrowPointAtCenter={true}
              overlayStyle={{ borderRadius: "60px" }}
            >
              <span
                className={style.card_right}
                onClick={() => history.push(`${url}`)}
              >
                <FiMoreVertical color="#fff" size={19} />
              </span>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCards;
