import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Cultivos = () => {
  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem('productos');
    return productosGuardados ? JSON.parse(productosGuardados) : ["Tomate", "Lechuga", "Zanahoria"];
  });
  const [terrenos] = useState(["Terreno Norte", "Terreno Este", "Terreno Sur"]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [terrenoSeleccionado, setTerrenoSeleccionado] = useState("");
  const [siembras, setSiembras] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [error, setError] = useState("");

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
      fechaFin: fechaFin.toLocaleDateString()
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
      marginBottom: '10px',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    deleteBtn: {
      backgroundColor: '#e53935',
      color: 'white',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.header}>Programación de Siembras</h1>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <div style={styles.formContainer}>
        <div style={styles.selectContainer}>
          <label>Selecciona el producto:</label>
          <select
            value={productoSeleccionado}
            onChange={handleSeleccionProducto}
            style={styles.inputField}
          >
            <option value="">--Elige un producto--</option>
            {productos.map((producto, index) => (
              <option key={index} value={producto}>{producto}</option>
            ))}
          </select>
        </div>

        <div style={styles.selectContainer}>
          <label>¿Producto no encontrado? Agrega uno nuevo:</label>
          <input
            type="text"
            value={nuevoProducto}
            onChange={(e) => setNuevoProducto(e.target.value)}
            placeholder="Escribe el nombre del nuevo producto"
            style={styles.inputField}
          />
          <button
            onClick={agregarNuevoProducto}
            style={{ ...styles.submitBtn, marginTop: '10px', backgroundColor: '#388e3c' }}
          >
            Agregar Producto
          </button>
        </div>

        <div style={styles.selectContainer}>
          <label>Selecciona el terreno:</label>
          <select
            value={terrenoSeleccionado}
            onChange={handleSeleccionTerreno}
            style={styles.inputField}
          >
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

      <h2 style={styles.siembrasHeader}>Siembras Programadas</h2>
      <ul style={styles.siembrasList}>
        {siembras.map((siembra, index) => (
          <li key={index} style={styles.siembraItem}>
            <span>{siembra.producto} - {siembra.terreno} - {siembra.fechaInicio} - {siembra.fechaFin}</span>
            <button onClick={() => eliminarSiembra(index)} style={styles.deleteBtn}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cultivos;
