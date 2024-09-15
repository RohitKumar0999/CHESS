import { WebSocket } from "ws";
export declare class Game {
    player1: WebSocket;
    player2: WebSocket;
    private board;
    private startTime;
    private movesCount;
    constructor(player1: WebSocket, player2: WebSocket);
    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
        Promotion?: string;
    }): void;
}
