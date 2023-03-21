import React from "react";
import { slide as BurgerMenu } from "react-burger-menu";
import PropTypes from "prop-types";

function StyledBurgerMenu(props) {
  return (
    <div>
      <BurgerMenu isOpen={props.isSidebar}></BurgerMenu>
    </div>
  );
}

export default StyledBurgerMenu;

StyledBurgerMenu.propTypes = {
  isSidebarOpen: PropTypes.bool,
};
