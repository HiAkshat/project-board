import Masonry from 'react-masonry-css'
import Status from '../status/status';

export default function StatusGrid({projectData}) {
  const breakpointColumnsObj = {
    default: 4, // Number of columns by default
    1100: 2,   // Number of columns at 1100px screen width and above
    640: 1,    // Number of columns at 700px screen width and above
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex min-w-full max-w-min gap-3"
      columnClassName="flex flex-col gap-3 w-[300px] masonry-col"
    >
      {projectData.columnOrder.map(columnId => {
        const column = projectData.columns[columnId]
        const tasks = column.taskIds.map((taskId) => projectData.tasks[taskId]);

        return (
          <div className="w-fit" key={columnId}>
            <Status column={column} tasks={tasks} />
          </div>
        )
      })}
    </Masonry>
  )
}
