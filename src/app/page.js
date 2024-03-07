"use client"

import Status from "@/components/status/status";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAtom } from "jotai";
import { projectAtom } from "./atom";

import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

import Masonry from 'react-masonry-css'

export default function Home() {
  const breakpointColumnsObj = {
    default: 4, // Number of columns by default
    1100: 2,   // Number of columns at 1100px screen width and above
    640: 1,    // Number of columns at 700px screen width and above
  };

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

  const handleNewStatus = () => {
    const newId = uuidv4()
    const newCol = {
      id: newId,
      color: "#cce7e1"
    }
  }
  
  const [statusInputVisible, setStatusInputVisible] = useState(false)
  const [statusInputText, setStatusInputText] = useState("")
  const handleAddNewStatus = () => {
    const colors = ["#ffccd1", "#fbeecc", "#cce7e1", "#cccfe7", "#e7cce3", "#97afd4"]

    const newId = uuidv4()
    const newCol = {
      id: newId,
      color: colors[Math.floor(Math.random() * colors.length)],
      title: statusInputText,
      taskIds: []
    }

    const newColumnOrder = projectData.columnOrder
    newColumnOrder.push(newId)

    const newProjectData = {
      ...projectData,
      columns: {
        ...projectData.columns,
        [newId]: newCol
      },
      columnOrder: newColumnOrder
    }

    setProjectData(newProjectData)
    setStatusInputVisible(false)

    return
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <main className="flex flex-col gap-5 py-5 px-3 ">
          {/* <button onClick={handleConsole}>Console</button> */}
          <span className="title-text max-w-fit">Project Board</span>

          <div className="place-self-start flex gap-1 text-[#272727] text-sm rounded-md min-h-[33px]">
            <button onClick={handleNewStatus} className={`${statusInputVisible ? "hidden" : ""} flex items-center gap-0  px-2 py-1 border-2 border-[#454545] rounded-md`}>
              <span className="status-bg" onClick={() => setStatusInputVisible(true)}>+ new status</span>
            </button>
            <div className={`${statusInputVisible ? "" : "hidden"} flex`}>
              <input className="bg-transparent border-2 border-[#454545] text-white outline-none text-sm px-2 py-1 rounded-md rounded-r-none border-r-0" value={statusInputText} onChange={e => setStatusInputText(e.target.value)} placeholder="your status title" type="text" />
              <button disabled={statusInputText==="" ? true : false} onClick={handleAddNewStatus} className="text-white disabled:text-[#454545] px-2 py-1 border-2 border-[#454545] rounded-md rounded-l-none h-full"><DoneIcon fontSize="small"/></button>
            </div>
          </div>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex min-w-full max-w-min gap-3"
            columnClassName="flex flex-col gap-3 w-[300px] masonry-col"
          >
            {projectData.columnOrder.map(columnId => {
              const column = projectData.columns[columnId]
              const tasks = column.taskIds.map((taskId) => projectData.tasks[taskId]);

              return (
                <div className="w-fit" key={columnId}>
                  <Status column={column} tasks={tasks} />
                </div>
              )
            })}

          </Masonry>
        </main>
    </DragDropContext>
  );
}