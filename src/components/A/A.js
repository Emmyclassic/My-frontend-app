import cx from "classnames";
import proTypes from "prop-types";
import React, { Children } from "react";
import { Link } from "react-router-dom";
import style from "./A.module.scss";

const A = (props) => {
  const className = cx(style.navLink, props.customStyle);

  let buttons = (
    <Link className={className} to={`${props.href || ""}`}>
      {Children.toArray(props.children)}
    </Link>
  );

  if (props.handleRoute) {
    buttons = (
      <Link className={className} to="#" onClick={props.handleRoute}>
        {Children.toArray(props.children)}
      </Link>
    );
  }
  return <>{buttons}</>;
};

A.proTypes = {
  handleRoute: proTypes.func,
  href: proTypes.string,
  children: proTypes.node.isRequired,
  customStyle: proTypes.array,
};

export default A;
