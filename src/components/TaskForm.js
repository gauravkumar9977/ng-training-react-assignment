import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask, taskToEdit, onClose }) => {
  const [task, setTask] = useState({
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: ''
  });

  useEffect(() => {
    if (taskToEdit) setTask(taskToEdit);
  }, [taskToEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      editTask(task);
    } else {
      addTask(task);
    }
    setTask({
      assignedTo: '',
      status: '',
      dueDate: '',
      priority: '',
      comments: ''
    });
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">

      <div className="form-row">
        <div className="form-group">
          <label>Assigned To <span className="required">*</span></label>
          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned to"
            value={task.assignedTo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status <span className="required">*</span></label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="">Status</option>
            <option value="Complete">Complete</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Priority <span className="required">*</span></label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            required
          >
            <option value="">Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <label>Description</label>
        <textarea
          name="comments"
          placeholder="Description"
          value={task.comments}
          onChange={handleChange}
        />
      </div>

      <div className="form-buttons">
        <button type="button" onClick={onClose}>Cancel</button>
        <button type="submit">{taskToEdit ? 'Save' : 'Save'}</button>
      </div>

      <style jsx>{`
        .task-form {
          display: flex;
          flex-direction: column;
        }

        .task-title {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .form-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .form-group {
          flex: 1;
          margin-right: 10px;
        }

        .form-group:last-child {
          margin-right: 0;
        }

        .full-width {
          width: 100%;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .required {
          color: red;
        }

        input, select, textarea {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        textarea {
          height: 100px;
          resize: none;
        }

        .form-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button[type="button"] {
          background-color: yellow;
          color: black;
        }

        button[type="button"]:hover {
          background-color: #f0e68c;
        }

        button[type="submit"] {
          background-color: green;
          color: white;
        }

        button[type="submit"]:hover {
          background-color: #28a745;
        }
      `}</style>
    </form>
  );
};

export default TaskForm;
