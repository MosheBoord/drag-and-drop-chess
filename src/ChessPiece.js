import React from "react";

import BlackPawn from "./chessImages/bP.png";
import BlackRook from "./chessImages/bR.png";
import BlackKnight from "./chessImages/bN.png";
import BlackBishop from "./chessImages/bB.png";
import BlackQueen from "./chessImages/bQ.png";
// import BlackQueen from "./chessImages/2x3.png";
import BlackKing from "./chessImages/bK.png";
import WhitePawn from "./chessImages/wP.png";
import WhiteRook from "./chessImages/wR.png";
import WhiteKnight from "./chessImages/wN.png";
import WhiteBishop from "./chessImages/wB.png";
import WhiteQueen from "./chessImages/wQ.png";
import WhiteKing from "./chessImages/wK.png";
import { Draggable } from "./DragNDrop";
import { ItemTypes } from "./Constants";

import { TransitionToSolidColor, GlowEffect } from "./Shaders";

function ChessPiece(props) {
    let src;
    let alt;
    let check = props.check;
    let turn = props.turn;
    let displayKingInCheck = false;
    let dragOnLegalSquare = false;
    let glow = false;

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
                if (check && turn === "w") {
                    displayKingInCheck = true;
                }
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
                // glow = true;
                break;
            case "k":
                src = BlackKing;
                alt = "black king";
                if (check && turn === "b") {
                    displayKingInCheck = true;
                }
                break;
            default:
        }
    }

    let piece = < img src={src} alt={alt} style={{
        width: "100%",
        height: "100%",
        display: "block",
    }} />;

    if (displayKingInCheck) {
        piece = <TransitionToSolidColor
            style={{
                display: "block",
            }}
            imgSrc={src}></TransitionToSolidColor>;
    }

    if (dragOnLegalSquare) {
        piece = <GlowEffect
            style={{
                display: "block",
            }}
            imgSrc={src}></GlowEffect>;
    }

    if (glow) {
        piece = <GlowEffect
            style={{
                display: "block",
            }}
            imgSrc={src}></GlowEffect>;
    }

    return (
        <Draggable item={{ type: ItemTypes.CHESS_PIECE, coordinates: props.coordinates }} >
            <div
                style={{
                    cursor: "move",
                }}
            >
                {piece}
            </div>
        </Draggable>
    );
}

export default ChessPiece;