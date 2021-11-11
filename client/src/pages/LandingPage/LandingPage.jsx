import React, { useState } from "react";
import LandingCss from "./LandingPage.module.css";
import { Col, Row } from "react-bootstrap";
import hp1 from "../../assets/phone1.png";
import pc from "../../assets/PC.png";
import logo from "../../assets/logo.svg";
//components
import Buttons from "../../components/Buttons/Buttons";
import ModalSignUp from "../../components/ModalGroup/ModalRegister/ModalRegister";
import ModalSignIn from "../../components/ModalGroup/ModalLogin/ModalLogin";

export default function LandingPage() {
  const [modalShow, setModalShow] = useState(false);
  const [modaSignInlShow, setModaSignInlShow] = useState(false);

  const showLoginHandle = () => {
    setModaSignInlShow(true);
    setModalShow(false);
  };

  const showRegisterHandle = () => {
    setModaSignInlShow(false);
    setModalShow(true);
  };

  return (
    <div className={`${LandingCss.bg}`}>
      <main>
        <div className={`container-fluid d-flex just justify-content-between ${LandingCss.navbar}`}>
          <img src={logo} alt="logo" width="111px" />
          <div className={`d-flex mt-3`}>
            <Buttons clicked={() => setModaSignInlShow(true)} btnName="Login" color="login" />
            <Buttons clicked={() => setModalShow(true)} btnName="Register" color="register" />
          </div>
        </div>
        <div className={`${LandingCss.main} d-flex`}>
          <Row>
            <Col className={`${LandingCss.title} `}>
              <h1>The Only Link </h1>
              <h1>You’ll Ever Need</h1>
              <p>
                Add a link for your Social Bio and optimize your <br /> social media traffic.
              </p>
              <p>safe, fast and easy to use</p>
              <div className={`${LandingCss.buttons} `}>
                <Buttons
                  clicked={() => setModalShow(true)}
                  btnName="Get Started For Free"
                  color="getStart"
                />
              </div>
            </Col>
            <Col className={`${LandingCss.img}`}>
              <img className={`${LandingCss.com}`} src={pc} alt="com" />
              <img className={`${LandingCss.hp}`} src={hp1} alt="hp" />
            </Col>
          </Row>
        </div>
      </main>
      <ModalSignUp show={modalShow} hide={() => setModalShow(false)} showLogin={showLoginHandle} />
      <ModalSignIn
        show={modaSignInlShow}
        hide={() => setModaSignInlShow(false)}
        showRegister={showRegisterHandle}
      />
    </div>
  );
}
