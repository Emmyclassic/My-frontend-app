import classNames from "classnames";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TiTimes } from "react-icons/ti";
import style from "./index.module.scss";

const Search = ({
  inputSearchStyle,
  containerStyle,
  iconBoxStyle,
  handleChange,
  icon: Icon,
  placeholder,
  showCancelButton = true,
}) => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const onChange = (e) => {
    const { value: nextPhrase } = e.target;
    setSearchPhrase(nextPhrase);
    if (handleChange) {
      handleChange(nextPhrase);
    }
  };
  return (
    <div className={style.leftContainer} style={{ ...containerStyle }}>
      <div
        className={classNames(`${style.inputSearch}`, {
          [`${style.showInput}`]: toggleSearch,
        })}
        // style={{ ...inputSearchStyle }}
      >
        {showCancelButton && (
          <span
            className={style.iconBoxCancel}
            onClick={() => setToggleSearch((prev) => !prev)}
          >
            <TiTimes className={style.iconCancel} size={18} />
          </span>
        )}
        <div className={style.searchInputBox}>
          <input
            placeholder={placeholder || "search"}
            value={searchPhrase}
            className={style.searchInput}
            onChange={onChange}
            style={{ ...inputSearchStyle }}
          />
        </div>
      </div>
      {Icon ? (
        <Icon toggleInput={() => setToggleSearch((prev) => !prev)} />
      ) : (
        <span
          className={style.iconBox}
          onClick={() => setToggleSearch((prev) => !prev)}
          style={{ ...iconBoxStyle }}
        >
          <FiSearch className={style.iconSearch} size={20} />
        </span>
      )}
    </div>
  );
};

export default Search;
