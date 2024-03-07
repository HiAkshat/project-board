// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// import EditTask from "../editTask/editTask"

export default function Task({task, colId}) {
  // return (
  //   <Dialog>
  //     <DialogTrigger>
  //       <div className="bg-[#404040] rounded-xl px-2 py-1">
  //         <span>{task.title}</span>
  //       </div>
  //     </DialogTrigger>
  //     <DialogContent>
  //       <EditTask taskId={task.id} colId={colId} />
  //     </DialogContent>
  //   </Dialog>
  // )

  return (
    <div className="flex justify-start bg-[#404040] rounded-sm px-2 py-1">
      <span className="text-left truncated-text">{task.title}</span>
    </div>
  )
}
