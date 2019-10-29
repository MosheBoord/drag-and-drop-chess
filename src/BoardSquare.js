import React, { useState } from "react";
import Square from "./Square";
import { isLegalMove, makeMove } from "./Game";
import { ItemTypes } from "./Constants";
import { DropSurface, over } from "./DragNDrop";
import Overlay from "./Overlay";
import { connect } from "react-redux";

function BoardSquare(props) {
    const black = (props.x + props.y) % 2 === 1;
    const className = black ? "black" : "white";
    const surface = { id: "" + props.x + props.y, coordinates: [props.x, props.y] };

    const [isOver, setIsOver] = useState(false);
    surface.setIsOver = setIsOver;

    return (
        <DropSurface surface={surface}>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Square className={className} black={black}>{props.children}</Square>
                {/* {isOver && !canDrop && <Overlay color="red" />}
                    {!isOver && canDrop && <Overlay color="yellow" />} */}
                {isOver && <Overlay color="yellow" />}
            </div>
        </DropSurface>
    );
}

const mapStateToProps = state => ({
    dragIsOver: state.dragIsOver,
    draggedItem: state.draggedItem
});

const connectedBoardSquare = connect(mapStateToProps)(BoardSquare);

export default connectedBoardSquare;