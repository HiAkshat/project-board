"use client"

import Image from "next/image";
import Status from "@/components/status/status";
import initialCardData from "@/data/initialData";
import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

export default function Home() {
  const [cardData, setCardData] = useState(initialCardData)

  return (
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
  );
}
