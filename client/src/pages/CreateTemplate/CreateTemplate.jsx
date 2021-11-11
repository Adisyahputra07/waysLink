import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
// Components
import SideBar from "../../components/SideBar/SideBar";
import CreateTemplateCss from "./CreateTemplate.module.css";
import Headers from "../../components/NavBar/Headers";
import imgPreview from "../../assets/imgPreview.png";
import { Button, Form } from "react-bootstrap";
import phone1 from "../../assets/phone1.png";

export default function CreateTemplate() {
  const [state, dispatch] = useContext(UserContext);
  const [brand, setBrand] = useState([]);
  const history = useHistory();

  const [formLoop, setFormLoop] = useState([
    {
      imageLink: null,
      titleLink: "",
      link: "",
    },
  ]);
  const [itemBrand, setItemBrand] = useState({
    image: null,
    name: "",
    description: "",
  });
  const [itemLink, setItemLink] = useState([
    {
      image: null,
      title: "",
      link: "",
    },
  ]);

  const handleOnChangeBrand = (e) => {
    setItemBrand({
      ...itemBrand,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleOnChangeLink = (e, idx) => {
    setItemLink((prev) => {
      const itemLink = [...prev];
      if (e.target.name === "title") {
        itemLink[idx].title = e.target.value;
      } else if (e.target.name === "link") {
        itemLink[idx].link = e.target.value;
      } else if (e.target.name === "image") {
        itemLink[idx].image = e.target.files[0];
      }

      return itemLink;
    });
  };

  const handleAddLink = () => {
    setItemLink([
      ...itemLink,
      {
        image: null,
        title: "",
        link: "",
      },
    ]);
  };

  const addLinkBrand = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("name", itemBrand.name);
      formData.set("description", itemBrand.description);
      formData.set("imageBrand", itemBrand.image[0], itemBrand.image[0].name);
      // link
      itemLink.map((item) => {
        formData.append("title", item.title);
        formData.append("link", item.link);
        formData.append("imageLink", item.image);
      });

      console.log(formData);

      const res = await API.post("/addbrandlink", formData, config);

      dispatch({
        type: "UPDATE",
      });
      history.push("/my-link");
    } catch (error) {
      console.log(error);
      // create validasi
    }
  };

  return (
    <div className={CreateTemplateCss.main}>
      <div>
        <SideBar />
      </div>
      <div className={CreateTemplateCss.content}>
        <Headers name="Template" />
        <div className={CreateTemplateCss.headers}>
          <h3>Create Link</h3>
          <Button onClick={addLinkBrand}>Publish Link</Button>
        </div>
        <div className={CreateTemplateCss.contentMain}>
          <div className={CreateTemplateCss.contentForm}>
            <Form>
              <div>
                <div className="d-flex">
                  <div>
                    <img
                      src={
                        itemBrand.image === null
                          ? imgPreview
                          : URL.createObjectURL(itemBrand.image[0])
                      }
                      alt="Preview"
                      width="200px"
                      height="200px"
                    />
                  </div>
                  <Form.Group
                    className="mb-4"
                    style={{
                      width: "140px",
                      height: "30px",
                      marginTop: "35px",
                    }}
                  >
                    <div
                      className=" uploadForm mb-5  d-flex"
                      style={{
                        backgroundColor: "#ff9f00",
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "40px",
                        lineHeight: "30px",
                        color: "white",
                        width: "80px",
                        borderRadius: "8px",
                      }}
                    >
                      <label htmlFor="uploadBrand">
                        <b>Upload</b>
                      </label>
                      <input
                        required
                        type="file"
                        hidden
                        id="uploadBrand"
                        name="image"
                        style={{ color: "#e5e5e5" }}
                        onChange={handleOnChangeBrand}
                      />
                    </div>
                  </Form.Group>
                </div>
                <Form.Group className={CreateTemplateCss.fromGroup}>
                  <Form.Label className={CreateTemplateCss.fromGroupLabel}>Title</Form.Label>
                  <Form.Control
                    className={CreateTemplateCss.fromGroupInput}
                    name="name"
                    onChange={handleOnChangeBrand}
                    placeholder="ex.Your Title"
                  />
                </Form.Group>
                <Form.Group className={CreateTemplateCss.fromGroup}>
                  <Form.Label className={CreateTemplateCss.fromGroupLabel}>Description</Form.Label>
                  <Form.Control
                    className={CreateTemplateCss.fromGroupInput}
                    type="email"
                    name="description"
                    onChange={handleOnChangeBrand}
                    placeholder="ex.Description Here"
                  />
                </Form.Group>
              </div>
            </Form>
            {/* This is Add Link */}
            {itemLink.map((item, idx) => (
              <div className={CreateTemplateCss.contentFormLink}>
                <Form>
                  <div className="d-flex">
                    <div style={{ marginTop: "40px" }}>
                      <label htmlFor={`upload${idx}`}>
                        <img
                          src={item.image === null ? imgPreview : URL.createObjectURL(item.image)}
                          alt="upload"
                          width="120px"
                          height="120px"
                        />
                      </label>
                      <input
                        required
                        type="file"
                        hidden
                        id={`upload${idx}`}
                        name="image"
                        onChange={(e) => handleOnChangeLink(e, idx)}
                      />
                    </div>
                    <div className={CreateTemplateCss.fromGroupMain}>
                      <Form.Group className={CreateTemplateCss.fromGroup}>
                        <Form.Label className={CreateTemplateCss.fromGroupLabel}>
                          Title Link
                        </Form.Label>
                        <Form.Control
                          className={CreateTemplateCss.fromGroupLink}
                          name="title"
                          onChange={(e) => handleOnChangeLink(e, idx)}
                          placeholder="ex.Title Link"
                        />
                      </Form.Group>
                      <Form.Group className={CreateTemplateCss.fromGroup}>
                        <Form.Label className={CreateTemplateCss.fromGroupLabel}>Link</Form.Label>
                        <Form.Control
                          className={CreateTemplateCss.fromGroupLink}
                          placeholder="ex.https://example.com"
                          pattern="https://.*"
                          size="30"
                          name="link"
                          required
                          onChange={(e) => handleOnChangeLink(e, idx)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </Form>
              </div>
            ))}
            <div className={CreateTemplateCss.fromGroupButtons}>
              <Button
                onClick={handleAddLink}
                className={CreateTemplateCss.fromGroupButton}
                style={{ backgroundColor: "#ff9f00" }}
              >
                Add New Link
              </Button>
            </div>
          </div>
          <div className={CreateTemplateCss.contentTemplate}>
            <img className={CreateTemplateCss.template} src={phone1} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
