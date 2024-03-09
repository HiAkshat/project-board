import { useState, useRef } from "react"
import { useAtom } from "jotai"
import { projectAtom } from "@/app/atom"

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import { v4 as uuidv4 } from 'uuid';

export default function AddNewStatus() {
  const [projectData, setProjectData] = useAtom(projectAtom)

  const handleNewStatus = () => {
    const newId = uuidv4()
    const newCol = {
      id: newId,
      color: "#cce7e1"
    }
  }

  const [statusInputVisible, setStatusInputVisible] = useState(false)
  const [statusInputText, setStatusInputText] = useState("")
  const statusInputRef = useRef(null)

  const handleStatusInputVisible = () => {
    setStatusInputVisible(true)
    setTimeout(() => {
      if (statusInputRef.current) {
        statusInputRef.current.focus();
      }
    }, 400);
  }

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
    <div className="place-self-start flex gap-1 text-[#272727] text-sm rounded-md min-h-[33px]">
      <button onClick={handleNewStatus} className={`${statusInputVisible ? "hidden" : ""} flex items-center gap-0  px-2 py-1 border-2 border-[#454545] hover:bg-[#181818] rounded-md`}>
        <span className="status-bg" onClick={handleStatusInputVisible}>+ new status</span>
      </button>
      <div className={`${statusInputVisible ? "" : "hidden"} flex gap-2`}>
        <button onClick={() => {setStatusInputVisible(false); setStatusInputText("")}} className="text-red-300 hover:bg-[#242424] rounded-md px-[2px]"><CloseIcon fontSize="small"/></button>
        <div className="flex">
          <input ref={statusInputRef} className="bg-transparent border-2 border-[#454545] text-white outline-none text-sm px-2 py-1 rounded-md rounded-r-none border-r-0" value={statusInputText} onChange={e => setStatusInputText(e.target.value)} placeholder="your status title" type="text" />
          <button disabled={statusInputText==="" ? true : false} onClick={handleAddNewStatus} className="text-white disabled:text-[#454545] px-2 py-1 border-2 border-[#454545] enabled:hover:bg-[#242424] rounded-md rounded-l-none h-full"><DoneIcon fontSize="small"/></button>
        </div>
      </div>
    </div>
  )
}
