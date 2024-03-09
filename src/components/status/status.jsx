
import StatusMenu from "../statusMenu/statusMenu";
import NewTaskButton from "../newTaskButton/newTaskButton";
import TasksList from "../tasksList/tasksList";

import { projectAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { useState, useRef, useEffect } from "react";

import DoneIcon from '@mui/icons-material/Done';

export default function Status({column, tasks}) {
  const [projectData, setProjectData] = useAtom(projectAtom)

  const span1Ref = useRef(null);
  const [span1Height, setSpan1Height] = useState(0);
  
  const [statusInputVisible, setStatusInputVisible] = useState(false)
  const [statusInputText, setStatusInputText] = useState(column.title)
  const statusInputRef = useRef(null)

  const inputStyle = {
    backgroundColor: column.color,
    width: "100px" , // You can adjust the multiplier as needed
  };

  useEffect(() => {
    if (span1Ref.current) {
      setSpan1Height(span1Ref.current.getBoundingClientRect().height + 'px');
    }
  }, [span1Height]);

  const hanldeStatusInput = () => {
    setStatusInputVisible(true)
    setTimeout(() => {
      if (statusInputRef.current) {
        statusInputRef.current.focus();
        statusInputRef.current.setSelectionRange(statusInputText.length, statusInputText.length);
      }
    }, 400);
    console.log("HEY")
  }

  useEffect(() => {
    if (statusInputVisible && statusInputRef.current) {
      statusInputRef.current.focus();
    }
  }, [statusInputVisible]);

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
    <div className="flex flex-col gap-3 w-full md:w-[300px] p-3 bg-[#2A2A2A] rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center max-w-[70%]">
          <span
            ref={span1Ref}
            style={{ 
              backgroundColor: column.color,
              display: statusInputVisible ? "none" : "-webkit-box"
            }}
            className={`px-1 py-0 rounded-sm max-w-[150p w-fit text-sm truncated-status text-black`}
          >
            {column.title}
          </span>

          <div
            style={{ backgroundColor: column.color, height: span1Height }}
            className={`${
              statusInputVisible ? "" : "hidden"
            } flex items-center rounded-sm`}
          >
            <input
              ref={statusInputRef}
              style={inputStyle}
              className={`status-input px-1 py-0 text-sm rounded-sm rounded-r-none text-black outline-none`}
              value={statusInputText}
              onChange={(e) => setStatusInputText(e.target.value)}
              placeholder="edit status"
            />
            <button
              style={{ backgroundColor: column.color }}
              onClick={handleSaveStatusInput}
              disabled={statusInputText === "" ? true : false}
              className="flex items-center px-1 py-0 rounded-sm rounded-l-none enabled:hover:brightness-110 h-full text-black disabled:text-[#0000006b]"
            >
              <DoneIcon fontSize="small" />
            </button>
          </div>

          <span className="text-[#B5B5B5] text-sm">{tasks.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <StatusMenu column={column} hanldeStatusInput={hanldeStatusInput} />
          <NewTaskButton colId={column.id} />
        </div>
      </div>

      <TasksList colId={column.id} tasks={tasks} />
    </div>
  );
}
