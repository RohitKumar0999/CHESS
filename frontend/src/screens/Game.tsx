import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../Components/Button";
import { ChessBoard } from "../Components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../Components/ItemTypes";
import DialogBox from "../Components/DialogBox/DialogBox";

export const INIT_GAME = "init_game";
export const INVALID_MOVE = "invalid_move";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = ({ setToastConfig }: { setToastConfig: any }) => {
  const navigate = useNavigate();
  const socket = useSocket();

  const [chess, setChess] = useState(new Chess()); // Chess instance
  const [board, setBoard] = useState(chess.board()); // Chess board
  const [started, setStarted] = useState<Boolean>(false);
  const [isWhite, setIsWhite] = useState<Boolean>(false); // State for player color
  const isWhiteRef = useRef(isWhite); // Ref to store the latest value of isWhite
  const [buttonConfig, setButtonConfig] = useState({
    value: true,
    disabled: false,
    loading: false,
    label: "play",
  });
  const [DialogConfig, setDialogConfig] = useState({
    open: false,
    title: "",
    description: "",
  });
  const [noOfMoves, setNoOfMoves] = useState<number>(0);
  const [, drop] = useDrop({
    accept: ItemTypes.Piece,
    drop: (item) => console.log(item),
  });

  // Keep the ref in sync with the latest state of isWhite
  useEffect(() => {
    isWhiteRef.current = isWhite;
  }, [isWhite]);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          console.log("Game Initialized");
          setToastConfig({open:true,message:"Game Started"})
          if (message.payload.color === "white") {
            setIsWhite(true);
          }
          setBoard(chess.board());
          setNoOfMoves(0);
          setStarted(true);
          break;

        case INVALID_MOVE:
          // Handle invalid move logic if needed
          break;

        case MOVE:
          console.log("Opponent move", message.payload);
          const move = message.payload;
          try {
            chess.move(move);
            setBoard(chess.board());
            setNoOfMoves((prev) => prev + 1);
            console.log("Move made");
          } catch (err) {
            console.log("There is an error", err);
          }
          break;

        case GAME_OVER:
          console.log("Game Over", message, "isWhite", isWhiteRef.current); // Use the ref to get the latest value
          const isCurrentPlayerWinner =
            message?.payload?.winner === "white" && isWhiteRef.current
              ? "You won 🎉"
              : message?.payload?.winner === "black" && !isWhiteRef.current
              ? "You won 🎉"
              : isWhiteRef.current
              ? "You lose 😔, black wins"
              : "You lose 😔, white wins";

          setDialogConfig({
            open: true,
            description: isCurrentPlayerWinner,
            title: "Game Over",
          });
          setToastConfig({ open: true, message: "Game Over" });
          break;

        default:
          break;
      }
    };
  }, [socket, chess]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 md:grid-cols-6">
          <div className={`col-span-4  ${!started ? "no-sr-only" : null}`}>
            <ChessBoard
              setToastConfig={setToastConfig}
              started={started}
              IsWhite={isWhite}
              noOfMoves={noOfMoves}
              setNoOfMoves={setNoOfMoves}
              chess={chess}
              setBoard={setBoard}
              socket={socket}
              board={board}
            />
          </div>
          <div
            ref={drop}
            className="col-span-2 flex flex-col justify-center gap-4 items-center bg-green-200 rounded-sm"
          >
            {started && (
              <div className="text-2xl text-green-800 font-bold">
                Turn:{" "}
                {noOfMoves === 0
                  ? isWhite
                    ? "Your turn"
                    : "Opponent's turn"
                  : noOfMoves % 2 === 0 && isWhite
                  ? "Your turn"
                  : noOfMoves % 2 !== 0 && !isWhite
                  ? "Your turn"
                  : "Opponent's turn"}
              </div>
            )}
            {!started && (
              <CustomButton
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  );
                  setButtonConfig((prev) => ({
                    ...prev,
                    loading: true,
                    label: "Connecting...",
                  }));
                }}
                loading={buttonConfig.loading}
              >
                {buttonConfig.label}
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      <DialogBox DialogConfig={DialogConfig} setDialogConfig={setDialogConfig}>
        {null}
      </DialogBox>
    </div>
  );
};
