import { Draggable, Droppable } from "@hello-pangea/dnd"
import Task from "../task/task"
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NewTask from "../newTask/newTask";
import EditTask from "../editTask/editTask";
import { useAtom, useSetAtom } from "jotai";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { projectAtom } from "@/app/atom";
import { useState, useRef, useEffect } from "react";

export default function Status({column, tasks}) {
  const [projectData, setProjectData] = useAtom(projectAtom)

  const span1Ref = useRef(null);
  const [span1Width, setSpan1Width] = useState(0);
  const [span1Height, setSpan1Height] = useState(0);
  
  const [statusInputVisible, setStatusInputVisible] = useState(false)
  const [statusInputText, setStatusInputText] = useState("")

  const inputStyle = {
    backgroundColor: column.color,
    width: "100px" , // You can adjust the multiplier as needed
  };

  useEffect(() => {
    if (span1Ref.current) {
      setSpan1Width(span1Ref.current.getBoundingClientRect().width + 'px');
    }
    if (span1Ref.current) {
      setSpan1Height(span1Ref.current.getBoundingClientRect().height + 'px');
    }
  }, [span1Width, span1Height]);
  
  const handleStatusDelete = () => {
    const newProjectData = {
      ...projectData
    }

    const currId = column.id
    delete newProjectData.columns[currId]
    newProjectData.columnOrder = newProjectData.columnOrder.filter(colId => colId !== currId)

    setProjectData(newProjectData)
    return
  }

  const hanldeStatusInput = () => {
    setStatusInputVisible(true)
  }

  const handleSaveStatusInput = () => {
    const newCol = {
      ...column,
      title: statusInputText 
    }

    const newProjectData = {
      ...projectData,
      columns: {
        ...projectData.columns,
        [column.id]: newCol
      }
    }

    setProjectData(newProjectData)
    setStatusInputVisible(false)

    return
  }

  return (
    <div className="flex flex-col gap-3 w-[300px] p-3 bg-[#2A2A2A] rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <span ref={span1Ref} style={{backgroundColor: column.color}} className={`${statusInputVisible ? "hidden" : ""} px-1 py-0 rounded-sm text-sm text-black`}>{column.title}</span>
          
          <div style={{backgroundColor: column.color, height: span1Height}} className={`${statusInputVisible ? "" : "hidden"} flex items-center rounded-sm`}>
            <input style={inputStyle} className={`status-input px-1 py-0 text-sm rounded-sm rounded-r-none text-black outline-none`} value={statusInputText} onChange={e => setStatusInputText(e.target.value)} placeholder="edit status"/>
            <button onClick={handleSaveStatusInput} disabled={statusInputText==="" ? true : false} className="px-1 py-0 rounded-sm rounded-l-none text-black disabled:text-[#0000006b]"><DoneIcon fontSize="small"/></button>
          </div>

          <span className="text-[#B5B5B5] text-sm">{tasks.length}</span>
        </div>


        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="text-[#B5B5B5]"><MoreHorizIcon fontSize="small"/></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <button className="flex w-full px-2 py-1" onClick={hanldeStatusInput}>
                  <span className="text-left">Edit title</span>
                </button>
                <button className="flex w-full px-2 py-1" onClick={handleStatusDelete}>
                  <span className="text-left">Delete</span>
                </button>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger>
              <span className="text-[#B5B5B5]"><AddIcon fontSize="small"/></span>
            </DialogTrigger>
            <DialogContent className="bg-transparent">
              <NewTask colId={column.id} />
            </DialogContent>
          </Dialog>  
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided)  => (
          <div className="flex flex-col gap-3" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Dialog key={task.id}>
                <DialogTrigger>
                  <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <Task task={task} colId={column.id} />
                      </div>
                    )}
                  </Draggable>
                </DialogTrigger>
                <DialogContent>
                  <EditTask taskId={task.id} colId={column.id} index={index} />
                </DialogContent>
              </Dialog>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
