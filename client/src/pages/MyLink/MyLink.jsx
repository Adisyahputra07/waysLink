import React, { useContext, useEffect, useState } from "react";
import MyLinkCss from "./MyLink.module.css";
import { Form } from "react-bootstrap";
import { API } from "../../config/api";
import { useHistory } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import visit from "../../assets/View.png";
import deletes from "../../assets/Delete.png";
import edit from "../../assets/Edit.png";
import Headers from "../../components/NavBar/Headers";
import ModalPopUp from "../../components/ModalGroup/ModalPopUp/ModalPopUp";
import { UserContext } from "../../context/userContext";

export default function MyLink() {
  const [state, dispatch] = useContext(UserContext);

  const history = useHistory();
  const [search, setSearch] = useState([]);
  const [links, setLinks] = useState([]);
  const [action, setAction] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  let [idLink, setIdLink] = useState("");
  const getLinks = async () => {
    try {
      const response = await API.get(`/mylinks`);
      setLinks(response.data.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeLink = (e) => {
    setSearch(e.target.value);
  };

  const handleHide = () => {
    setModalShow(false);
  };

  const handleShow = (id) => {
    setModalShow(true);
    console.log(id);
    setIdLink(id);
  };

  const handleVisit = async (id) => {
    try {
      await API.patch(`/brand/${id}`);
      history.push(`/brand/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLinks();
  }, [state.isUpdate]);

  return (
    <div className={MyLinkCss.main}>
      <div>
        <SideBar />
      </div>
      <div className={MyLinkCss.content}>
        <Headers name="My Link" />
        <div>
          <div>
            <Form>
              <div className={MyLinkCss.contentMain}>
                <div className={`d-flex ${MyLinkCss.contenTitle}`}>
                  <h4> All links </h4>
                  <p>{links?.length}</p>
                </div>
                <Form.Group className={MyLinkCss.fromGroup}>
                  <Form.Control
                    className={MyLinkCss.fromGroupInput}
                    name="title"
                    onChange={handleChangeLink}
                  />
                </Form.Group>
              </div>
            </Form>
          </div>
          {links
            ?.filter((items) => {
              if (search == "") {
                return items;
              } else if (items?.title?.toLowerCase().includes(search.toLowerCase())) {
                return items;
              } else if (items?.link?.toLowerCase().includes(search.toLowerCase())) {
                return items;
              }
            })
            .map((item, idx) => {
              console.log(item);
              return (
                <div className={MyLinkCss.listLink} key={idx}>
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt="logoLink"
                    width="80px"
                    height="80px"
                  />
                  <div className={MyLinkCss.link}>
                    <h4>{item.title}</h4>
                    <span>{item.link}</span>
                  </div>
                  <div>
                    <h4>{item.links_id.viewCount}</h4>
                    <span>Visit</span>
                  </div>
                  <div>
                    <img
                      src={visit}
                      alt="visit"
                      className={MyLinkCss.action}
                      onClick={() => {
                        handleVisit(item.links_id.id);
                      }}
                    />
                    <img src={edit} alt="edit" className={MyLinkCss.action} />
                    <img
                      src={deletes}
                      alt="deletes"
                      className={MyLinkCss.action}
                      onClick={() => {
                        handleShow(item?.id);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <ModalPopUp show={modalShow} id={idLink} handleHidden={() => setModalShow(false)} />
    </div>
  );
}
