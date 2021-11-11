import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { UserContext } from "../../../context/userContext";

function ModalLogout(props) {
  const { show, hide } = props;

  const [state, dispatch] = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
  };
  return (
    <div>
      <Modal show={show} onHide={hide} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="formContainer ">
          <h5 className="mb-3">Are You Sure Logout</h5>
          <Button
            className="mt-3"
            onClick={handleLogout}
            style={{ backgroundColor: "#ff9f00", border: "none" }}
          >
            Logout
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalLogout;
