import Chess from "chess.js";

// The chess instance represents the entire game.
const chess = new Chess();

// The current board state.
let boardState = chess.board();

// observer represents the root react element to be rerendered when the board state changes.
// (or on a canceled drag)
let observer = null;

// This function generates a random move and plays it.
export function makeRandomMove() {
    if (!chess.game_over()) {
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
        boardState = chess.board();
        emitChange();
    } else {
        chess.reset();
    }
}

// This function checks if a move is legal. (Still needs to be done)

export function isLegalMove() {
    // console.log("move is legal");
    return true;
}

// This function makes a move.
export function makeMove(fromSquare, toSquare) {
    const prevSquare = convertToChessNotation(fromSquare);
    const newSquare = convertToChessNotation(toSquare);
    chess.move({ from: prevSquare, to: newSquare, promotion: "q" });
    boardState = chess.board();
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



// For every change on board state rerender observer.
function emitChange() {
    observer(boardState);
}

// This function sets observer.
export function observe(o) {
    if (observer) {
        throw new Error("Multiple observers not implemented.");
    }

    observer = o;
    emitChange();
}