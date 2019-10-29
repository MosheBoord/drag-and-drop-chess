
import Chess from "chess.js";
import store, { boardUpdate } from "./store";

// The chess instance represents the entire game.
const chess = new Chess();

// The current board state.
let board = chess.board();

// observer represents the root react element to be rerendered when the board state changes.
// (or on a canceled drag)


// This function generates a random move and plays it.
export function makeRandomMove() {
    if (!chess.game_over()) {
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
        board = chess.board();
        emitChange();
    } else {
        chess.reset();
    }
}

// This function checks if a move is legal. (Still needs to be done)

export function isLegalMove(fromSquare, toSquare) {
    const tempChess = new Chess(chess.fen());
    const prevSquare = convertToChessNotation(fromSquare);
    const newSquare = convertToChessNotation(toSquare);
    const move = tempChess.move({ from: prevSquare, to: newSquare, promotion: "q" });
    return !!move;
}

export function checkPromotion(fromSquare, toSquare) {
    const fromX = fromSquare[0]
    const fromY = fromSquare[1]
    const piece = board[fromY][fromX]
    if (piece.type === "p" && toSquare[1] === 0){
        return true
    }
    return false
}

// This function makes a move. By default on promotion is queen.
export function makeMove(fromSquare, toSquare, promotion) {
    console.log("make a move");
    const prevSquare = convertToChessNotation(fromSquare);
    const newSquare = convertToChessNotation(toSquare);
    if (checkPromotion(fromSquare, toSquare)) {
        promotion = prompt("choose a promotion - n, b, r or q")
    }
    chess.move({ from: prevSquare, to: newSquare, promotion });
    board = chess.board();
    emitChange();
}

// This is a helper function that simply converts an x, y coordinates to a square in chess notation.
function convertToChessNotation(coordinates) {
    let alphabeticCharacter;
    switch (coordinates[0]) {
        case 0: {
            alphabeticCharacter = "a";
            break;
        }
        case 1: {
            alphabeticCharacter = "b";
            break;
        }
        case 2: {
            alphabeticCharacter = "c";
            break;
        }
        case 3: {
            alphabeticCharacter = "d";
            break;
        }
        case 4: {
            alphabeticCharacter = "e";
            break;
        }
        case 5: {
            alphabeticCharacter = "f";
            break;
        }
        case 6: {
            alphabeticCharacter = "g";
            break;
        }
        case 7: {
            alphabeticCharacter = "h";
            break;
        }
    }
    return alphabeticCharacter + (8 - coordinates[1]);
}

// For every change on board state update store.
function emitChange() {
    store.dispatch(boardUpdate(board));
}

// For our initial board state.
emitChange();

