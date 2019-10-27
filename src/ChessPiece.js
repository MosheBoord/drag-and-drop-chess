import React from "react";
import { makeDraggable, Draggable } from "./DragNDrop";
// import what from "../public/chessImages/"
import BlackPawn from "./chessImages/bP.png";
import BlackRook from "./chessImages/bR.png";
import BlackKnight from "./chessImages/bN.png";
import BlackBishop from "./chessImages/bB.png";
import BlackQueen from "./chessImages/bQ.png";
import BlackKing from "./chessImages/bK.png";
import WhitePawn from "./chessImages/wP.png";
import WhiteRook from "./chessImages/wR.png";
import WhiteKnight from "./chessImages/wN.png";
import WhiteBishop from "./chessImages/wB.png";
import WhiteQueen from "./chessImages/wQ.png";
import WhiteKing from "./chessImages/wK.png";

function ChessPiece(props) {
    if (props.piece === null) {
        return null;
    }

    let piece;
    if (props.piece.color === "w") {
        switch (props.piece.type) {
            case "p":
                // piece = <img src={img} />;
                piece = <img src={WhitePawn} width="50" height="50" />;
                break;
            case "r":
                piece = <img src={WhiteRook} width="50" height="50" />;
                break;
            case "n":
                piece = <img src={WhiteKnight} width="50" height="50" />;
                break;
            case "b":
                piece = <img src={WhiteBishop} width="50" height="50" />;
                break;
            case "q":
                piece = <img src={WhiteQueen} width="50" height="50" />;
                break;
            case "k":
                piece = <img src={WhiteKing} width="50" height="50" />;
                break;
            default:
                return null;
        }
    } else {
        switch (props.piece.type) {
            case "p":
                // piece = <img src={img} />;
                piece = <img src={BlackPawn} width="50" height="50" />;
                break;
            case "r":
                piece = <img src={BlackRook} width="50" height="50" />;
                break;
            case "n":
                piece = <img src={BlackKnight} width="50" height="50" />;
                break;
            case "b":
                piece = <img src={BlackBishop} width="50" height="50" />;
                break;
            case "q":
                piece = <img src={BlackQueen} width="50" height="50" />;
                break;
            case "k":
                piece = <img src={BlackKing} width="50" height="50" />;
                break;
            default:
                return null;
        }
    }

    return (
        <Draggable>
            <div
                style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    cursor: "move",
                }}
            >
                {piece}
            </div>
        </Draggable>
    );
}

// const wrapper = new Wrapper(ChessPiece);
// const wrappedChessPiece = wrapper.wrapWith(makeDraggable);

// export default wrappedChessPiece;
export default ChessPiece;