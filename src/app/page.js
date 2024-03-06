"use client"

import Image from "next/image";
import Status from "@/components/status/status";
import initialCardData from "@/data/initialData";
import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

export default function Home() {
  const [cardData, setCardData] = useState(initialCardData)

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

    const sourceCol = cardData.columns[source.droppableId];
    const destinationCol = cardData.columns[destination.droppableId];
    
    // Task dragged and dropped at same position
    if (sourceCol===destinationCol && destination.index===source.index) return

    // Task dragged to different position in same col
    if (sourceCol===destinationCol && destination.index!=source.index){
      const newCol = reorderCol(sourceCol, source.index, destination.index)
      const newCardData = {
        ...cardData,
        columns: {
          ...cardData.columns,
          [newCol.id]: newCol
        }
      }

      setCardData(newCardData)
      return
    }

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="p-2">
        <div className="flex gap-4">
          {cardData.columnOrder.map(columnId => {
            const column = cardData.columns[columnId]
            const tasks = column.taskIds.map((taskId) => cardData.tasks[taskId]);

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
