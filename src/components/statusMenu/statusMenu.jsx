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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="text-[#B5B5B5] hover:text-white"><MoreHorizIcon fontSize="small"/></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
          <DropdownMenuItem className="flex items-center hover:bg-[#313131] rounded-md gap-2 w-full px-2 py-1 text-sm cursor-pointer" onClick={() => hanldeStatusInput()}>
            <span className=""><EditIcon fontSize="small"/></span>
            <span className="text-left">Edit title</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center hover:bg-[#313131] rounded-md gap-2 w-full px-2 py-1 text-sm cursor-pointer" onClick={() => hanldeStatusInput()}>
            <span><DeleteIcon fontSize="small"/></span>
            <span className="text-left">Delete</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
