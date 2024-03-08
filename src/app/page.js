"use client"

import { DragDropContext } from "@hello-pangea/dnd";
import { useAtom } from "jotai";
import { projectAtom } from "./atom";

import StatusGrid from "@/components/statusGrid/statusGrid";
import AddNewStatus from "@/components/addNewStatus/addNewStatus";

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex flex-col gap-5 p-3 md:py-5 md:px-6">
        <span className="title-text text-[54px] md:text-[72px] max-w-fit tracking-tighter md:tracking-normal">Project Board</span>
        <AddNewStatus />
        <StatusGrid projectData={projectData} />
      </main>
    </DragDropContext>
  );
}