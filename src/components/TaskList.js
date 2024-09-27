import React from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, deleteTask, startEditingTask }) => {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th>Actions</th> 
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td style={{ color: 'blue' }}>{task.assignedTo}</td> 
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>{task.comments}</td>
            <td>
              <div className="dropdown">
                <button className="dropdown-button">▼</button>
                <div className="dropdown-content">
                  <button onClick={() => startEditingTask(task)}>Edit</button>
                  <button onClick={() => deleteTask(task)}>Delete</button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      <style jsx>{`
        .task-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        
        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-button {
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          cursor: pointer;
          padding: 5px;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: yellow; /* Changed background color to yellow */
          min-width: 100px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
          flex-direction: column; /* Stack vertically */
        }

        .dropdown:hover .dropdown-content {
          display: flex; /* Show dropdown on hover */
        }

        .dropdown-content button {
          padding: 10px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
        }

        .dropdown-content button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .task-table th, .task-table td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
      `}</style>
    </table>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      assignedTo: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      comments: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  startEditingTask: PropTypes.func.isRequired,
};

export default TaskList;
