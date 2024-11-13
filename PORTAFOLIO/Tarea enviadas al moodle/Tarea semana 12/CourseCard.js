import React from 'react';
import '../Cursos.css';

const CourseCard = ({ curso }) => {
    return (
        <div className={`course-card ${curso.color}`}>
            <h3>{curso.nombre}</h3>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${curso.progreso}%` }}></div>
            </div>
            <p className="progress-text">{curso.progreso}% completado</p>
            <div className="student-list">
                <h4>Estudiantes inscritos:</h4>
                <ul>
                    {curso.estudiantes.map((estudiante, index) => (
                        <li key={index}>{estudiante}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CourseCard;
