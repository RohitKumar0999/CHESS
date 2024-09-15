import { useNavigate } from "react-router-dom"
import { CustomButton } from "../Components/Button";

export const Landing = ()=>{
    const navigate = useNavigate();
    return <div className="flex justify-center">
    <div className="pt-8 max-w-5xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-center ">
                <img src="./chessboard.jpeg" className="max-w-96"/>
            </div>
            <div className="pt-16">
                <div className="flex justify-center">
               <h1 className="text-4xl text-white font-bold"> Play Chess Online on the #2 Site!</h1>
                </div>

               <div className="mt-4 flex justify-center">
                
                <CustomButton onClick={()=>navigate("/game")}>Play Online</CustomButton>
               </div>
            </div>
        </div>
    </div>
    </div>
}   