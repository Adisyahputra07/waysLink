import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../../config/api";
import BrandCss from "./Brand.module.css";
import { Button } from "react-bootstrap";

export default function Brand() {
  const [brand, setBrand] = useState({});
  const [links, setLinks] = useState([]);
  const history = useHistory();

  const path = `http://localhost:5000/uploads/`;
  const { id } = useParams();

  const resBrand = async () => {
    try {
      const response = await API.get(`/brand/${id}`);
      setBrand(response.data.data);
      setLinks(response.data.data.link_id);
      console.log(response.data.data.link_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    resBrand();
  }, []);

  return (
    <div className={`${BrandCss.content}`}>
      <div className={`${BrandCss.main}`}>
        <center>
          <img className={`${BrandCss.avatar}`} src={`${path}${brand?.image}`} alt="image" />
          <h3>{brand?.name}</h3>
          <p>{brand?.description}</p>
          {links.map((item) => (
            <div className={`${BrandCss.list}`}>
              <img src={`${path}${item.image}`} alt="image Link" />
              <div className={`${BrandCss.titel}`}>
                <a href={item.link} target="_blank">
                  {item.title}
                </a>
              </div>
              <hidden></hidden>
            </div>
          ))}
        </center>
      </div>
    </div>
  );
}
