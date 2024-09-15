import { Color, PieceSymbol, Square } from "chess.js"
import { MOVE } from "../screens/Game";
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import DialogBox from "./DialogBox/DialogBox";
import { PromotionModalContent } from "./PromotionContent/PromotionContent";

export const ChessBoard = ({setToastConfig,board,socket,chess,setBoard,IsWhite,setNoOfMoves,noOfMoves,started}:{
    chess:any,
    setBoard:any,
    noOfMoves:number,
    setNoOfMoves:any,
    board :( {
        square : Square,
        type : PieceSymbol,
        color: Color;
    } | null) [][],
    socket: WebSocket | null,
    IsWhite: Boolean,
    started: Boolean,
    setToastConfig:any,
})=>{
   console.log("IS i am the white one:",IsWhite);
    const [from, setFrom] = useState<null|Square>(null);
    const [fromPiece,setFromPiece] = useState<any>(null);
    const [to, setTo] = useState<null|Square>(null);
    const [PromotionModalConfig,setPromotionModalConfig] = useState<any>({
        open:false,
        title:"Convert Pawn to :",
       
    });
    const [PromotionMove,setPromotionMove] = useState<any>({
        from: "",
        to:"",
        promotion:""
    }
)
const [,
    drag] = useDrag(()=>{
    return({
type: ItemTypes.Piece,
// collect: monitor => {
//   return ({
//  isDragging: !!monitor.isDragging(),
// })}
}
)});


const[,drop] = useDrop(()=>({
    accept: ItemTypes.Piece,
    drop:(item:any)=>console.log(item),
}))


    // useEffect(()=>{
    // console.log("isDragging",isDragging);   
    // },[isDragging])
    console.log("isCheckMated",chess.isCheckmate());
    console.log("isGameOver",chess.isGameOver());
    useEffect(()=>{
    console.log("from",from);
    },[from]);

    useEffect(()=>{
    console.log("to",to);
    },[to]);

    const handlePromotion = (piece:string)=>{
        try{
            socket?.send(JSON.stringify({
                type: MOVE,
                payload: {
                    move: { 
                        from: PromotionMove?.from,
                        to: PromotionMove?.to,
                        promotion: piece
                    }
                }
            }));
            chess.move({
                from,
                to:PromotionMove?.to,
                promotion:piece,
                color:'w',
                before:'p',
                after:piece

             });
            setBoard(chess.board());
            setNoOfMoves((prev:number)=>(prev+1))
            setFrom(null);
            setPromotionModalConfig((prev:any)=>({...prev,open:false}))
        }
        catch(err){
            console.log("error",err);
            setToastConfig((prev:any)=>({...prev,open:true,message:"Invalid Move",type:"warning"}));

            // alert("Invalid move")
            setFrom(null);
        }
    } 
    
    return <div className={`${!started ?'pointer-events-none opacity-90':null} p-3 select-none`}>
     {
     IsWhite?
     board.map((row,i)=>{
        return <div key={i} className="flex justify-center">
            {row.map((square,j)=>{
                const squareRepresentaiton = String.fromCharCode(97+j)+""+(8-i) as Square;
                return <div ref={drop} data-testid={`(${i},${j})`} className={`cursor-pointer w-[70px] h-[70px] flex items-center justify-center  ${(i+j)%2 == 0 ? 'bg-white' : 'bg-green-500'} ${from===squareRepresentaiton?'bg-yellow-200':to===squareRepresentaiton?'bg-yellow-400':null} `} key={j}
                onClick={()=>{
                    if(!from){
                        setFrom(squareRepresentaiton??null);
                        setFromPiece(square??null);
                    }
                    else{
                        if(noOfMoves==0 ||  ((IsWhite && noOfMoves%2==0)||(!IsWhite && noOfMoves%2!=0))){
                            console.log(squareRepresentaiton , square?.color);
                        try{
                            
                            if(fromPiece?.type=='p' && fromPiece?.color=='w' && i==0 ){
                               setPromotionMove({from:from,to:squareRepresentaiton})
                               setPromotionModalConfig((prev:any)=>({...prev,open:true}));
                            }
                            else{
                                socket?.send(JSON.stringify({
                                    type: MOVE,
                                    payload: {
                                        move: { 
                                            from: from,
                                            to: squareRepresentaiton
                                        }
                                    }
                                }));
                                chess.move({
                                    from,
                                    to:squareRepresentaiton
                                 });
                                 setBoard(chess.board());
                                 setNoOfMoves((prev:number)=>(prev+1))
                                 setFrom(null);
                            }
                        }
                        catch(err){
                            console.log("error",err);
                            // alert("Invalid move")
                            setToastConfig((prev:any)=>({...prev,open:true,message:"Invalid Move",type:"warning"}));
                            setFrom(null);
                        }}
                        else{
                            setFrom(null);
                            setToastConfig((prev:any)=>({...prev,open:true,message:"It's your Opponent turn",type:"warning"}));
                            // alert("It's your opponent turn");
                        }
                    
                    }
                }}
                >
                    <div ref={drag} className="cursor-pointer">
                    {square?
                    <img className="w-14" src={`/${square.color === "b" ? 
                        "b"+square?.type: "w"+square?.type}.png`} />
                    :""}
                    </div>
                    </div>
            })}
            </div>
     })
     :
     board.slice(0).reverse().map((row,i)=>{
        return <div key={i} className="flex justify-center">
            {row.map((square,j)=>{
                const squareRepresentaiton = String.fromCharCode(97+j)+""+(i+1) as Square;
                return <div  className={`w-[70px] h-[70px] flex items-center justify-center cursor-pointer  ${(i+j)%2 == 0 ? 'bg-white' : 'bg-green-500'} ${from===squareRepresentaiton?'bg-yellow-200':to===squareRepresentaiton?'bg-yellow-400':null}`} key={j}
                onClick={(()=>{
                    if(!from){
                        setFrom(squareRepresentaiton??null);
                        setFromPiece(square??null)
                    }
                    else{
                        if(noOfMoves==0 ||  ((IsWhite && noOfMoves%2==0)||(!IsWhite && noOfMoves%2!=0))){
                        try{
                            if(fromPiece?.type=='p' && fromPiece?.color=='b' && i==0 ){
                                setPromotionMove({from:from,to:squareRepresentaiton})
                                setPromotionModalConfig((prev:any)=>({...prev,open:true}));
                             }
                             else{
                            socket?.send(JSON.stringify({
                                type: MOVE,
                                payload: {
                                    move: { 
                                        from: from,
                                        to: squareRepresentaiton
                                    }
                                }
                            }));
                            chess.move({
                                from,
                                to:squareRepresentaiton
                             });
                            setBoard(chess.board());
                            setNoOfMoves((prev:number)=>(prev+1))
                            setFrom(null);
                             }
                        }
                        catch(err){
                            console.log("error",err);
                            setToastConfig((prev:any)=>({...prev,open:true,message:"Invalid Move",type:"warning"}));

                            // alert("Invalid move")
                            setFrom(null);
                        }}
                        else{
                            setFrom(null);
                            setToastConfig((prev:any)=>({...prev,open:true,message:"It's your Opponent turn",type:"warning"}));

                            // alert("It's your opponent turn");
                        }
                    
                    }
                })}
                >
                    <div  className="cursor-pointer"> 
                    {square?
                    <img className="w-14" src={`/${square.color === "b" ? 
                        "b"+square?.type: "w"+square?.type}.png`} />
                    :""}
                    </div>
                    </div>
            })}
            </div>
     })
    
    }
      <DialogBox DialogConfig={PromotionModalConfig} setDialogConfig={setPromotionModalConfig}>
        <PromotionModalContent fromPiece={fromPiece} handlePromotion={handlePromotion}/>
        </DialogBox>
    </div>
}