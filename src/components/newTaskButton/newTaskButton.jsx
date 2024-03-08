import AddIcon from '@mui/icons-material/Add';
import NewTask from "../newTask/newTask";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function NewTaskButton({colId}) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="text-[#B5B5B5] hover:text-white"><AddIcon fontSize="small"/></span>
      </DialogTrigger>
      <DialogContent className="bg-transparent">
        <NewTask colId={colId} />
      </DialogContent>
    </Dialog> 
  )
}
