import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { API } from "../../../config/api";
import { UserContext } from "../../../context/userContext";

export default function ModalPopUp(props) {
  let { show, id, handleHidden } = props;
  const [state, dispatch] = useContext(UserContext);

  const handleDelete = async (idLink) => {
    try {
      await API.delete(`/link/${idLink}`);
      dispatch({
        type: "UPDATE",
      });
      handleHidden();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleHidden}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="formContainer ">
          <h5 className="mb-3" style={{ color: "#469F74" }}>
            you are sure you want to remove this link
          </h5>
          <div className="d-flex justify-content-end">
            <Button
              className="mt-3"
              onClick={() => handleDelete(id)}
              style={{
                backgroundColor: "#FF0000",
                border: "none",
                width: "20%",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Yes
            </Button>
            <Button
              className="mt-3"
              onClick={handleHidden}
              style={{
                backgroundColor: "#E5E5E5",
                border: "none",
                width: "20%",
                marginLeft: "10px",
                borderRadius: "10px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
