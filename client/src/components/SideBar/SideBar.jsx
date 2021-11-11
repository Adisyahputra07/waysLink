import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../context/userContext";
import HomeCss from "./SideBar.module.css";
import ModalLogout from "../ModalGroup/ModalLogout/ModalLogout";
import iconLogout from "../../assets/logout.svg";
import iconLogo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { FaCubes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsLink45Deg } from "react-icons/bs";

export default function SideBar(props) {
  const [state, dispatch] = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  console.log(state);

  return (
    <div>
      <div className={HomeCss.sideBar}>
        <div className={HomeCss.sideBar1}>
          <div className={HomeCss.iconSideBar}>
            <div onClick={() => history.push("/home")} className="logoIcon">
              <img src={iconLogo} alt="icon-jumbotron" />
            </div>
          </div>
        </div>
        <div className={HomeCss.navGroup}>
          <div className={HomeCss.navGroupSideBar}>
            <div className={HomeCss.navLinkSideBar}>
              <NavLink
                to="/home"
                style={{ color: "#000000", textDecoration: "none" }}
                activeStyle={{ color: "#FF9F00", textDecoration: "none" }}
              >
                <FaCubes size="1.7em" />

                <span>Template</span>
              </NavLink>
            </div>

            <div className={HomeCss.navLinkSideBar}>
              <NavLink
                to="/profile"
                style={{ color: "#000000", textDecoration: "none" }}
                activeStyle={{ color: "#FF9F00", textDecoration: "none" }}
              >
                <CgProfile size="1.7em" />
                <span>Profile</span>
              </NavLink>
            </div>
            <div onClick={() => history.push("/my-link")} className={HomeCss.navLinkSideBar}>
              <NavLink
                to="/my-link"
                style={{ color: "#000000", textDecoration: "none" }}
                activeStyle={{ color: "#FF9F00", textDecoration: "none" }}
              >
                <BsLink45Deg size="1.7em" />
                <span>My Link</span>
              </NavLink>
            </div>
          </div>
          <div className={HomeCss.navLogoutSideBar}>
            <div className={HomeCss.navLinkSideBar} onClick={() => setModalShow(true)}>
              <img src={iconLogout} alt="iconMyLink" />
              <span className={HomeCss.cursor}>Logout</span>
            </div>
          </div>
        </div>
      </div>
      <ModalLogout show={modalShow} hide={() => setModalShow(false)} />
    </div>
  );
}
