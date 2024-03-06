export default function Task({task}) {
  return (
    <div className="bg-[#404040] rounded-xl px-2 py-1">
      <span>{task.title}</span>
    </div>
  )
}
