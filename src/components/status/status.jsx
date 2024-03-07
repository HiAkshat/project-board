import { Draggable, Droppable } from "@hello-pangea/dnd"
import Task from "../task/task"
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from "next/link";
import NewTask from "../newTask/newTask";
import EditTask from "../editTask/editTask";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Status({column, tasks}) {
  return (
    <div className="flex flex-col gap-3 w-[300px]  p-3 bg-[#2A2A2A] rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <span style={{backgroundColor: column.color}} className={`px-1 py-0 rounded-sm text-sm text-black`}>{column.title}</span>
          <span className="text-[#B5B5B5] text-sm">{tasks.length}</span>
        </div>

        <div className="flex items-center gap-2">
        <span className="text-[#B5B5B5]"><MoreHorizIcon fontSize="small"/></span>

        <Dialog>
          <DialogTrigger>
            <span className="text-[#B5B5B5]"><AddIcon fontSize="small"/></span>
          </DialogTrigger>
          <DialogContent className="bg-transparent">
            <NewTask colId={column.id} />
          </DialogContent>
        </Dialog>  
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided)  => (
          <div className="flex flex-col gap-3" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Dialog key={task.id}>
                <DialogTrigger>
                  <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <Task task={task} colId={column.id} />
                      </div>
                    )}
                  </Draggable>
                </DialogTrigger>
                <DialogContent>
                  <EditTask taskId={task.id} colId={column.id} index={index} />
                </DialogContent>
              </Dialog>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
