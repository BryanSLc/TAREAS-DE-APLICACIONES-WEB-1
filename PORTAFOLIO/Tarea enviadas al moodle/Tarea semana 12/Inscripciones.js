import React, { useState } from 'react';
import './App.css'; // Asegúrate de tener el archivo CSS correcto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFacebook } from "@fortawesome/free-solid-svg-icons";

const CourseCard = ({ nombreCurso, cuposDisponibles, colorCurso }) => {
  const [cupos, setCupos] = useState(cuposDisponibles);
  const [textoBoton, setTextoBoton] = useState('Unirse');
  const [mensaje, setMensaje] = useState('');

  const manejarClickUnirse = () => {
    if (textoBoton === 'Unirse') {
      if (cupos > 0) {
        setCupos(cupos - 1);
        setMensaje(`Te has inscrito exitosamente en ${nombreCurso}!`);
        setTextoBoton('Retirarse');
      } else {
        setMensaje(`Lo siento, no hay cupo disponible en ${nombreCurso}.`);
      }
    } else {
      setCupos(cupos + 1);
      setMensaje(`Te has retirado de ${nombreCurso}.`);
      setTextoBoton('Unirse');
    }
  };

  return (
    <div className={`course-card ${colorCurso}`}>
      <FontAwesomeIcon icon={faBell} />
      <h3>{nombreCurso}</h3>
      <button className="join-button" onClick={manejarClickUnirse}>{textoBoton}</button>
      <p>Cupos disponibles: <span className="available-spots">{cupos}</span></p>
      <div className="message">{mensaje}</div>
    </div>
  );
};

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  // Estado para manejar los cursos disponibles
  const [courses] = useState([
    { id: 1, name: 'Física General', spots: 35, color: 'green' },
    { id: 2, name: 'Matemáticas Discretas', spots: 0, color: 'red' },
    { id: 3, name: 'Estadística y Probabilidad', spots: 15, color: 'blue' },
    { id: 4, name: 'Sistemas de Comunicaciones', spots: 5, color: 'orange' },
    { id: 5, name: 'Álgebra Lineal', spots: 25, color: 'purple' },
  ]);

  // Función para manejar el registro de un usuario
  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  return (
    <div>
      <div className="empty-gray-bar"></div>
      <header className="top-bar">
        <div className="logo">
          <img src="https://cec.uleam.edu.ec/pluginfile.php/1/theme_klass/footerlogo/1714492023/logo_ULEAM_2017_horizontal.png" alt="Logo de Uleam" />
        </div>
        <nav className="navbar">
          <a href="#">General</a>
          <a href="#">Inscripciones</a>
          <a href="#">Recientes</a>
          <a href="#">Mis cursos</a>
          <a href="#">Calificación</a>
          <FontAwesomeIcon icon={faBell} />
        </nav>
      </header>

      {!isRegistered ? (
        <div className="register-form">
          <h2>Formulario de Registro</h2>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      ) : (
        <div className="course-container">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              nombreCurso={course.name}
              cuposDisponibles={course.spots}
              colorCurso={course.color}
            />
          ))}
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="https://cec.uleam.edu.ec/pluginfile.php/1/theme_klass/footerlogo/1714492023/logo_ULEAM_2017_horizontal.png" alt="Logo de Uleam" />
          </div>
          <div className="contacto">
            <p>
              Contáctanos: <br /> Av. Circunvalación Vía a San Mateo <br />
              incidencias.diit@uleam.edu.ec
            </p>
          </div>
          <div className="social">
            <p>Redes sociales</p>
            <FontAwesomeIcon icon={faFacebook} />
          </div>
        </div>
      </footer>

      <div className="empty-gray-bar-footer"></div>
    </div>
  );
};

export default App;
