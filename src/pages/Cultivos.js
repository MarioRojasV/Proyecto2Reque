import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Cultivos = () => {
  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem('productos');
    return productosGuardados ? JSON.parse(productosGuardados) : ["Tomate", "Lechuga", "Zanahoria"];
  });
  const [terrenos, setTerrenos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [terrenoSeleccionado, setTerrenoSeleccionado] = useState("");
  const [siembras, setSiembras] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [error, setError] = useState("");
  const [nuevoControl, setNuevoControl] = useState("");
  const [fechaControl, setFechaControl] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarAgregarProducto, setMostrarAgregarProducto] = useState(false);

  useEffect(() => {
    fetch('/appDB/terrenos.json')
      .then(res => res.json())
      .then(data => {
        const nombresTerrenos = data.terrenos.map(terreno => terreno.nombre);
        setTerrenos(nombresTerrenos);
      })
      .catch(err => console.error("Error al cargar los terrenos:", err));
  }, []);

  useEffect(() => {
    fetch('/appDB/cultivos.json')
      .then(res => res.json())
      .then(data => setSiembras(data.siembras))
      .catch(err => console.error("Error al cargar cultivos:", err));
  }, []);

  const handleSeleccionProducto = (event) => {
    setProductoSeleccionado(event.target.value);
  };

  const handleSeleccionTerreno = (event) => {
    setTerrenoSeleccionado(event.target.value);
  };

  const agregarSiembra = () => {
    if (!productoSeleccionado || !terrenoSeleccionado || !fechaInicio || !fechaFin) {
      setError("Por favor, selecciona un producto, un terreno y ambas fechas.");
      return;
    }

    const nuevaSiembra = {
      producto: productoSeleccionado,
      terreno: terrenoSeleccionado,
      fechaInicio: fechaInicio.toLocaleDateString(),
      fechaFin: fechaFin.toLocaleDateString(),
      controles: []
    };

    setSiembras([...siembras, nuevaSiembra]);
    setProductoSeleccionado("");
    setTerrenoSeleccionado("");
    setFechaInicio(null);
    setFechaFin(null);
    setError("");
  };

  const eliminarSiembra = (index) => {
    setSiembras(siembras.filter((_, i) => i !== index));
  };

  const agregarNuevoProducto = () => {
    if (nuevoProducto.trim() === "") return;

    const productosActualizados = [...productos, nuevoProducto.trim()];
    setProductos(productosActualizados);
    localStorage.setItem('productos', JSON.stringify(productosActualizados));
    setNuevoProducto("");
    setMostrarAgregarProducto(false);
  };

  const agregarControl = (index) => {
    if (!nuevoControl || !fechaControl) return;
    const nuevasSiembras = [...siembras];
    nuevasSiembras[index].controles.push({
      tipo: nuevoControl,
      fecha: fechaControl.toLocaleDateString()
    });
    setSiembras(nuevasSiembras);
    setNuevoControl("");
    setFechaControl(null);
  };

  const styles = {
    appContainer: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f2f8f2',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      color: '#2e7d32',
      marginBottom: '30px'
    },
    errorMessage: {
      color: '#d32f2f',
      marginBottom: '20px',
      textAlign: 'center'
    },
    formContainer: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    },
    selectContainer: {
      marginBottom: '20px'
    },
    inputField: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginTop: '5px',
      backgroundColor: '#e8f5e9'
    },
    dateContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px'
    },
    submitBtn: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#43a047',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    siembrasHeader: {
      textAlign: 'center',
      color: '#2e7d32',
      marginBottom: '10px'
    },
    siembrasList: {
      listStyle: 'none',
      padding: '0'
    },
    siembraItem: {
      backgroundColor: '#ffffff',
      padding: '10px',
      marginBottom: '20px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    deleteBtn: {
      backgroundColor: '#e53935',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      float: 'right'
    },
    controlList: {
      marginTop: '10px',
      backgroundColor: '#f1f8e9',
      padding: '10px',
      borderRadius: '4px'
    },
    miniButton: {
      backgroundColor: '#43a047',
      border: 'none',
      borderRadius: '4px',
      padding: '4px 14px',
      fontSize: '12px',
      cursor: 'pointer',
      marginTop: '5px',
      color: 'white'
    }
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.header}>Programación de Siembras</h1>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        style={{ ...styles.submitBtn, marginBottom: '20px', backgroundColor: '#2e7d32' }}
      >
        {mostrarFormulario ? "Cerrar formulario" : "Programar nuevo cultivo"}
      </button>

      {mostrarFormulario && (
        <div style={styles.formContainer}>
          <div style={styles.selectContainer}>
            <label>Selecciona el producto:</label>
            <select value={productoSeleccionado} onChange={handleSeleccionProducto} style={styles.inputField}>
              <option value="">--Elige un producto--</option>
              {productos.map((producto, index) => (
                <option key={index} value={producto}>{producto}</option>
              ))}
            </select>

            <button
              onClick={() => setMostrarAgregarProducto(!mostrarAgregarProducto)}
              style={styles.miniButton}
            >
              {mostrarAgregarProducto ? "Cancelar" : "Agregar nuevo producto"}
            </button>

            {mostrarAgregarProducto && (
              <div style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  value={nuevoProducto}
                  onChange={(e) => setNuevoProducto(e.target.value)}
                  placeholder="Nuevo producto"
                  style={styles.inputField}
                />
                <button
                  onClick={agregarNuevoProducto}
                  style={{ ...styles.submitBtn, marginTop: '10px', backgroundColor: '#388e3c' }}
                >
                  Guardar Producto
                </button>
              </div>
            )}
          </div>

          <div style={styles.selectContainer}>
            <label>Selecciona el terreno:</label>
            <select value={terrenoSeleccionado} onChange={handleSeleccionTerreno} style={styles.inputField}>
              <option value="">--Elige un terreno--</option>
              {terrenos.map((terreno, index) => (
                <option key={index} value={terreno}>{terreno}</option>
              ))}
            </select>
          </div>

          <div style={styles.dateContainer}>
            <div>
              <label>Fecha de inicio:</label>
              <DatePicker
                selected={fechaInicio}
                onChange={date => setFechaInicio(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Inicio del ciclo de siembra"
                className="input-field"
              />
            </div>
            <div>
              <label>Fecha de fin:</label>
              <DatePicker
                selected={fechaFin}
                onChange={date => setFechaFin(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fin del ciclo de siembra"
                className="input-field"
              />
            </div>
          </div>

          <button onClick={agregarSiembra} style={styles.submitBtn}>Agregar Siembra</button>
        </div>
      )}

      <h2 style={styles.siembrasHeader}>Siembras Programadas</h2>
      <ul style={styles.siembrasList}>
        {siembras.map((siembra, index) => (
          <li key={index} style={styles.siembraItem}>
            <button onClick={() => eliminarSiembra(index)} style={styles.deleteBtn}>Eliminar</button>
            <div>
              <strong>{siembra.producto} - {siembra.terreno}</strong><br />
              {siembra.fechaInicio} - {siembra.fechaFin}

              <div style={styles.controlList}>
                <strong>Controles:</strong>
                <ul>
                  {siembra.controles.map((control, i) => (
                    <li key={i}>📋 {control.tipo} - {control.fecha}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  placeholder="Tipo de control (ej. Riego)"
                  value={index === siembras.length - 1 ? nuevoControl : ""}
                  onChange={(e) => setNuevoControl(e.target.value)}
                  style={{ ...styles.inputField, marginBottom: '10px' }}
                />
                <DatePicker
                  selected={index === siembras.length - 1 ? fechaControl : null}
                  onChange={(date) => setFechaControl(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Fecha del control"
                  className="input-field"
                />
                <button
                  onClick={() => agregarControl(index)}
                  style={{ ...styles.submitBtn, marginTop: '10px', backgroundColor: '#558b2f' }}
                >
                  Agregar Control
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cultivos;
