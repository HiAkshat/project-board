import { Draggable, Droppable } from "@hello-pangea/dnd"
import Task from "../task/task"
import AddIcon from '@mui/icons-material/Add';
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
    <div className="flex flex-col gap-3 min-w-[300px] border border-black px-4 py-3 bg-[#2A2A2A] rounded-[22px]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <span className="bg-[#EE5959] px-2 py-1 rounded-xl">{column.title}</span>
          <span className="text-[#B5B5B5]">{tasks.length}</span>
        </div>
        <Dialog>
            <DialogTrigger>
              <span className="text-[#B5B5B5]"><AddIcon /></span>
            </DialogTrigger>
            <DialogContent className="bg-transparent">
              <NewTask colId={column.id} />
            </DialogContent>
          </Dialog>  
      </div>

      <Droppable droppableId={column.id}>
        {(provided)  => (
          <div className="flex flex-col gap-2" ref={provided.innerRef} {...provided.droppableProps}>
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
