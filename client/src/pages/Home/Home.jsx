import React from "react";
import { useHistory } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import HomeCss from "./Home.module.css";
import Headers from "../../components/NavBar/Headers";
import phone1 from "../../assets/phone1.png";
import phone2 from "../../assets/phone2.png";
import phone3 from "../../assets/phone3.png";
import phone4 from "../../assets/phone4.png";
import { Row, Col } from "react-bootstrap";

export default function Home() {
  const history = useHistory();

  return (
    <div className={HomeCss.main}>
      <div>
        <SideBar />
      </div>
      <div className={HomeCss.content}>
        <Headers name="Template" />
        <Row>
          <div className={HomeCss.main}>
            <Col md={3}>
              <img
                className={HomeCss.hp}
                onClick={() => history.push(`/create-template`)}
                src={phone1}
                alt="iconHP"
              />
            </Col>
            <Col md={3}>
              <img
                className={HomeCss.hp}
                onClick={() => history.push(`/create-template`)}
                src={phone2}
                alt="iconHP"
              />
            </Col>
            <Col md={3}>
              <img
                className={HomeCss.hp}
                onClick={() => history.push(`/create-template`)}
                src={phone3}
                alt="iconHP"
              />
            </Col>
            <Col md={3}>
              <img
                className={HomeCss.hp}
                onClick={() => history.push(`/create-template`)}
                src={phone4}
                alt="iconHP"
              />
            </Col>
          </div>
        </Row>
      </div>
    </div>
  );
}
