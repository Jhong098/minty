import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Routes from "./Routes";
import AppBar from "../components/AppBar";

export default () => (
  <BrowserRouter>
    <AppBar />
    {renderRoutes(Routes)}
  </BrowserRouter>
);
