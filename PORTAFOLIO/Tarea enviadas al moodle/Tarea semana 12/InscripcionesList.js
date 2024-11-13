// src/components/InscripcionesList.js
import React, { useEffect, useState } from 'react';

const InscripcionesList = () => {
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    const cargarInscripciones = async () => {
      const response = await fetch('/inscripciones.json');
      const data = await response.json();
      setInscripciones(data.inscripciones);
    };

    cargarInscripciones();
  }, []);

  return (
    <div>
      <h1>Lista de Inscripciones</h1>
      <ul>
        {inscripciones.map((inscripcion) => (
          <li key={inscripcion.id}>
            <strong>{inscripcion.nombre}</strong><br />
            Email: {inscripcion.email}<br />
            Curso: {inscripcion.curso}<br />
            Fecha de Inscripción: {inscripcion.fecha_inscripcion}<br />
            Estado: {inscripcion.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InscripcionesList;
