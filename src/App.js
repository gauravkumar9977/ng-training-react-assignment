import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import ConfirmationModal from './components/ConfirmationModal';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import './styles/app.css';

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [taskToModify, setTaskToModify] = useState(null);
  const [taskToRemove, setTaskToRemove] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 20;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTaskList(response.data);
  };

  const addNewTask = async (newTask) => {
    const response = await createTask(newTask);
    setTaskList([...taskList, response.data]);
  };

  const modifyTask = async (updatedTask) => {
    await updateTask(updatedTask.id, updatedTask);
    setTaskList(taskList.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setTaskToModify(null);
  };

  const initiateTaskModification = (task) => {
    setTaskToModify(task);
    setIsTaskModalOpen(true);
  };

  const initiateDeleteConfirmation = (task) => {
    setTaskToRemove(task);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmTaskDeletion = async () => {
    if (taskToRemove) {
      await deleteTask(taskToRemove.id);
      setTaskList(taskList.filter(task => task.id !== taskToRemove.id));
      setTaskToRemove(null);
      setIsDeleteConfirmationOpen(false);
    }
  };

  const openNewTaskModal = () => {
    setTaskToModify(null);
    setIsTaskModalOpen(true);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredTasks = taskList.filter(task =>
    task.assignedTo && task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const displayedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  return (
    <div className="app">
      <header className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
        <h1 className="header-title">Tasks</h1>
        <button 
          className="new-task-btn" 
          onClick={openNewTaskModal} 
          style={{ 
            width: '115px', 
            marginTop: '-30px', 
            marginLeft: '650px', 
            backgroundColor: 'yellow', 
            opacity: 0.8 ,
            color: 'black'
          }}
        >
          New Task
        </button>
      </header>

      <input 
        type="text" 
        placeholder="Search              ⌕" 
        value={searchQuery} 
        onChange={handleSearchQueryChange} 
        style={{ width: '15%', marginLeft: '650px', marginTop: '10px' }} 
      />

      <div className="content">
        <TaskList tasks={displayedTasks} deleteTask={initiateDeleteConfirmation} startEditingTask={initiateTaskModification} />
        <p className="total-tasks">Total Tasks: {filteredTasks.length}</p>

        

        <div className="pagination" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button 
            onClick={() => setCurrentPage(1)} 
            disabled={currentPage === 1}
            style={{ opacity: 0.5 }} 
          >
            First
          </button>
          <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
            style={{ opacity: 0.5 }}  
          >
            Prev
          </button>
          <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            style={{ opacity: 0.5 }} 
          > 
            Next
          </button>
          <button 
            onClick={() => setCurrentPage(totalPages)} 
            disabled={currentPage === totalPages}
            style={{ opacity: 0.5 }}  
          >
            Last
          </button>
        </div>
      </div>

      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)}>
        <h2 className="task-title">{taskToModify ? 'Edit Task' : 'New Task'}</h2>
        <TaskForm
          addTask={addNewTask}
          editTask={modifyTask}
          taskToEdit={taskToModify}
          onClose={() => setIsTaskModalOpen(false)}
        />
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={confirmTaskDeletion}
        taskName={taskToRemove ? taskToRemove.assignedTo : ''} 
      />
    </div>
  );
};

export default App;
