import React from 'react';
import '../../css/ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>
            Annulla
          </button>
          <button className="modal-confirm" onClick={onConfirm}>
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
