import React from "react";
import ChessPiece from "./ChessPiece";
import BoardSquare from "./BoardSquare";
import { connect } from "react-redux";
import "./App.css";
import { pipelineTopicExpression } from "@babel/types";
// import { isLegalMove, makeMove } from "./Game";

const Board = props => {
    const squares = [];
    for (let i = 0; i < 64; i++) {
        const square = renderSquare(i, props.chessBoard, props.check, props.turn);
        squares.push(square);
    }

    return (
        <div className="board-container">
            {squares}
        </div>
    );
};

const mapStateToProps = state => ({
    ...state
});

const connectedBoard = connect(mapStateToProps)(Board);

export default connectedBoard;

function renderSquare(i, chessBoard, check, turn) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const piece = chessBoard[y][x];
    // console.log("turn", turn);
    return (
        <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
            <BoardSquare x={x} y={y} >
                {piece ? <ChessPiece piece={piece} coordinates={[x, y]} check={check} turn={turn} /> : null}
            </BoardSquare>
        </div>
    );
}