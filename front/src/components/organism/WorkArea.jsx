import React, { useState, useEffect } from 'react';
import Navbar from '../molecules/Navbar';
import Plus from '../../assets/img/add_circle.svg';
import Timer from '../../assets/img/timer.svg';
import List from '../../assets/img/note.svg';
import Rename from '../../assets/img/rename.svg';

function WorkArea() {
  const [tareas, setTareas] = useState([]);
  const [newTarea, setNewTarea] = useState('');
  const [tiempos, setTiempos] = useState({});
  const [intervals, setIntervals] = useState({});
  const [activeTaskId, setActiveTaskId] = useState(null);

  const handleInputChange = (event) => {
    setNewTarea(event.target.value);
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tareas/agregar?nombre=${encodeURIComponent(newTarea)}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('La respuesta de la red no fue satisfactoria');
      }

      await fetchTareas();
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const fetchTareas = async () => {
    try {
      const response = await fetch('http://localhost:3000/tareas');
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue satisfactoria');
      }
      const responseData = await response.json();
      setTareas(responseData);
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
      setTareas([]);
    }
  };

  const editTask = async (id, newName) => {
    try {
      const response = await fetch(`http://localhost:3000/tareas/editar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: newName }),
      });

      if (!response.ok) {
        throw new Error('La respuesta de la red no fue satisfactoria');
      }

      await fetchTareas();
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const startTimer = (id) => {
    if (!intervals[id]) {
      const intervalId = setInterval(() => {
        setTiempos((prevTiempos) => ({
          ...prevTiempos,
          [id]: (prevTiempos[id] || 0) + 1,
        }));
      }, 1000);

      setIntervals((prevIntervals) => ({
        ...prevIntervals,
        [id]: intervalId,
      }));
    }
  };

  const stopTimer = (id) => {
    clearInterval(intervals[id]);
    setIntervals((prevIntervals) => ({
      ...prevIntervals,
      [id]: null,
    }));
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes}:${secs}`;
  };

  const handleFinalizar = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tareas/finalizar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      });
  
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue satisfactoria');
      }
  
      await fetchTareas();
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };
  

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <main className="workArea">
      <Navbar />
      <div className="containerWorkArea">
        <div className="navSpace">
          <ul>
            <li className="list-container">
              <a href="#" className="links">
                <img src={Timer} alt="Icono de Temporizador" />
                Control de Tareas
              </a>
            </li>
            <li className="list-container">
              <a href="#" className="links">
                <img src={List} alt="Icono de Lista" />
                Tareas Completadas
              </a>
            </li>
          </ul>
        </div>
        <div className="workSpace">
          <div className="task-form">
            <div className="img-plus">
              <img src={Plus} alt="Icono de Agregar" />
            </div>
            <input
              type="text"
              id="taskName"
              value={newTarea}
              onChange={handleInputChange}
              className="taskName"
              placeholder="Nombre de la Tarea"
            />
            <h3 className="space">||</h3>
            <button id="addTask" onClick={handleAdd}>
              Agregar Tarea
            </button>
          </div>
          <div className="containerTaskList">
            <header className="Title-Head-Task">
              <h3>Tareas</h3>
            </header>
            <div id="taskList" className="task-list">
              <div className="empty-task-list" id="container-tasks">
                <table>
                  <tbody>
                    {tareas.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="no-tasks">
                          No hay tareas
                        </td>
                      </tr>
                    ) : (
                      tareas.map((tarea) => (
                        <tr key={tarea.id}>
                          <td>
                            <img
                              onClick={() => {
                                const newTaskName = prompt('Ingresa el nuevo nombre de la tarea:');
                                if (newTaskName !== null) {
                                  editTask(tarea.id, newTaskName);
                                }
                              }}
                              src={Rename}
                              alt="Editar"
                            />
                          </td>
                          <td colSpan="2">
                            <span>{tarea.nombre}</span>
                          </td>
                          <td>
                            <h3 className="space">||</h3>
                          </td>
                          <td>
                            {tarea.completed ? (
                              <span>Finalizada</span>
                            ) : tiempos[tarea.id] ? (
                              <span>{formatTime(tiempos[tarea.id])}</span>
                            ) : (
                              <span>{tarea.tiempo}</span>
                            )}
                            {activeTaskId === tarea.id ? (
                              <button
                                className="button-fin"
                                onClick={() => stopTimer(tarea.id)}
                              >
                                Detener
                              </button>
                            ) : (
                              <button
                                className="button-renu"
                                onClick={() => {
                                  startTimer(tarea.id);
                                  setActiveTaskId(tarea.id);
                                }}
                              >
                                Empezar
                              </button>
                            )}
                            {!tarea.completed && (
                              <button
                                className="button-finalizar"
                                onClick={() => handleFinalizar(tarea.id)}
                              >
                                Finalizar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default WorkArea;
