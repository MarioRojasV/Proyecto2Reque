import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const camposPorProceso = {
  cal: [
    { nombre: 'fecha', label: 'Fecha' },
    { nombre: 'dosis', label: 'Dosis' },
    { nombre: 'phPrevio', label: 'pH previo' },
    { nombre: 'phObjetivo', label: 'pH objetivo' },
  ],
  riego: [
    { nombre: 'sistema', label: 'Sistema' },
    { nombre: 'frecuenciaDias', label: 'Frecuencia (días)' },
    { nombre: 'ultimoRiego', label: 'Último riego' },
  ],
  labranza: [
    { nombre: 'fechaArado', label: 'Fecha de arado' },
    { nombre: 'fechaRastra', label: 'Fecha de rastra' },
  ],
  notas: [
    { nombre: 'notas', label: 'Notas' }
  ]
};

const EditarProceso = ({ terrenos, llenarTerrenos }) => {
  const { id, campo } = useParams();
  const navigate = useNavigate();
  const terreno = terrenos.find(t => t.id === parseInt(id));

  const [valores, setValores] = useState({});

  useEffect(() => {
    if (terreno) {
      if (campo === 'labranza') {
        setValores({
          fechaArado: terreno.fechaArado || '',
          fechaRastra: terreno.fechaRastra || ''
        });
      } else if (campo === 'notas') {
        setValores({
          notas: terreno.notas || ''
        });
      } else {
        setValores(terreno[campo] || {});
      }
    }
  }, [terreno, campo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    if (!terreno) return;

    const nuevoTerreno = { ...terreno };

    if (campo === 'labranza') {
      nuevoTerreno.fechaArado = valores.fechaArado;
      nuevoTerreno.fechaRastra = valores.fechaRastra;
    } else if (campo === 'notas') {
      nuevoTerreno.notas = valores.notas;
    } else {
      nuevoTerreno[campo] = valores;
    }

    const nuevosTerrenos = terrenos.map(t =>
      t.id === nuevoTerreno.id ? nuevoTerreno : t
    );

    llenarTerrenos(nuevosTerrenos);
    navigate(`/Terrenos/Procesos/${nuevoTerreno.id}`);
  };

  const campos = camposPorProceso[campo] || [];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Editar {campo.charAt(0).toUpperCase() + campo.slice(1)}</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        {campos.map(({ nombre, label }) => (
          <div key={nombre}>
            <label>{label}:</label>
            <input
              type="text"
              name={nombre}
              value={valores[nombre] || ''}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
        ))}
        <button type="button" onClick={handleGuardar} style={{ padding: '0.5rem', marginTop: '1rem' }}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EditarProceso;
