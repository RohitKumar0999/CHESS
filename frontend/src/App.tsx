import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from "react";
import Toaster from "./Components/Toaster/Toaster";

function App() {
  const[toastConfig,setToastConfig] = useState({
    open: false,
    message: '',
  });
  return (
    <div className="h-screen w-screen bg-gray-800">
    <DndProvider backend={HTML5Backend}>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Landing />}/>
    <Route path='/game' element={<Game setToastConfig={setToastConfig}/>}/>
  </Routes>
  </BrowserRouter>
  </DndProvider>
  <Toaster toastConfig={toastConfig} setToastConfig={setToastConfig}/>
    </div>
  
  )
}

export default App
