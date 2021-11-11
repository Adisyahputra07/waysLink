import React from "react";
import Header from "./Headers.module.css";

export default function Headers(props) {
  const { name } = props;
  return <div className={Header.navbar}>{name}</div>;
}
