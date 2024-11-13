import React, { useEffect, useState } from 'react';
import './Cursos.css';

const CursoList = () => {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState({});
    const [hoveredCourse, setHoveredCourse] = useState(null);

    useEffect(() => {
        fetch('/cursos.xml')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "application/xml");
                const cursos = Array.from(xmlDoc.getElementsByTagName("curso")).map(curso => {
                    const id = curso.getAttribute("id");
                    const estudiantes = Array.from(curso.getElementsByTagName("estudiante")).map(est => est.textContent);
                    return { id, estudiantes };
                });
                setCourses(cursos);
            })
            .catch(error => console.error('Error al cargar el archivo XML:', error));
    }, []);
    const handleMouseEnter = (courseId) => {
        setHoveredCourse(courseId);
        const course = courses.find(curso => curso.id === courseId);
        setStudents(course ? course.estudiantes : []);
    };
    const handleMouseLeave = () => {
        setHoveredCourse(null);
        setStudents([]);
    };
    return (
        <div className="course-container">
            {courses.map(course => (
                <div 
                    key={course.id} 
                    className={`course-card color${course.id}`}
                    onMouseEnter={() => handleMouseEnter(course.id)}
                    onMouseLeave={handleMouseLeave}
                >
                    <h3>{course.id.replace('-', ' ')}</h3>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: '70%' }}></div>
                    </div>
                    <p className="progress-text">70% completado</p>
                    {hoveredCourse === course.id && (
                        <div className="student-list">
                            <p>Estudiantes inscritos:</p>
                            <ul>
                                {students.map((student, index) => (
                                    <li key={index}>{student}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
export default CursoList;
