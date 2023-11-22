import React, { useEffect, useRef } from 'react';

export const CatModal = ({ cat, onClose }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{cat.breeds[0].name}</h2>
        <img src={cat.url} alt={cat.breeds[0].name} />
        <p>{cat.breeds[0].description}</p>
      </div>
    </div>
  );
}