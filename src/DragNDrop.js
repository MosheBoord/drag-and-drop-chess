/* eslint-disable react/display-name */
import React from "react";

// const dragAndDropManager = new dragAndDropManager();
const dragAndDropManager = {
    draggedItem: null,
    draggedSurface: null,
    dropSurface: null,
    draggableItems: [],
    dragSurfaces: [],
    dropSurfaces: [],
};

const DNDContext = React.createContext(dragAndDropManager);

export class DragAndDropProvider extends React.Component {
    constructor() {
        super();
        // this.dragAndDropManager = dragAndDropManager;
        this.state = {
            draggedItem: dragAndDropManager.draggedItem,
            draggedSurface: dragAndDropManager.draggedSurface,
            dropSurface: dragAndDropManager.dropSurface,
        };
    }

    refreshState() {
        this.setState({
            draggedItem: dragAndDropManager.draggedItem,
            draggedSurface: dragAndDropManager.draggedSurface,
            dropSurface: dragAndDropManager.dropSurface,
        });
    }

    render() {
        return (
            <DNDContext.Provider>
                {this.props.children}
            </DNDContext.Provider>
        );
    }
}

class DraggableItem {
    constructor(type = "", item = {}) {
        this.type = type;
        this.item = item;
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
                    return;
                }
            }

            dragAndDropManager.draggableItems.push(this);
            this.el.onmousedown = this.dragMouseDown;
        }
    }

    dragMouseDown(e) {
        console.log("mouse down");
        // console.log("element styles", this.el.style);
        e = e || window.event;
        e.preventDefault();
        // get the element starting position
        // this.startingTopPosition = this.el.offsetTop;
        // this.startingLeftPosition = this.el.offsetLeft;
        // get intitial style for reverting on cancel drag
        this.initialStyle = this.el.style;
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
        console.log("prev pos top", this.el.style.top);
        this.el.style.top = (this.el.offsetTop - this.pos2) + "px";
        console.log("new pos top", this.el.style.top);
        this.el.style.left = (this.el.offsetLeft - this.pos1) + "px";

        // console.log("top", this.el.style.top);
    }

    closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        // get last el position
        // this.transitionTopToStartingPosition = (this.el.offsetTop - this.startingTopPosition) / 50;
        // this.transitionLeftToStartingPosition = (this.el.offsetLeft - this.startingLeftPosition) / 50;

        // element = null;
        dragAndDropManager.draggedItem = null;
        this.el.style.pointerEvents = "";
        this.el.style = this.initialStyle;
        // console.log("initial style", this.initialStyle);
        // this.el.style.top = this.startingTopPosition;
        // this.el.style.left = this.startingLeftPosition;


        // let times = 0;
        // setInterval(() => {
        //     // console.log("interval started");
        //     if (times < 50) {
        //         // console.log("interval going");
        //         times++;
        //         // console.log("this.el.style.top", this.el.style.top, "this.transitionTopToStartingPosition", this.transitionTopToStartingPosition);
        //         this.el.style.top = this.el.offsetTop - this.transitionTopToStartingPosition + "px";
        //         this.el.style.left = this.el.offsetLeft - this.transitionLeftToStartingPosition + "px";
        //         // console.log("top", this.el.style.top);
        //         // console.log("current transition changes: ", this.transitionTopToStartingPosition, this.transitionLeftToStartingPosition);
        //         // this.el.style.top = Math.floor(this.el.style.top - this.transitionTopToStartingPosition) + "px";
        //         // this.el.style.left = Math.floor(this.el.style.top - this.transitionLeftToStartingPosition) + "px";
        //         // this.el.style.top -= this.startingTopPosition;
        //         // this.el.style.left -= this.startingLeftPosition;
        //     }
        // }, 10);
    }

    dragElement() {

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