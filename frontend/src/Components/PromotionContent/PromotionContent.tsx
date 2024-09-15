import { CustomButton as Button } from "../Button";

export const PromotionModalContent = ({
  handlePromotion,
  fromPiece,
}: {
  handlePromotion: Function;
  fromPiece: any;
}) => {
  return (
    <div className="flex flex-col gap-10">
      <Button
        onClick={() => {
          handlePromotion("q");
        }}
        className="bg-blue-700 text-white hover:bg-gray-900 rounded cursor-pointer "        
      >
        <div className="flex items-center gap-2 ">
          <img
            className="w-14"
            src={`/${fromPiece?.color === "b" ? "b" + "q" : "w" + "q"}.png`}
          />
          <label className="text-3xl font-bold cursor-pointer"> Queen </label>
        </div>
      </Button>

     <Button onClick={()=>{handlePromotion('b')}}
        className="bg-blue-700 text-white hover:bg-gray-900 rounded cursor-pointer">
      <div className="flex items-center gap-2 ">
         <img className="w-14" src={`/${fromPiece?.color === "b" ? "b"+"b": "w"+"b"}.png`} />
          <label className="text-3xl font-bold cursor-pointer"> Bishop </label>
        </div>
     </Button>

     <Button onClick={()=>{handlePromotion('r')}}
        className="bg-blue-700 text-white hover:bg-gray-900 rounded cursor-pointer">
     <div className="flex items-center gap-2">
        <img className="w-14" src={`/${fromPiece?.color === "b" ? "b"+"r": "w"+"r"}.png`} />
        <label className="text-3xl font-bold cursor-pointer"> Rook </label>
      </div>
     </Button>

     <Button onClick={()=>{handlePromotion('N')}}
        className="bg-blue-700 text-white hover:bg-gray-900 rounded cursor-pointer">
     <div className="flex items-center gap-2">
     <img className="w-14" src={`/${fromPiece?.color === "b" ? "b"+"n": "w"+"n"}.png`} />
     <label className="text-3xl font-bold cursor-pointer "> Knight </label>
      </div>
     </Button>
      {/* <Button onClick={()=>{handlePromotion('b')}}>
        <img className="w-14" src={`/${fromPiece.color === "b" ? "b"+"b": "w"+"b"}.png`} />
            Bishop
            </Button>
        <Button onClick={()=>{handlePromotion('r')}}>
        <img className="w-14" src={`/${fromPiece.color === "b" ? "b"+"r": "w"+"r"}.png`} />
            Rook
            </Button>
        <Button onClick={()=>{handlePromotion('n')}}>
            
            </Button> */}
    </div>
  );
};
