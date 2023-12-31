import React from "react";
import ReactDOM from "react-dom/client";
import Cesium from "./cesium"
import App from "./app";
import Menu from './menu'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Menu />
    <Cesium />
  </React.StrictMode>
);
