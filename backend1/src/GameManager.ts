// This file is a class 

import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./Message";
import { Game } from "./Game";

// User , Game

export class GameManager{
    private games: Game[];
    private pendingUser: WebSocket | null; // THis vaiable stores the user waiting to start the game.
    private users: WebSocket[];  // This array stores all the sockets

    constructor() // this is constructor function that will runs initially.
    {
        this.games=[];
        this.pendingUser=null;
        this.users=[];
    }

    addUser(socket:WebSocket) // function to add the 
    {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket:WebSocket)
    {
        this.users = this.users.filter(user=> user!== socket);
        // stops the game here bcz the user left.
    }

    private addHandler(socket: WebSocket){
        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME){
                if(this.pendingUser){ // Start the game with already exist socket in the pending user variable.
                    const game =  new Game(this.pendingUser,socket);  // starting the game by creating an instace of class and all the socket passed in it passed to the constructor function.
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else{
                    this.pendingUser = socket; // Make it pending user if there is not any.
                }
            }

            if(message.type === MOVE){
                const game = this.games.find((game)=>game.player1 === socket || game.player2 === socket);
                if(game){
                    game.makeMove(socket,message.payload.move);
                }
            }
        })
    }



}
