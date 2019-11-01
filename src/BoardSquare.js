import React, { useState } from "react";
import Square from "./Square";
import { isLegalMove, makeMove } from "./Game";
import { ItemTypes } from "./Constants";
import { DropSurface, over } from "./DragNDrop";
import Overlay from "./Overlay";
import { connect } from "react-redux";
// import { DisplayAsSolidColor, GlowEffect } from "./Shaders";

import OverlayBorder from "./chessImages/OverlayBorder.png";

function BoardSquare(props) {
    const black = (props.x + props.y) % 2 === 1;
    const className = black ? "black" : "white";
    const surface = { id: "" + props.x + props.y, coordinates: [props.x, props.y] };

    const [isOver, setIsOver] = useState(false);
    const [canDrop, setCanDrop] = useState(false);
    surface.setIsOver = setIsOver;
    surface.canDrop = (item, truthValue) => {
        setCanDrop(truthValue && isLegalMove(item.coordinates, [props.x, props.y]));

    };

    let overlay = null;
    if (isOver && !canDrop) {
        overlay = <Overlay color="red" opacity={.8} p />;
    } else if (!isOver && canDrop) {
        overlay = <Overlay color="yellow" opacity={.8} />;
    } else if (isOver && canDrop) {
        overlay = <Overlay color="aqua" opacity={.8} p />;
    }

    return (
        <DropSurface surface={surface}>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    textAlign: "center"
                }}
            >
                <Square className={className} black={black}>{props.children}</Square>
                {overlay}
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