import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ThemeProvider } from "styled-components";
import "./reset.css";

const theme = {
  colors: {
    primary_300: "#ff0000",
    primary_600: "#dd0000",
    primary_900: "#yy0000",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
