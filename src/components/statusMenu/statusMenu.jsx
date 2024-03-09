import { useAtom } from "jotai"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { projectAtom } from "@/app/atom"

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StatusMenu({column, hanldeStatusInput}) {
  const [projectData, setProjectData] = useAtom(projectAtom)
  const colors = ["#ffccd1", "#fbeecc", "#cce7e1", "#cccfe7", "#e7cce3", "#97afd4"]
  
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

  const handleColorChange = (color) => {
    const newCol = {
      ...column,
      color: color
    }

    const newProjectData = {
      ...projectData,
      columns: {
        ...projectData.columns,
        [column.id]: newCol
      }
    }

    setProjectData(newProjectData)
    return
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="text-[#B5B5B5] hover:text-white"><MoreHorizIcon fontSize="small"/></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-32">
          <div className="relative flex overflow-x-scroll no-scrollbar">
            <div className="flex gap-1 ml-2 my-1">
              {colors.map((color, index) => {
                return (
                  <DropdownMenuItem onClick={() => handleColorChange(color)} key={index} style={{backgroundColor: color}} className="w-5 h-5 rounded-full cursor-pointer hover:brightness-105">
                  </DropdownMenuItem>
                )
              })}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center hover:bg-[#313131] rounded-md gap-2 w-full px-2 py-1 text-sm cursor-pointer" onClick={() => hanldeStatusInput()}>
            <span className=""><EditIcon fontSize="small"/></span>
            <span className="text-left">Edit title</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center hover:bg-[#313131] rounded-md gap-2 w-full px-2 py-1 text-sm cursor-pointer" onClick={() => handleStatusDelete()}>
            <span><DeleteIcon fontSize="small"/></span>
            <span className="text-left">Delete</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
