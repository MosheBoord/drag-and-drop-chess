import React from "react";
import ChessPiece from "./ChessPiece";
import BoardSquare from "./BoardSquare";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

function renderSquare(i, boardState) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const piece = boardState[y][x];
    return (
        <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
            <BoardSquare x={x} y={y} >
                {piece ? <ChessPiece piece={piece} coordinates={[x, y]} /> : null}
            </BoardSquare>
        </div>
    );
}

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        const squares = [];
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
        return (
            <DndProvider backend={HTML5Backend}>
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
                    {this.renderSquares()}
                </div>
            </DndProvider>
        );
    }
}