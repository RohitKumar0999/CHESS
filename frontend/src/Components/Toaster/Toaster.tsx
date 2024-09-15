// import './styles.css';
import * as Toast from '@radix-ui/react-toast';
import "./Toster.css"
import { useEffect } from 'react';

const Toaster = ({toastConfig,setToastConfig}:{toastConfig:{message:string,open:boolean,type?:string}, setToastConfig?:any}) => {

    useEffect(()=>{
        if(toastConfig.open){
            setTimeout(() => {  
                setToastConfig((prev:any)=>({...prev,open:false}));
            }, 800);
        }
    },[toastConfig])

   

  return (
    <Toast.Provider swipeDirection="up">
      {/* <button
        className="Button large violet"
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            eventDateRef.current = oneWeekAway();
            setOpen(true);
          }, 100);
        }}
      >
        Add to calendar
      </button> */}

      <Toast.Root className={`${toastConfig?.type=="warning"?'bg-orange-500':toastConfig?.type=='error'?'bg-red-500':'bg-green-500'} ToastRoot `} open={toastConfig.open} >
        <Toast.Title className="ToastTitle text-white text-center">{toastConfig.message}</Toast.Title>
        <Toast.Description asChild>
          {/* <time className="ToastDescription" dateTime={eventDateRef.current.toISOString()}>
            {prettyDate(eventDateRef.current)}
          </time> */}
          {/* <h3>fdsfsdfsdf</h3> */}
        </Toast.Description>
        {/* <Toast.Action className="ToastAction" asChild altmessage="Goto schedule to undo">
          <button className="Button small green">Undo</button>
        </Toast.Action> */}
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default Toaster;
