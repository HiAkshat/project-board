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

      <div className="flex flex-col gap-2">
        {tasks.map(task => {
          return (
            <div key={task.id}>
              <Task task={task} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
