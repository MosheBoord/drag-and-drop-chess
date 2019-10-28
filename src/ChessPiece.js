import React, { useEffect } from "react";
import { ItemTypes } from "./Constants";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
// import CustomDragLayer from "./CustomDragLayer";

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

    let piece;
    if (props.piece.color === "w") {
        switch (props.piece.type) {
            case "p":
                piece = <img src={WhitePawn} width="50" height="50" alt="white pawn" />;
                break;
            case "r":
                piece = <img src={WhiteRook} width="50" height="50" alt="white rook" />;
                break;
            case "n":
                piece = <img src={WhiteKnight} width="50" height="50" alt="white knight" />;
                break;
            case "b":
                piece = <img src={WhiteBishop} width="50" height="50" alt="white bishop" />;
                break;
            case "q":
                piece = <img src={WhiteQueen} width="50" height="50" alt="white queen" />;
                break;
            case "k":
                piece = <img src={WhiteKing} width="50" height="50" alt="white king" />;
                break;
            default:
                piece = null;
        }
    } else {
        switch (props.piece.type) {
            case "p":
                piece = <img src={BlackPawn} width="50" height="50" alt="black pawn" />;
                break;
            case "r":
                piece = <img src={BlackRook} width="50" height="50" alt="black rook" />;
                break;
            case "n":
                piece = <img src={BlackKnight} width="50" height="50" alt="black knight" />;
                break;
            case "b":
                piece = <img src={BlackBishop} width="50" height="50" alt="black bishop" />;
                break;
            case "q":
                piece = <img src={BlackQueen} width="50" height="50" alt="black queen" />;
                break;
            case "k":
                piece = <img src={BlackKing} width="50" height="50" alt="black king" />;
                break;
            default:
                piece = null;
        }
    }

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.CHESS_PIECE, coordinates: props.coordinates },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // useEffect(() => {
    //     preview(getEmptyImage(), { captureDraggingState: true });
    // }, []);

    return (
        <div
            ref={drag}
            style={{
                fontSize: 25,
                fontWeight: "bold",
                cursor: "move",
            }}
        >
            {piece}
        </div>
    );
}

// const wrapper = new Wrapper(ChessPiece);
// const wrappedChessPiece = wrapper.wrapWith(makeDraggable);

// export default wrappedChessPiece;
export default ChessPiece;