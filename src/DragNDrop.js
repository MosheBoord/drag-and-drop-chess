/* eslint-disable react/display-name */
import React from "react";

// const dragAndDropManager = new dragAndDropManager();
const dragAndDropManager = {
    draggedItem: null,
    draggableItems: [],
    dragSurfaces: [],
    dropSurfaces: [],
}

class DraggableItem {
    constructor(type = "") {
        this.type = type;
        this.el = null;
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
        this.setRef = this.setRef.bind(this);
        this.dragMouseDown = this.dragMouseDown.bind(this);
        this.elementDrag = this.elementDrag.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
    }

    setRef(el) {
        if (el) {
            this.el = el;

            for (let i = 0; i < dragAndDropManager.draggableItems.length; i++) {
                if (dragAndDropManager.draggableItems[i].el === el) {
                    return
                }
            }

            dragAndDropManager.draggableItems.push(this);
            this.el.onmousedown = this.dragMouseDown;
        }
    }

    dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag;
        this.el.style.pointerEvents = "none";
        // element = el;
        dragAndDropManager.draggedItem = this;
    }

    elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        // set the element's new position:
        this.el.style.top = (this.el.offsetTop - this.pos2) + "px";
        this.el.style.left = (this.el.offsetLeft - this.pos1) + "px";
    }

    closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        // element = null;
        dragAndDropManager.draggedItem = null;
        this.el.style.pointerEvents = "";
    }

    dragElement() {

    }
}

export class DragAndDropProvider extends React.Component {
    render() {
        return this.props.children;
    }
}

export function useDrag() {
    const dragItem = new DraggableItem();
    // dragAndDropManager.draggableItems.push(dragItem);
    return dragItem.setRef;
}

export function useDragSurface() {

}

export function useDropSurface() {

}



export function makeDraggable(WrappedComponent) {
    return class extends React.Component {
        render() {
            const refFunc = useDrag();
            return (
                <div
                    ref={refFunc}
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


// let element;

function dragSurface(elmnt) {
    if (elmnt) {
        elmnt.addEventListener("mouseover", () => {
            if (dragAndDropManager.draggedItem) {
                if (elmnt.classList.contains("white")) {
                    dragAndDropManager.draggedItem.el.style.color = "black";
                } else {
                    dragAndDropManager.draggedItem.el.style.color = "white";
                }
            }
        });
    }
}


// function dragElement(elmnt) {
//     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

//     elmnt.onmousedown = dragMouseDown;

//     function dragMouseDown(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // get the mouse cursor position at startup:
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         document.onmouseup = closeDragElement;
//         // call a function whenever the cursor moves:
//         document.onmousemove = elementDrag;
//         elmnt.style.pointerEvents = "none";
//         element = elmnt;
//     }

//     function elementDrag(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // calculate the new cursor position:
//         pos1 = pos3 - e.clientX;
//         pos2 = pos4 - e.clientY;
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         // set the element's new position:
//         elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//         elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//     }

//     function closeDragElement() {
//         // stop moving when mouse button is released:
//         document.onmouseup = null;
//         document.onmousemove = null;

//         element = null;
//         elmnt.style.pointerEvents = "";
//     }
// }