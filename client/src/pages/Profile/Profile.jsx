import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ProfileCss from "./Profile.module.css";
import SideBar from "../../components/SideBar/SideBar";
import Headers from "../../components/NavBar/Headers";

export default function Profile() {
  const [state, dispatch] = useContext(UserContext);
  const [user, setUser] = useState([]);
  const history = useHistory();
  const [dataForm, setDataForm] = useState({
    email: state.user.findOneUser.email,
    fullName: state.user.findOneUser.fullName,
  });

  const handleOnChanges = (e) => {
    if (e.target.name == "email") {
      setDataForm({ ...dataForm, email: e.target.value });
    }

    if (e.target.name == "fullName") {
      setDataForm({ ...dataForm, fullName: e.target.value });
    }
  };

  const handleEdit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await API.patch(`/profile`, dataForm, config);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Oke
  const handleDelete = async () => {
    try {
      await API.delete(`/user`);
      console.log("sukses delete");

      dispatch({
        type: "LOGOUT",
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={ProfileCss.main}>
      <div>
        <SideBar />
      </div>
      <div className={ProfileCss.content}>
        <Headers name="My Account" />
        <div className={ProfileCss.contentMain}>
          <h3>
            <b>My Information</b>
          </h3>
          <Form>
            <div className={ProfileCss.contentForm}>
              <Form.Group className={ProfileCss.fromGroup}>
                <Form.Label className={ProfileCss.fromGroupLabel}>Name</Form.Label>
                <Form.Control
                  name="fullName"
                  className={ProfileCss.fromGroupInput}
                  onChange={(e) => {
                    handleOnChanges(e);
                  }}
                  value={dataForm.fullName}
                />
              </Form.Group>
              <Form.Group className={ProfileCss.fromGroup}>
                <Form.Label className={ProfileCss.fromGroupLabel}>Email</Form.Label>
                <Form.Control
                  name="email"
                  className={ProfileCss.fromGroupInput}
                  type="email"
                  onChange={(e) => {
                    handleOnChanges(e);
                  }}
                  value={dataForm.email}
                />
              </Form.Group>
            </div>
            <div className={ProfileCss.fromGroupButtons}>
              <Button
                className={ProfileCss.fromGroupButton}
                style={{ backgroundColor: "#ff9f00" }}
                onClick={handleEdit}
              >
                Save Account
              </Button>
              <Button
                className={ProfileCss.fromGroupButton}
                style={{ backgroundColor: "#FF0000" }}
                onClick={handleDelete}
              >
                Dalete Account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
