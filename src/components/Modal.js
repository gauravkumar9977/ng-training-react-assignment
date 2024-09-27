// src/components/Modal.js
import React from 'react';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Modal;
