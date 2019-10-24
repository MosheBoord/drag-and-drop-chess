import React from "react";
import ChessPiece from "./ChessPiece";
import BoardSquare from "./BoardSquare";

function renderSquare(i, boardState) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
        <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
            <BoardSquare x={x} y={y} >
                <ChessPiece piece={boardState[y][x]} />
            </BoardSquare>
        </div>
    );
}

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        const squares = [];
        for (let i = 0; i < 64; i++) {
            const square = renderSquare(i, this.props.boardState);
            squares.push(square);
        }
        this.state = {
            squares
        };
        this.renderSquares = this.renderSquares.bind(this);
    }

    renderSquares() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            const square = renderSquare(i, this.props.boardState);
            squares.push(square);
        }
        return squares;
    }

    render() {
        return <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                border: "1px solid gray",
                margin: "5px"
            }}
        >
            {this.renderSquares()}
        </div>;
    }
}