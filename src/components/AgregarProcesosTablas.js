import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import TablaProcesos from '../components/TablaDatosProcesos';

const AregarProcesosTablas = ({terrenos, llenarTerrenos}) => {
  const [eventos, setEventos] = useState([]);
  const { id, modo } = useParams();
  const [nuevoEvento, setNuevoEvento] = useState({
    fecha: '',
    tipo: '',
    campoExtra: ''
  });

  const labelCampoExtra = modo === 'historialFertilizaciones' ? 'Dosis' : 'Descripción';
  const nombreCampoExtra = modo === 'historialFertilizaciones' ? 'dosis' : 'descripcion';


  const [terreno, setTerreno] = useState({
      id: '',
      nombre: '',
      ubicacion: '',
      area: '',
      estadoCultivo: '',
      cultivoEnProceso: '',
      planSiembraId: '',
      estado: '',
      fechaArado: '',
      fechaRastra: '',
      cal: {},
      riego: {},
      fertilizacion: {},
      historialFertilizaciones: [],
      otrosCuidados: [],
      notas: '',
    });

  useEffect(() => {
      const terrenoSeleccionado = terrenos.find(t => t.id === parseInt(id));
      if (terrenoSeleccionado) {
        setTerreno(terrenoSeleccionado);
      }
    }, [terrenos, id]);

  const handleChange = (e) => {
    setNuevoEvento({
      ...nuevoEvento,
      [e.target.name]: e.target.value
    });
  };

  const agregarEvento = () => {
    if (!nuevoEvento.fecha || !nuevoEvento.tipo || !nuevoEvento[nombreCampoExtra]) return;
    const nuevosEventos = [...(terreno[modo] || []), nuevoEvento];
    const terrenoActualizado = { ...terreno, [modo]: nuevosEventos };

    setTerreno(terrenoActualizado);

    const nuevosTerrenos = terrenos.map(t =>
    t.id === terreno.id ? terrenoActualizado : t
  );

  llenarTerrenos(nuevosTerrenos);

    setNuevoEvento({ fecha: '', tipo: '', [nombreCampoExtra]: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{modo === 'otrosCuidados' ? '➕Agregar cuidado' : '➕Historial fertilizaciones'}</h2>
      <input
        type="date"
        name="fecha"
        value={nuevoEvento.fecha}
        onChange={handleChange}
        placeholder="Fecha"
      />
      <input
        type="text"
        name="tipo"
        value={nuevoEvento.tipo}
        onChange={handleChange}
        placeholder="Tipo"
      />
      <input
        type="text"
        name={nombreCampoExtra}
        value={nuevoEvento[nombreCampoExtra]}
        onChange={handleChange}
        placeholder={labelCampoExtra}
      />
      <button onClick={agregarEvento}>Agregar</button>

      <hr />

      <TablaProcesos
        datos={terreno[modo]}
        columnaExtra={labelCampoExtra}
        campoExtra={nombreCampoExtra}
        anchoTabla="100%"
        altoTabla="300px"
      />
    </div>
  );
};

export default AregarProcesosTablas;
