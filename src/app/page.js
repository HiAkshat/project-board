"use client"

import Status from "@/components/status/status";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAtom } from "jotai";
import { projectAtom } from "./atom";

export default function Home() {
  const [projectData, setProjectData] = useAtom(projectAtom)

  const reorderCol = (sourceCol, startInd, endInd) => {
    const newTaskIds = Array.from(sourceCol.taskIds)
    const [removed] = newTaskIds.splice(startInd, 1)
    newTaskIds.splice(endInd, 0, removed)

    const newCol = {
      ...sourceCol,
      taskIds: newTaskIds
    }

    return newCol
  }


  const onDragEnd = (result) => {
    const {destination, source} = result

    // Task dropped to unknown position
    if (!destination) return

    const sourceCol = projectData.columns[source.droppableId];
    const destinationCol = projectData.columns[destination.droppableId];
    
    // Task dragged and dropped at same position
    if (sourceCol===destinationCol && destination.index===source.index) return

    // Task dragged to different position in same col
    if (sourceCol===destinationCol && destination.index!=source.index){
      const newCol = reorderCol(sourceCol, source.index, destination.index)
      const newProjectData = {
        ...projectData,
        columns: {
          ...projectData.columns,
          [newCol.id]: newCol
        }
      }

      setProjectData(newProjectData)
      return
    }

    // Task dragged to another col
    const newSourceTaskIds = Array.from(sourceCol.taskIds)
    const [removed] = newSourceTaskIds.splice(source.index, 1)
    const newSourceCol = {
      ...sourceCol,
      taskIds: newSourceTaskIds
    }
    
    const newDestinationTaskIds = Array.from(destinationCol.taskIds)
    newDestinationTaskIds.splice(destination.index, 0, removed)
    const newDestinationCol = {
      ...destinationCol,
      taskIds: newDestinationTaskIds
    }

    const newProjectData = {
      ...projectData,
      columns: {
        ...projectData.columns,
        [newSourceCol.id]: newSourceCol,
        [newDestinationCol.id]: newDestinationCol
      }
    }

    setProjectData(newProjectData)
    return
  }

  const handleConsole = ()=>{
    console.log(projectData)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <main className="py-5 px-3">
          {/* <button onClick={handleConsole}>Console</button> */}
          <div className="flex gap-4">
            {projectData.columnOrder.map(columnId => {
              const column = projectData.columns[columnId]
              const tasks = column.taskIds.map((taskId) => projectData.tasks[taskId]);

              return (
                <div key={columnId}>
                  <Status column={column} tasks={tasks} />
                </div>
              )
            })}
          </div>
          {/* <Status /> */}
        </main>
    </DragDropContext>
  );
}
