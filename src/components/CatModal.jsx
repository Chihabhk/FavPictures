import React from 'react';

export const CatModal = ({ cat, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{cat.breeds[0].name}</h2>
        <img src={cat.url} alt={cat.breeds[0].name} />
        <p>{cat.breeds[0].description}</p>
      </div>
    </div>
  );
}