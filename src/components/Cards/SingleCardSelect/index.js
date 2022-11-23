import classNames from "classnames";
import { Modal } from "antd";
import React, { Children, cloneElement, useEffect, useState } from "react";
import { BiCheck, BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";
import { FaCheckSquare } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { VscCircleOutline } from "react-icons/vsc";
import { useHistory } from "react-router";
import style from "./index.module.scss";
import "./index.scss";

const SingleSelect = ({
  onChange,
  children,
  containerStyle,
  selectedDefaultItem,
}) => {
  const [isSelected, setSelected] = useState();

  const handleClick = (id, item) => {
    setSelected(id);
    if (onChange) {
      onChange(item, id);
    }
  };

  useEffect(() => {
    if (selectedDefaultItem) {
      setSelected(Number(selectedDefaultItem));
    }
  }, [selectedDefaultItem]);
  return (
    <div className={style.cardList_container} style={{ ...containerStyle }}>
      {Children.toArray(children).map((child, idx) => {
        const composedChildProps = {
          stepIndex: idx,
          key: idx,
          isSelected,
          childKey: child.props.position,
          cardClick: (id, item) => handleClick(id, item),
          ...child.props,
        };
        return cloneElement(child, composedChildProps);
      })}
    </div>
  );
};

export const SingleCard = ({
  cardClick,
  isSelected,
  title,
  childKey,
  stepIndex,
  prefixCls = "cardList_item",
  customStyle,
}) => {
  console.log("stepIndex", stepIndex);
  const classString = classNames(`${prefixCls}`, {
    [`${prefixCls}-mcard-item_selected`]: isSelected === stepIndex,
  });
  return (
    <div
      className={classString}
      onClick={() => cardClick(stepIndex, { id: childKey, title })}
    >
      <span className="" style={{ ...customStyle }}>
        {title}
      </span>
    </div>
  );
};
export const CardColor = ({
  cardClick,
  isSelected,
  title,
  childKey,
  stepIndex,
  prefixCls = "cardList_item",
  cardStyle,
}) => {
  const classString = classNames(`${prefixCls}`, {});
  return (
    <div
      className={classString}
      style={{ ...cardStyle }}
      onClick={() => cardClick(stepIndex, { id: childKey, title })}
    >
      <span className="single-title" style={{ backgroundColor: `${title}` }}>
        {isSelected === stepIndex && <BiCheck size={20} color="#fff" />}
      </span>
    </div>
  );
};
export const Card = ({
  prefixCls = "card-item",
  cardClick,
  isSelected,
  title,
  childKey,
  stepIndex,
  cardStyle,
  type,
  icon,
}) => {
  const classString = classNames(`${prefixCls}`, {
    [`${prefixCls}_selected`]: stepIndex === isSelected,
  });

  return (
    <div
      className={classString}
      onClick={() => cardClick(stepIndex, { id: childKey, title })}
      style={{ ...cardStyle }}
    >
      {icon && (
        <span className={`${prefixCls}_item_icon}`}>
          <icon.name size={icon.size} />
        </span>
      )}
      <span className={`${prefixCls}_item_title`}>{title}</span>
    </div>
  );
};
export const GenderCard = ({
  prefixCls = "gender-card-item",
  cardClick,
  isSelected,
  title,
  childKey,
  stepIndex,
  cardStyle,
  type,
  icon,
}) => {
  const classString = classNames(`${prefixCls}`, {
    [`${prefixCls}_selected`]: stepIndex === isSelected,
  });

  return (
    <div
      className={classString}
      onClick={() => cardClick(stepIndex, { id: childKey, title })}
      style={{ ...cardStyle }}
    >
      {icon && (
        <span className={`${prefixCls}_item_icon}`}>
          <icon.name size={icon.size} />
        </span>
      )}
      <span className={`${prefixCls}_item_title`}>{title}</span>
    </div>
  );
};

export const RadioCard = ({
  prefixCls = "radio-card-item",
  cardClick,
  isSelected,
  title,
  childKey,
  stepIndex,
  cardStyle,
  item,
  type,
  icon,
}) => {
  const classString = classNames(`${prefixCls}`, {
    [`${prefixCls}_selected`]: stepIndex === isSelected,
  });

  return (
    <div
      className={classString}
      onClick={() => cardClick(stepIndex, { id: childKey, title, ...item })}
      style={{ ...cardStyle }}
    >
      {stepIndex === isSelected ? (
        <span className="radio-card-item_icon">
          <BiRadioCircleMarked size={20} color="#0D974D" />
        </span>
      ) : (
        <span className="radio-card-item_icon">
          <BiRadioCircle size={20} />
        </span>
      )}

      <span className={`${prefixCls}_item_title`}>{title}</span>
    </div>
  );
};

export const BannerCardTemplate = ({
  prefixCls = "templateList",
  cardClick,
  isSelected,
  item,
  childKey,
  stepIndex,
  cardStyle,
  type,
  icon,
}) => {
  const classString = classNames(style.templateList, `${prefixCls}`, {
    [`${prefixCls}__selected`]: stepIndex === isSelected,
  });
  return (
    <div
      className={classString}
      key={item.id}
      onClick={() => cardClick(stepIndex, item)}
    >
      <div
        className={style.templateList_img}
        style={{
          backgroundImage:
            stepIndex === isSelected
              ? `linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
url(${item.bannerUrl})`
              : `linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
url(${item.bannerUrl})`,

          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className={style.templateList_content}>
        <h4 className={style.templateList_content_title}>{item.title}</h4>
        <p className={style.templateList_content_desc}>{item.description}</p>
      </div>
    </div>
  );
};

export const TicketPurchase = ({
  item,
  icon,
  cardClick,
  isSelected,
  prefixCls,
  childKey,
  cardStyle,
  stepIndex,
  url,
  price,
  customBaseClass,
}) => {
  const classString = classNames(`${style.resourceItem}`, {
    [`${style.resourceItem_selected}`]: isSelected === stepIndex,
  });
  const history = useHistory();

  const redirectToGallery = () => {
    cardClick(stepIndex, { idx: childKey, item });
    if (url) {
      history.push(`${url}`);
    }
  };
  return (
    <div
      className={classString}
      style={{ ...cardStyle }}
      onClick={redirectToGallery}
    >
      <div className={style.cardContent}>
        <span className={style.iconBox}>
          <VscCircleOutline size={18} className={style.radioBtn} />
        </span>
        <span className={style.resourceName}>{item.title}</span>
      </div>

      {item.price && (
        <span className={style.cardAmount}>
          {item.price > 0 ? item.price : "Free"}
        </span>
      )}
    </div>
  );
};

export const ToggleSelect = ({
  firstLabel,
  secondLabel,
  handleToggleSelect,
  userGender,
}) => {
  const [selected, setSelected] = useState(userGender);
  return (
    <div className={style.toggle_container}>
      <div
        className={
          selected === firstLabel || userGender === firstLabel
            ? style.toggle_box_active
            : style.toggle_box
        }
        onClick={() => {
          setSelected(firstLabel);
          handleToggleSelect(firstLabel);
        }}
      >
        {firstLabel}
      </div>
      <div
        className={
          selected === secondLabel || userGender === secondLabel
            ? style.toggle_box_active
            : style.toggle_box
        }
        onClick={() => {
          setSelected(secondLabel);
          handleToggleSelect(secondLabel);
        }}
      >
        {secondLabel}
      </div>
    </div>
  );
};

export const PollList = ({
  item,
  icon,
  cardClick,
  isSelected,
  prefixCls,
  childKey,
  cardStyle,
  stepIndex,
  url,
  price,
  customBaseClass,
}) => {
  const classString = classNames(`${style.pollList}`, {
    [`${style.resourceItem_selected}`]:
      isSelected === stepIndex && item.status !== "ended",
    disableSelect: item.status === "ended",
  });
  const history = useHistory();

  const redirectToGallery = () => {
    cardClick(stepIndex, { idx: childKey, item });
    if (url) {
      history.push(`${url}`);
    }
  };
  return (
    <div
      className={classString}
      style={{ ...cardStyle }}
      onClick={redirectToGallery}
    >
      <div className={style.cardContent}>
        <span className={style.iconBox}>
          <VscCircleOutline size={18} className={style.radioBtn} />
        </span>
        <span className={style.resourceName}>{item.title}</span>
      </div>

      {item.price && (
        <span className={style.cardAmount}>
          {item.price > 0 ? item.price : "Free"}
        </span>
      )}
    </div>
  );
};

export const ElectonRadioCard = ({
  prefixCls = "radio-card-item-election",
  cardClick,
  isSelected,
  title,
  childKey,
  stepIndex,
  cardStyle,
  item,
  type,
  icon,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const classString = classNames(`${prefixCls}`, {
    [`${prefixCls}_selected`]: stepIndex === isSelected,
  });

  const showMoreInfo = (e) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  return (
    <div
      className={classString}
      onClick={() => cardClick(stepIndex, { id: childKey, title, ...item })}
      style={{ ...cardStyle }}
    >
      <div className={`${prefixCls}_img_item_wrap`}>
        <img
          src={item.photo}
          alt={item.title}
          className={style.candidPhoto}
          onClick={showMoreInfo}
        />

        <span className={`${prefixCls}_item_title`}>{title}</span>
      </div>

      <button
        className="voteCandidVote"
        onClick={() => cardClick(stepIndex, { id: childKey, title, ...item })}
      >
        <span className="candidtext">Vote</span>
        {stepIndex === isSelected && (
          <span className="radio-card-item_icon">
            <FaCheckSquare size={18} color="#fff" />
          </span>
        )}
      </button>

      <Modal
        visible={openModal}
        header={null}
        closable={false}
        width={800}
        footer={null}
      >
        <div className={style.bioContainer}>
          <div className={style.header}>
            <div className={style.headerLeft}>About Candidate</div>
            <span
              className={style.headerRight}
              onClick={() => setOpenModal(false)}
            >
              <MdClose />
            </span>
          </div>
          <div className={style.bioBody}>
            <div className={style.bioBodyLeft}>
              <img src={item.photo} alt={title} className={style.candidFull} />
            </div>

            <div className={style.bioDesc}>
              <h4 className={style.candidTitle}>{title}</h4>
              <div className={style.candidBio}>{item.bio}</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SingleSelect;
