import React from "react";
import ChessPiece from "./ChessPiece";
import BoardSquare from "./BoardSquare";
import { connect } from "react-redux";
import "./App.css";
import { pipelineTopicExpression } from "@babel/types";
import { makeMove } from "./Game";
import { PLAYER_VS_PLAYER, WHITE_VS_COMPUTER, BLACK_VS_COMPUTER } from "./store";

const Board = props => {
    const { playMode, turn } = props;
    const squares = [];
    for (let i = 0; i < 64; i++) {
        const square = renderSquare(i, props.chessBoard, props.check, turn, props.checkMate, playMode);
        squares.push(square);
    }

    // if (playMode === WHITE_VS_COMPUTER && turn === "w") {

    // } else if (playMode === BLACK_VS_COMPUTER && turn === "b") {
    //     setTimeout(makeRandomMove, 5000);
    // }

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

function renderSquare(i, chessBoard, check, turn, checkMate) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const piece = chessBoard[y][x];
    // console.log("turn", turn);
    return (
        <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
            <BoardSquare x={x} y={y} >
                {piece ? <ChessPiece piece={piece} coordinates={[x, y]} check={check} turn={turn} checkMate={checkMate} /> : null}
            </BoardSquare>
        </div>
    );
}