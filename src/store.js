import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

const logger = createLogger({
  predicate: (getState, action) => {
    // Use the next line to disable specific actions from being logged.
    // return ![ACTION_TYPE_ONE, ACTION_TYPE_TWO, ...].includes(action.type);

    // Return false if you don't want to log anything.
    return false;
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

// This action takes place when a player changes the game mode to one of the other three possible modes
// Player vs Player, Play as white vs Computer, and Play as black vs Computer.
const CHANGE_PLAY_MODE = "CHANGE_PLAY_MODE";
// The three playmodes
export const PLAYER_VS_PLAYER = "PLAYER_VS_PLAYER";
export const WHITE_VS_COMPUTER = "WHITE_VS_COMPUTER";
export const BLACK_VS_COMPUTER = "BLACK_VS_COMPUTER";

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
export const boardUpdate = (chessBoard, turn, check, checkMate) => ({
  type: BOARD_UPDATE,
  chessBoard,
  turn,
  check,
  checkMate
});

export const promote = (from = [], to = []) => ({
  type: PROMOTE,
  from: from,
  to: to
});

export const changePlayMode = (playMode = PLAYER_VS_PLAYER) => ({
  type: CHANGE_PLAY_MODE,
  playMode
});

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
  turn: "",
  check: false,
  checkMate: false,
  draggedItem: { coordinates: [] },
  // I'm not sure if the next two lines are necessary
  dragIsOver: { coordinates: [], x: -1, y: -1 },
  checkForMove: false,
  promotion: {
    popUp: false,
    value: "",
    from: [],
    to: []
  },
  playMode: PLAYER_VS_PLAYER
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
        turn: action.turn,
        check: action.check,
        checkMate: action.checkMate
      };
    case PROMOTE:
      return {
        ...prevState,
        promotion: { ...prevState.promotion, popUp: !prevState.promotion.popUp, from: action.from, to: action.to }
      };
    case CHANGE_PLAY_MODE:
      return {
        ...prevState,
        playMode: action.playMode
      };
    default:
      return prevState;
  }
};

const store = createStore(reducer, applyMiddleware(logger));

export default store;
