import "./index.css";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import { observe, makeRandomMove } from "./Game";

const root = document.getElementById("root");

observe(boardState => {
    ReactDOM.render(<Board boardState={boardState} />, root);
});

setInterval(() => {
    // makeRandomMove();
}, 750);

// makeRandomMove();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
