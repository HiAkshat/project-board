import { Draggable, Droppable } from "@hello-pangea/dnd"
import Task from "../task/task"

export default function Status({column, tasks}) {
  return (
    <div className="flex flex-col gap-3 min-w-[300px] border border-black p-2">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <span>{column.title}</span>
          <span>{tasks.length}</span>
        </div>
          <button>New</button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided)  => (
          <div className="flex flex-col gap-2" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Task task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
