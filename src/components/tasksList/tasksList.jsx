import EditTask from "@/components/editTask/editTask";
import Task from "@/components/task/task"

import { Draggable, Droppable } from "@hello-pangea/dnd"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function TasksList({colId, tasks}) {
  return (
    <Droppable droppableId={colId}>
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
                      <Task task={task} colId={colId} />
                    </div>
                  )}
                </Draggable>
              </DialogTrigger>
              <DialogContent>
                <EditTask taskId={task.id} colId={colId} index={index} />
              </DialogContent>
            </Dialog>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
