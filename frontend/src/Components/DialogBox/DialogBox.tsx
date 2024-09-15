import * as Dialog from '@radix-ui/react-dialog';
import './DialoxBox.css'
import { Cross2Icon } from '@radix-ui/react-icons';
const DialogBox = ({DialogConfig,setDialogConfig,children}:{DialogConfig?:{title?:string,open?:boolean,description?:string},setDialogConfig:any,children:any}) => (
  <Dialog.Root open={DialogConfig?.open}>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">{DialogConfig?.title}</Dialog.Title>
        <Dialog.Description className="DialogDescription text-center">
          {DialogConfig?.description || children}
        </Dialog.Description>
        <Dialog.Close asChild>
          <button className="IconButton" onClick={()=>setDialogConfig({open:!open,title:""})} aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogBox;
