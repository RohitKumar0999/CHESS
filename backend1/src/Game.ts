// When we found the two paricipants then we initialize this game class.

import { WebSocket } from "ws";
import {Chess} from 'chess.js';
import { GAME_OVER, INIT_GAME, MOVE } from "./Message";

// Here we create an object to game class.

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;
    private movesCount =  0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload:{
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload:{
                color: "black"
            }
        }))
        this.startTime = new Date();
    }

    makeMove(socket:WebSocket,move:{
        from:string;
        to:string;
        promotion?:string;
    }){
      // validation
      // - Is this is the move of user
      // - Is move valid
      if(this.movesCount%2 ===0 && socket!=this.player1){
        return;
      }
      if(this.movesCount%2 ===1 && socket!=this.player2){
        return;
      }
      
      // Update the board
      // - Push the move
      try{
       this.board.move(move);
      }
      catch(e){
        console.log(e);
        
        return;
      }

      // Check if the game is over
      if(this.board.isGameOver()){
        //Send the message to both the player;
        this.player1.send(JSON.stringify({
            type: GAME_OVER,
            payload:{
                winner: this.board.turn() === "w" ? "black" : "white"
            }
        }))
        
        this.player2.send(JSON.stringify({
            type: GAME_OVER,
            payload:{
                winner: this.board.turn() === "w" ? "black" : "white"
            }
        }))
      }

      // Send the updated board to both players
      if(this.movesCount%2 ===0 ){
        this.player2.send(JSON.stringify({
            type: MOVE,
            payload: move
        }))
      }

      else{
        this.player1.send(JSON.stringify({
            type: MOVE,
            payload:move
        }))
      }
      this.movesCount++;
    }



}
