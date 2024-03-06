"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import { projectAtom } from "../atom"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import { Provider } from "jotai";

export default function Page({colId}) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [projectData, setProjectData] = useAtom(projectAtom)
  const sourceCol = projectData.columns[colId]

  const handleSave = () => {
    const newId = uuidv4()
    const task = {
      id: newId,
      title: title,
      desc: desc
    }

    const newTaskIds = Array.from(sourceCol.taskIds)
    newTaskIds.splice(newTaskIds.length, 0, newId)

    const newCol = {
      ...sourceCol,
      taskIds: newTaskIds
    }

    const newProjectData = {
      tasks: {
        ...projectData.tasks,
        [newId]: task
      },
      columns: {
        ...projectData.columns,
        [sourceCol.id]: newCol
      }
    }

    setProjectData(newProjectData)
  }

  return (
    <div className="flex flex-col gap-2 max-w-[300px] text-black">
      <input value={title} onChange={e => setTitle(e.target.value)} type="text" />
      <input value={desc} onChange={e => setDesc(e.target.value)} type="text" />
      <button className="text-white" onClick={handleSave}>Save</button>
    </div>
  )
}
