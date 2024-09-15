"use strict";
// When we found the two paricipants then we initialize this game class.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Message_1 = require("./Message");
// Here we create an object to game class.
class Game {
    constructor(player1, player2) {
        this.movesCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.player1.send(JSON.stringify({
            type: Message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: Message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
        this.startTime = new Date();
    }
    makeMove(socket, move) {
        // validation
        // - Is this is the move of user
        // - Is move valid
        if (this.movesCount % 2 === 0 && socket != this.player1) {
            return;
        }
        if (this.movesCount % 2 === 1 && socket != this.player2) {
            return;
        }
        // Update the board
        // - Push the move
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        // Check if the game is over
        if (this.board.isGameOver()) {
            //Send the message to both the player;
            this.player1.send(JSON.stringify({
                type: Message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: Message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
        }
        // Send the updated board to both players
        if (this.movesCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: Message_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: Message_1.MOVE,
                payload: move
            }));
        }
        this.movesCount++;
    }
}
exports.Game = Game;
