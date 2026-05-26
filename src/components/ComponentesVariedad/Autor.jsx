import React from 'react';
import './Autor.css';

// 💡 Asegúrate de que aquí diga: nombre, cover, descripcion
function Autor({ nombre, cover, descripcion }) {
  return (
    <div className="card">
      
      <img 
        src={cover} 
        alt={`Retrato de ${nombre}`} // Aquí ya no dirá 'undefined'
        className="card__image" 
      />
      
      <div className="card__content">
        <h3 className="card__title">{nombre}</h3>
        <p className="card__description">{descripcion}</p>
      </div>

    </div>
  );
}

export default Autor;