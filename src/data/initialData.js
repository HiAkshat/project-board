const initialProjectData = {
  tasks: {
    [1]: { id: 1, title: "Drag your tasks anywhere", desc: ""},
    [2]: { id: 2, title: "Click to edit or delete task info", desc: ""},
    [3]: { id: 3, title: "Create new tasks from the add button", desc: ""},
    [4]: { id: 4, title: "Change status title or color from top right menu", desc: ""},
    [5]: { id: 5, title: "Your board layout is stored locally!", desc: "Your layout and tasks are saved locally even if you close the tab."},
    [6]: { id: 6, title: "Have fun moving around!", desc: ""},
  },

  columns: {
    "column-1": {
      id: "column-1",
      color: "#ffccd1",
      title: "Not started",
      taskIds: [1, 2, 3, 4],
    },
    "column-2": {
      id: "column-2",
      color: "#fbeecc",
      title: "In progress",
      taskIds: [5, 6],
    },
    "column-3": {
      id: "column-3",
      color: "#cce7e1",
      title: "Completed",
      taskIds: [],
    },
  },

  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialProjectData