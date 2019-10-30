import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

const logger = createLogger({
  predicate: (getState, action) => {
    // Use the next line to disable specific actions from being logged.
    // return ![ACTION_TYPE_ONE, ACTION_TYPE_TWO, ...].includes(action.type);

    // Return false if you don't want to log anything.
    return true;
  }
});

//ACTION TYPES

// This action takes place when the mouse is pressed on a draggable item.
const INITIATE_DRAG = "INITIATE_DRAG";

// This action takes place whenever the game decides to update the board. (even as a result of an illegal move)
const BOARD_UPDATE = "BOARD_UPDATE";

// This action takes place when the mouse is lifted from a draggable item.
const DRAG_END = "DRAG_END";

// This action takes place when the mouse drags a draggable item over a drop surface.
// At this moment this action is never dispatched.
//const DRAG_ENTERED = "DRAG_ENTERED";

// This action takes place when the mouse is lifted from a draggable item while over a drop surface.
// At this moment this action is never dispatched.
//const INITIATE_DROP = "INITIATE_DROP";

const PROMOTE = "PROMOTE";

const PROMOTION_CHOICE = "PROMOTION_CHOICE"

//ACTION CREATORS

// draggedItem - the item to be dragged
export const initiateDrag = draggedItem => ({
  type: INITIATE_DRAG,
  draggedItem
});

// Currently not implemented.
// export const initiateDrop = () => ({
//   type: INITIATE_DROP,
// });

// draggedItem - the item that was being dragged
export const dragEnd = () => ({
  type: DRAG_END,
  draggedItem: { coordinates: [] },
});

// Currently not implemented.
// export const dragEntered = surface => ({
//   type: DRAG_ENTERED,
//   surface
// });

// chessBoard - the current state of the chess game.
export const boardUpdate = chessBoard => ({
  type: BOARD_UPDATE,
  chessBoard,
});

export const promote = () => ({
  type : PROMOTE
})

export const promotionChoice = (value) => ({
  type: PROMOTION_CHOICE,
  value
})

// setting up an initial chessboard state
const chessBoard = [];
for (let x = 0; x < 8; x++) {
  let row = [];
  for (let y = 0; y < 8; y++) {
    row.push({});
  }
  chessBoard.push(row);
}

// setting up initial redux state
const initialState = {
  chessBoard,
  draggedItem: { coordinates: [] },
  // I'm not sure if the next two lines are necessary
  dragIsOver: { coordinates: [], x: -1, y: -1 },
  checkForMove: false,
  promotion: {
    popUp: false,
    value: ""
  }
};

// all actions go through this reducer
const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case INITIATE_DRAG:
    case DRAG_END:
      return {
        ...prevState,
        draggedItem: action.draggedItem,
        // I'm not sure if the next line is necessary
        dragIsOver: { x: -1, y: -1 }
      };

    // Currently not implemented.
    // case INITIATE_DROP:
    //   return {
    //     ...prevState,
    //     checkForMove: true
    //   };
    // Currently not implemented.

    // case DRAG_ENTERED:
    //   return {
    //     ...prevState,
    //     dragIsOver: action.surface
    //   };

    case BOARD_UPDATE:
      return {
        ...prevState,
        chessBoard: action.chessBoard,
      };
    case PROMOTE:
        return {
          ...prevState, 
          promotion: {...prevState.promotion, popUp: !prevState.promotion.popUp}}
    case PROMOTION_CHOICE:
        return {...prevState, 
          promotion: {...prevState.promotion, value: action.value}}
    default:
      return prevState;
  }
};

const store = createStore(reducer, applyMiddleware(logger));

export default store;
