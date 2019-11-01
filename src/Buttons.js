import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { undo, reset} from "./Game";

const Buttons = () =>  {
   return (
    <div className="buttonsContainer row">
        <div >
            <button onClick={undo}>Undo</button>
        </div>
        <div>
            <button onClick={reset}>Reset</button>
        </div>
    </div>
    
   )
}


export default Buttons
