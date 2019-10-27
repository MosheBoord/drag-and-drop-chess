import React from "react";
import { makeDraggable } from "./DragNDrop";
import Wrapper from "./Wrapper";

function ChessPiece(props) {
    if (props.piece === null) {
        return null;
    }

    let color;
    if (props.piece.color === "w") {
        // color = "red";
    } else {
        // color = "yellow";
    }

    let piece;
    switch (props.piece.type) {
        case "p":
            piece = "♙";
            break;
        case "r":
            piece = "♖";
            break;
        case "n":
            piece = "♘";
            break;
        case "b":
            piece = "♗";
            break;
        case "q":
            piece = "♕";
            break;
        case "k":
            piece = "♔";
            break;
        default:
            return null;
    }

    return (
        <div
            style={{
                fontSize: 25,
                fontWeight: "bold",
                cursor: "move",
                color,
            }}
        >
            {piece}
        </div>
    );
}

const wrapper = new Wrapper(ChessPiece);
const wrappedChessPiece = wrapper.wrapWith(makeDraggable);

export default wrappedChessPiece;