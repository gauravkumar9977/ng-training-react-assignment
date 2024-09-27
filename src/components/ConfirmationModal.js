import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, taskName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        <button className="close-button" onClick={onClose}>×</button>

        <h2 className="delete-heading">Delete</h2>
        <p>Are you sure you want to delete the task: <strong>{taskName}</strong>?</p>

        <div className="modal-buttons">
          <button 
            type="button" 
            onClick={onConfirm} 
            style={{ backgroundColor: 'yellow', color: 'black' }}
          >
            Yes
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ backgroundColor: 'green', color: 'white' }}
          >
            No
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 400px;
          position: relative;
          text-align: center;
        }

        /* Close Button Styles */
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .close-button:hover {
          color: red;
        }

        .delete-heading {
          background-color: red;
          color: white;
          padding: 10px;
          margin-bottom: 15px;
        }

        p {
          margin-bottom: 20px;
        }

        .modal-buttons {
          display: flex;
          justify-content: space-around;
        }

        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;
