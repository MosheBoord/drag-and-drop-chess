import React from "react";

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
import { Draggable } from "./DragNDrop";
import { ItemTypes } from "./Constants";

import { TransitionToSolidColor } from "./Shaders";

function ChessPiece(props) {
    let src;
    let alt;
    let check = false;
    if (props.piece.color === "w") {
        switch (props.piece.type) {
            case "p":
                src = WhitePawn;
                alt = "white pawn";
                break;
            case "r":
                src = WhiteRook;
                alt = "white rook";
                break;
            case "n":
                src = WhiteKnight;
                alt = "white knight";
                break;
            case "b":
                src = WhiteBishop;
                alt = "white bishop";
                break;
            case "q":
                src = WhiteQueen;
                alt = "white queen";
                break;
            case "k":
                src = WhiteKing;
                alt = "white king";
                check = true;
                break;
            default:
        }
    } else {
        switch (props.piece.type) {
            case "p":
                src = BlackPawn;
                alt = "black pawn";
                break;
            case "r":
                src = BlackRook;
                alt = "black rook";
                break;
            case "n":
                src = BlackKnight;
                alt = "black knight";
                break;
            case "b":
                src = BlackBishop;
                alt = "black bishop";
                break;
            case "q":
                src = BlackQueen;
                alt = "black queen";
                break;
            case "k":
                src = BlackKing;
                alt = "black king";
                break;
            default:
        }
    }

    let piece = < img src={src} alt={alt} style={{
        // textAlign: "center",
        width: "100%",
        height: "100%",
        display: "block",
        // margin: "auto",
        // position: "relative",
    }} />;


    //     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    //     "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    //     sans-serif;
    // -webkit-font-smoothing: antialiased;
    // text-align: center;
    // color: white;
    // cursor: move;
    // width: 100%;
    // height: 100%;
    // display: block;


    // font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    // "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    // sans-serif;
    // -webkit-font-smoothing: antialiased;
    // text-align: center;
    // color: black;
    // cursor: move;
    // width: 100%;
    // height: 100%;
    // display: block;






    if (check) {
        piece = <TransitionToSolidColor
            style={{
                // textAlign: "center",
                // position: "relative",
                // width: "100%",
                // height: "100%",
                display: "block",
                // margin: "auto",
            }}
            imgSrc={src}></TransitionToSolidColor>;
    }

    return (
        <Draggable item={{ type: ItemTypes.CHESS_PIECE, coordinates: props.coordinates }} >
            <div
                style={{
                    // fontSize: 25,
                    // fontWeight: "bold",
                    cursor: "move",
                }}
            >
                {piece}
            </div>
        </Draggable>
    );
}

export default ChessPiece;