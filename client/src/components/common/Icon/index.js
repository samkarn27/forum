import React from "react";
import PropTypes from "prop-types";
//import "svgxuse";
import classNames from "../../../utils/class-names";
import SVGSTORE_PATH from "../../../utils/svgstore-path";

const Icon = ({ className, icon, style }) => {
  const iconClassName = classNames(Icon.displayName, className);

  return (
    <svg
      className={`${iconClassName}`}
      name={`icon-${icon}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      focusable={false}
      style={style}
    >
      <use xlinkHref={`${SVGSTORE_PATH}#${icon}`} />
    </svg>
  );
};

Icon.displayName = "Icon";

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Icon.defaultProps = {
  className: "",
  style: {},
};

export default Icon;
