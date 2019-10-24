/* eslint-disable react/display-name */
import React from "react";

export function makeDraggable(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <div
                    ref={dragElement}
                    style={{
                        position: "absolute",
                        zIndex: 9999,
                    }}
                >
                    <WrappedComponent {...this.props} />
                </div >
            );
        }
    };
}

export function makeDragSurface(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <div
                    className={this.props.className}
                    ref={dragSurface}
                >
                    <WrappedComponent className={WrappedComponent.className} {...this.props} />
                </div >
            );
        }
    };
}


let element;

function dragSurface(elmnt) {
    elmnt.addEventListener("mouseover", () => {
        if (element) {
            if (elmnt.classList.contains("white")) {
                // element.style.color = "black";
            } else {
                // element.style.color = "white";
            }
        }
    });
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        elmnt.style.pointerEvents = "none";
        element = elmnt;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        element = null;
        elmnt.style.pointerEvents = "";
    }
}