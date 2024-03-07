"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import { projectAtom } from "@/app/atom"
import DoneIcon from '@mui/icons-material/Done';

import {
  DialogClose
} from "@/components/ui/dialog"


export default function EditTask({taskId, colId}) {
  const [projectData, setProjectData] = useAtom(projectAtom)
  const task = projectData.tasks[taskId]
  const sourceCol = projectData.columns[colId]
  
  const [title, setTitle] = useState(task.title)
  const [desc, setDesc] = useState(task.desc)

  const handleSave = () => {
    const newTask = {
      ...task,
      title: title,
      desc: desc
    }

    console.log(newTask)

    const newProjectData = {
      ...projectData,
      tasks: {
        ...projectData.tasks,
        [taskId]: newTask
      }
    }

    setProjectData(newProjectData)
    return
  }

  return (
    <div className="flex flex-col gap-3 p-3 bg-[#1e1e1e] borde border-white rounded-xl">
      <div className="flex flex-col gap-2 text-xl">
        <input className="bg-[#383838] py-2 px-3 rounded-md outline-none" placeholder="Add Title" value={title} onChange={e => setTitle(e.target.value)} type="text" />
      </div>
      <div className="flex flex-col gap-2">
        <textarea className="bg-[#383838] py-1 px-2 rounded-md outline-none resize-none h-[20vh]" placeholder="Add Description" value={desc} onChange={e => setDesc(e.target.value)} type="text" />
      </div>

      <DialogClose>
        <div className="flex justify-end cursor-pointer" onClick={handleSave}>
          <div className="flex gap-2 bg-[#383838] text-white px-2 py-1 rounded-md">
            <DoneIcon />
            <button className="">Save to {sourceCol.title}</button>
          </div>
        </div>
      </DialogClose>
    </div>
  )
}
