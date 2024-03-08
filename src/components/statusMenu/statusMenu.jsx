import { useAtom } from "jotai"

import {
  DropdownMenu,
  DropdownMenuContent,
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
        <span className="text-[#B5B5B5]"><MoreHorizIcon fontSize="small"/></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
          <button className="flex items-center gap-2 w-full px-2 py-1" onClick={() => hanldeStatusInput()}>
            <span className=""><EditIcon fontSize="small"/></span>
            <span className="text-left">Edit title</span>
          </button>
          <DropdownMenuSeparator />
          <button className="flex items-center gap-2 w-full px-2 py-1" onClick={handleStatusDelete}>
            <span><DeleteIcon fontSize="small"/></span>
            <span className="text-left">Delete</span>
          </button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
