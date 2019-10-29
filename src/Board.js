import React from "react";
import ChessPiece from "./ChessPiece";
import BoardSquare from "./BoardSquare";
import { connect } from "react-redux";
import { isLegalMove, makeMove } from "./Game";

const Board = props => {
    const squares = [];
    for (let i = 0; i < 64; i++) {
        const square = renderSquare(i, props.chessBoard);
        squares.push(square);
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                border: "1px solid gray",
                margin: "5px"
            }}
        >
            {squares}
        </div>
    );

};

const mapStateToProps = state => ({
    ...state
});

const connectedBoard = connect(mapStateToProps)(Board);

export default connectedBoard;

function renderSquare(i, chessBoard) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const piece = chessBoard[y][x];
    return (
        <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
            <BoardSquare x={x} y={y} >
                {piece ? <ChessPiece piece={piece} coordinates={[x, y]} /> : null}
            </BoardSquare>
        </div>
    );
}