export default function Task({ task }) {
  return (
    <div className="flex justify-start bg-[#404040] hover:bg-[#555555] rounded-sm px-2 py-1 hover">
      <span className="text-left truncated-text">{task.title}</span>
    </div>
  );
}
