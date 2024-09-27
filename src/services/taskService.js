// src/services/taskService.js
const mockTasks = [
  ];
  
  export const getTasks = () => Promise.resolve({ data: mockTasks });
  export const createTask = (task) => Promise.resolve({ data: { ...task, id: Date.now() } });
  export const updateTask = (id, task) => Promise.resolve({ data: task });
  export const deleteTask = (id) => Promise.resolve();
  