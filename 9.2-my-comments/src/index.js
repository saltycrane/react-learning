require("./style.scss");

import React from "react";
import ReactDOM from "react-dom";

import Root from "./containers/Root";


// ReactDOM.render(
//     <Root />,
//     document.getElementById("root")
// );
const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(
    <Root />,
    root
);
