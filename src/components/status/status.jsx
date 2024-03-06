import { Draggable, Droppable } from "@hello-pangea/dnd"
import Task from "../task/task"
import AddIcon from '@mui/icons-material/Add';

export default function Status({column, tasks}) {
  return (
    <div className="flex flex-col gap-3 min-w-[300px] border border-black px-4 py-3 bg-[#2A2A2A] rounded-[22px]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <span className="bg-[#EE5959] px-2 py-1 rounded-xl">{column.title}</span>
          <span className="text-[#B5B5B5]">{tasks.length}</span>
        </div>
        <button>
          <span className="text-[#B5B5B5]"><AddIcon /></span>
        </button>
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
