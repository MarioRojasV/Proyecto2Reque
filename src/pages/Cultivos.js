import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Cultivos = () => {
  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem('productos');
    try {
      const parsed = JSON.parse(productosGuardados);
      if (Array.isArray(parsed) && parsed.every(p => typeof p === 'object' && p.nombre)) {
        return parsed;
      }
    } catch (e) {}
    return [
      { nombre: "Tomate", siembra: "Febrero - Abril", cosecha: "Mayo - Julio", epocaIdeal: "Primavera" },
      { nombre: "Lechuga", siembra: "Enero - Marzo", cosecha: "Marzo - Mayo", epocaIdeal: "Invierno" },
      { nombre: "Zanahoria", siembra: "Febrero - Mayo", cosecha: "Junio - Agosto", epocaIdeal: "Primavera" }
    ];
  });

  const [terrenos, setTerrenos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [terrenoSeleccionado, setTerrenoSeleccionado] = useState("");
  const [siembras, setSiembras] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [nuevaSiembra, setNuevaSiembra] = useState("");
  const [nuevaCosecha, setNuevaCosecha] = useState("");
  const [nuevaEpoca, setNuevaEpoca] = useState("");
  const [error, setError] = useState("");
  const [nuevoControl, setNuevoControl] = useState("");
  const [fechaControl, setFechaControl] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarAgregarProducto, setMostrarAgregarProducto] = useState(false);

  useEffect(() => {
    fetch('/appDB/terrenos.json')
      .then(res => res.json())
      .then(data => setTerrenos(data.terrenos.map(t => t.nombre)))
      .catch(err => console.error("Error al cargar terrenos:", err));
  }, []);

  useEffect(() => {
    fetch('/appDB/cultivos.json')
      .then(res => res.json())
      .then(data => setSiembras(data.siembras))
      .catch(err => console.error("Error al cargar cultivos:", err));
  }, []);

  const agregarSiembra = () => {
    if (!productoSeleccionado || !terrenoSeleccionado || !fechaInicio || !fechaFin) {
      setError("Por favor, selecciona un producto, un terreno y ambas fechas.");
      return;
    }

    const producto = productos.find(p => p.nombre === productoSeleccionado);
    const nuevaSiembraObj = {
      producto: productoSeleccionado,
      terreno: terrenoSeleccionado,
      fechaInicio: fechaInicio.toLocaleDateString(),
      fechaFin: fechaFin.toLocaleDateString(),
      siembra: producto?.siembra || "No definido",
      cosecha: producto?.cosecha || "No definido",
      epocaIdeal: producto?.epocaIdeal || "No definida",
      controles: []
    };

    setSiembras([...siembras, nuevaSiembraObj]);
    setProductoSeleccionado("");
    setTerrenoSeleccionado("");
    setFechaInicio(null);
    setFechaFin(null);
    setError("");
  };

  const agregarNuevoProducto = () => {
    if (!nuevoProducto || !nuevaSiembra || !nuevaCosecha || !nuevaEpoca) return;

    const nuevoObj = {
      nombre: nuevoProducto.trim(),
      siembra: nuevaSiembra.trim(),
      cosecha: nuevaCosecha.trim(),
      epocaIdeal: nuevaEpoca.trim()
    };

    const productosActualizados = [...productos, nuevoObj];
    setProductos(productosActualizados);
    localStorage.setItem('productos', JSON.stringify(productosActualizados));

    setNuevoProducto(""); setNuevaSiembra(""); setNuevaCosecha(""); setNuevaEpoca("");
    setMostrarAgregarProducto(false);
  };

  const eliminarSiembra = (index) => {
    setSiembras(siembras.filter((_, i) => i !== index));
  };

  const agregarControl = (index) => {
    if (!nuevoControl || !fechaControl) return;
    const nuevasSiembras = [...siembras];
    nuevasSiembras[index].controles.push({
      tipo: nuevoControl,
      fecha: fechaControl.toLocaleDateString()
    });
    setSiembras(nuevasSiembras);
    setNuevoControl(""); setFechaControl(null);
  };

  const generarLoteId = () => {
  const total = lotes.length + 1;
  return String(total).padStart(9, '0'); // 000000001, 000000002, etc.
};

