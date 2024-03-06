import { v4 as uuidv4 } from 'uuid';

const initialCardData = {
  tasks: {
    [1]: { id: 1, title: "Configure Next.js application", desc: ""},
    [2]: { id: 2, title: "Configure Next.js and tailwind ", desc: ""},
    [3]: { id: 3, title: "Create sidebar navigation menu", desc: ""},
    [4]: { id: 4, title: "Create page footer", desc: ""},
    [5]: { id: 5, title: "Create page navigation menu", desc: ""},
    [6]: { id: 6, title: "Create page layout", desc: ""},
  },

  columns: {
    "column-1": {
      id: "column-1",
      title: "To-Do",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Completed",
      taskIds: [],
    },
  },

  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialCardData