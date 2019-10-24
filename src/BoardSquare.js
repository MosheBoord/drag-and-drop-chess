import React from "react";
import Square from "./Square";

function BoardSquare({ x, y, children }) {
    const black = (x + y) % 2 === 1;
    const className = black ? "black" : "white";
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}
        >
            <Square className={className} black={black}>{children}</Square>
        </div>
    );
}

export default BoardSquare;