const terminarCosecha = (index) => {
  const siembra = siembras[index];
  const calidad = prompt("Ingrese la calidad de la cosecha:");
  const comprador = prompt("Ingrese el nombre del comprador (opcional):");

  if (!calidad) {
    alert("Debe ingresar la calidad.");
    return;
  }

  const nuevoLote = {
    ...siembra,
    loteId: generarLoteId(),
    calidad,
    comprador: comprador || "No definido"
  };

  const nuevasSiembras = siembras.filter((_, i) => i !== index);
  setSiembras(nuevasSiembras);
  setLotes([...lotes, nuevoLote]);
};

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f2f8f2' }}>
      <h1 style={{ textAlign: 'center', color: '#2e7d32' }}>Programación de Siembras</h1>

      <button onClick={() => setMostrarFormulario(!mostrarFormulario)} style={{ backgroundColor: '#2e7d32', color: 'white', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: 'none' }}>
        {mostrarFormulario ? "Cerrar formulario" : "Programar nuevo cultivo"}
      </button>

      {mostrarFormulario && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <select value={productoSeleccionado} onChange={(e) => setProductoSeleccionado(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
            <option value="">--Elige un producto--</option>
            {productos.map((producto, i) => <option key={i} value={producto.nombre}>{producto.nombre}</option>)}
          </select>

          <button onClick={() => setMostrarAgregarProducto(!mostrarAgregarProducto)} style={{ marginBottom: '10px', backgroundColor: '#388e3c', color: 'white', border: 'none', borderRadius: '4px', padding: '8px' }}>
            {mostrarAgregarProducto ? "Cancelar" : "Agregar nuevo producto"}
          </button>

          {mostrarAgregarProducto && (
            <div>
              <input type="text" placeholder="Nombre" value={nuevoProducto} onChange={(e) => setNuevoProducto(e.target.value)} style={{ width: '100%', marginBottom: '5px' }} />
              <input type="text" placeholder="Siembra" value={nuevaSiembra} onChange={(e) => setNuevaSiembra(e.target.value)} style={{ width: '100%', marginBottom: '5px' }} />
              <input type="text" placeholder="Cosecha" value={nuevaCosecha} onChange={(e) => setNuevaCosecha(e.target.value)} style={{ width: '100%', marginBottom: '5px' }} />
              <input type="text" placeholder="Época Ideal" value={nuevaEpoca} onChange={(e) => setNuevaEpoca(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />
              <button onClick={agregarNuevoProducto} style={{ backgroundColor: '#43a047', color: 'white', border: 'none', borderRadius: '4px', padding: '8px', width: '100%' }}>Guardar Producto</button>
            </div>
          )}

          <select value={terrenoSeleccionado} onChange={(e) => setTerrenoSeleccionado(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
            <option value="">--Elige un terreno--</option>
            {terrenos.map((terreno, i) => <option key={i} value={terreno}>{terreno}</option>)}
          </select>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <DatePicker selected={fechaInicio} onChange={(date) => setFechaInicio(date)} dateFormat="dd/MM/yyyy" placeholderText="Inicio" />
            <DatePicker selected={fechaFin} onChange={(date) => setFechaFin(date)} dateFormat="dd/MM/yyyy" placeholderText="Fin" />
          </div>

          <button onClick={agregarSiembra} style={{ backgroundColor: '#43a047', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '4px' }}>Agregar Siembra</button>
        </div>
      )}

      <h2 style={{ color: '#2e7d32' }}>Siembras Programadas</h2>
      {siembras.map((siembra, index) => (
        <div key={index} style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          <strong>{siembra.producto} - {siembra.terreno}</strong><br />
          {siembra.fechaInicio} a {siembra.fechaFin}<br />
          🌱 Siembra: {siembra.siembra} | 🌾 Cosecha: {siembra.cosecha} | ☀️ Época: {siembra.epocaIdeal}<br />

          <ul>
            {siembra.controles.map((c, i) => <li key={i}>📋 {c.tipo} - {c.fecha}</li>)}
          </ul>

          <button onClick={() => eliminarSiembra(index)} style={{ backgroundColor: '#d32f2f', color: 'white', marginRight: '10px', border: 'none', padding: '6px', borderRadius: '4px' }}>Eliminar</button>
          <button onClick={() => terminarCosecha(index)} style={{ backgroundColor: '#00796b', color: 'white', border: 'none', padding: '6px', borderRadius: '4px' }}>Terminar Cosecha</button>
        </div>
      ))}

      <h2 style={{ color: '#2e7d32' }}>Control de Lotes</h2>
      {lotes.map((lote, i) => (
        <div key={i} style={{ backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
          <strong>{lote.producto} - {lote.terreno}</strong><br />
          🆔 Lote: {lote.loteId} | Calidad: {lote.calidad} | Comprador: {lote.comprador}<br />
          🌱 Siembra: {lote.siembra} | 🌾 Cosecha: {lote.cosecha} | ☀️ Época: {lote.epocaIdeal}
        </div>
      ))}
    </div>
  );
};

export default Cultivos;
