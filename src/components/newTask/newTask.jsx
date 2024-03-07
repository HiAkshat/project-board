"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import { projectAtom } from "@/app/atom"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import DoneIcon from '@mui/icons-material/Done';

import {
  DialogClose
} from "@/components/ui/dialog"

export default function NewTask({colId}) {
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
      ...projectData,
      tasks: {
        ...projectData.tasks,
        [newId]: task
      },
      columns: {
        ...projectData.columns,
        [sourceCol.id]: newCol
      },
    }

    setProjectData(newProjectData)
  }

  return (
    <div className="flex flex-col gap-3 p-3 bg-[#1e1e1e] rounded-xl">
      <div className="flex flex-col gap-2 text-xl">
        {/* <span>Title</span> */}
        <input className="bg-[#383838] py-2 px-3 rounded-md outline-none" placeholder="Add Title" value={title} onChange={e => setTitle(e.target.value)} type="text" />
      </div>
      <div className="flex flex-col gap-2">
        {/* <span>Description</span> */}
        <textarea className="bg-[#383838] py-1 px-2 rounded-md outline-none resize-none h-[20vh]" placeholder="Add Description" value={desc} onChange={e => setDesc(e.target.value)} type="text" />
      </div>
      <DialogClose>
        <div className="flex justify-end">
          <div className="flex gap-2 bg-[#383838] text-white px-2 py-1 rounded-md">
            <DoneIcon />
            <button className="" onClick={handleSave}>Save to {sourceCol.title}</button>
          </div>
        </div>
      </DialogClose>
    </div>
  )
}
