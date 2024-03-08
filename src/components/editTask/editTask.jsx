"use client"

import { useState } from "react"
import { useAtom } from "jotai"
import { projectAtom } from "@/app/atom"
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  DialogClose
} from "@/components/ui/dialog"


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



export default function EditTask({taskId, colId, index}) {
  const [projectData, setProjectData] = useAtom(projectAtom)
  const task = projectData.tasks[taskId]
  
  const [title, setTitle] = useState(task.title)
  const [desc, setDesc] = useState(task.desc)

  const [open, setOpen] = useState(false)
  const [selectedCol, setSelectedCol] = useState(colId)
  const currCol = colId

  const handleSave = () => {
    const newTask = {
      ...task,
      title: title,
      desc: desc
    }

    let newProjectData

    if (currCol===selectedCol){
      newProjectData = {
        ...projectData,
        tasks: {
          ...projectData.tasks,
          [taskId]: newTask
        },
      }
    }

    else{
      const oldCol = projectData.columns[currCol]
      const newCol = projectData.columns[selectedCol]
      const currTaskId = taskId

      oldCol.taskIds = oldCol.taskIds.filter(taskId => taskId !== currTaskId);
      newCol.taskIds.push(currTaskId)

      newProjectData = {
        ...projectData,
        tasks: {
          ...projectData.tasks,
          [taskId]: newTask
        },
        columns: {
          ...projectData.columns,
          [currCol]: oldCol,
          [selectedCol]: newCol
        }
      }
    }

    setProjectData(newProjectData)
    return
  }

  const handleDelete = () => {
    const newProjectData = {
      ...projectData
    }

    delete newProjectData.tasks[taskId]
    newProjectData.columns[colId].taskIds = newProjectData.columns[colId].taskIds.filter(id => id != taskId)
    // newProjectData.columns.taskIds.filter((id) => id !== taskId);

    setProjectData(newProjectData)
    // console.log(newProjectData)
    return
  }

  return (
    <div className="flex flex-col w-[90%] m-auto md:w-full gap-3 p-3 bg-[#1e1e1e] rounded-xl">
      <div className="flex flex-col gap-2 text-xl">
        <span className="text-sm text-[#b5b5b5]">Title</span>
        <input className="bg-[#383838] py-2 px-3 rounded-md outline-none" placeholder="Add Title" value={title} onChange={e => setTitle(e.target.value)} type="text" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[#b5b5b5]">Description</span>
        <textarea className="bg-[#383838] py-1 px-2 rounded-md outline-none resize-none h-[20vh]" placeholder="Add Description" value={desc} onChange={e => setDesc(e.target.value)} type="text" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[#b5b5b5]">Change Status</span>
        <Popover className="text-black" open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button style={{backgroundColor: projectData.columns[selectedCol].color}} className="px-1 py-0 rounded-sm text-sm hover:brightness-110 text-black w-max">
              {selectedCol ? <>{projectData.columns[selectedCol].title}</> : <>+ Set status</>}
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {projectData.columnOrder.map((colId) => (
                    <CommandItem
                      key={colId}
                      value={colId}
                      onSelect={(value) => {
                        setSelectedCol(value || null)
                        setOpen(false)
                      }}
                    >
                      <span className="">{projectData.columns[colId].title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2 justify-end items-center h-[40px]">
        <DialogClose className="h-full">
          <div className="flex h-full cursor-pointer" onClick={handleSave}>
            <button disabled={title==="" ? true : false} className="flex items-center gap-2 bg-[#383838] enabled:hover:brightness-125 disabled:text-[#828282] text-white px-2 py-1 rounded-md">
              <DoneIcon />
              <span className="">Save</span>
            </button>
          </div>
        </DialogClose>

        <DialogClose className="h-full">
          <div className="flex h-full cursor-pointer hover:brightness-110" onClick={handleDelete}>
            <div className="flex gap-2 bg-[#8c3c3c] text-white p-2 rounded-md">
              <span className="text-[#f08585]"><DeleteIcon /></span>
            </div>
          </div>
        </DialogClose>
      </div>
    </div>
  )
}