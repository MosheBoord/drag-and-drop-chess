import "./index.css";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import { makeRandomMove } from "./Game";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
    (
        <Provider store={store}>
            <Board />
        </Provider>
    )
    , document.getElementById("root")
);

setInterval(() => {
    // makeRandomMove();
}, 750);

// makeRandomMove();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
