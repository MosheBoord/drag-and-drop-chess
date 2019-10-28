import React from "react";
import Square from "./Square";
import { isLegalMove, makeMove } from "./Game";
import { ItemTypes } from "./Constants";
import { useDrop } from "react-dnd";
import Overlay from "./Overlay";
import CustomDragLayer from "./CustomDragLayer";

function BoardSquare({ x, y, children }) {
    const black = (x + y) % 2 === 1;
    const className = black ? "black" : "white";

    const [{ isOver, canDrop, item }, drop] = useDrop({
        accept: ItemTypes.CHESS_PIECE,
        canDrop: () => isLegalMove(x, y),
        drop: () => makeMove(item.coordinates, [x, y]),
        collect: monitor => ({
            item: monitor.getItem(),
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <div
            ref={drop}
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