import React, { useState, useEffect } from 'react';
import Linea from '../Linea';
import BtnRectangRedond from '../BotonRectangRedondeado';
import { useNavigate, useParams } from 'react-router-dom';

export default function PlantillaTerreno({ modo, terrenos, ultimoID, llenarTerrenos, llenarID}) {
  console.log("Modo actual:", modo);

  console.log('Terrenos recibidos:', terrenos);
  const estadoInicialTerreno = {
    nombre: '',
    ubicacion: '',
    area: '',
    estadoCultivo: 'sin cultivo',
    cultivoEnProceso: '-',
    planSiembraId: null,
    estado: {
      labranzaRealizada: false,
      calAplicada: false,
      riegoActivo: false
    },
    labranza: [],
    cal: [],
    riego: {
      sistema: 'ninguno',
      frecuenciaDias: null,
      ultimoRiego: null
    },
    fertilizacion: null,
    historialFertilizaciones: [],
    otrosCuidados: [],
    notas: 'Disponible para asignar nuevo plan de siembra.'
  };

  const [terreno, setTerreno] = useState(estadoInicialTerreno);

  useEffect(() => {
    if (modo === 'crear') {
      setTerreno(estadoInicialTerreno);
    }
  }, [modo]);
  
  const navigate = useNavigate();
  const {id} = useParams();
  let nuevoTerreno = {...terreno}

  // Al cargar el componente, si es "editar", rellenamos con datos
  useEffect(() => {
    if (modo === 'editar' && terrenos.length > 0) {
      const terrenoEdit = terrenos.find(t => t.id === parseInt(id));
      if (terrenoEdit) {
        setTerreno(terrenoEdit);
      }
    } else if (modo === 'crear') {
      setTerreno(estadoInicialTerreno);
    }
  }, [modo, terrenos, id]);

  const cerrarEditarCrearTerreno = () => {
    navigate(`/Terrenos`);
  };
  
  const eventoGuardar = () => {
    if (!terreno.nombre || !terreno.ubicacion || !terreno.area) {
      alert ("Hay datos imcompletos...");
      return false;
    }
    console.log("DEBUG ID:", id)
    if (modo === 'editar') {
      nuevoTerreno.id = parseInt(terreno.id);
      const terrenosActualizados = terrenos.map(t =>
        t.id === nuevoTerreno.id ? nuevoTerreno : t
      );
      llenarTerrenos(terrenosActualizados);
    }
    else {
      nuevoTerreno.id = ultimoID + 1;
      llenarID(ultimoID + 1);
      llenarTerrenos([...terrenos, nuevoTerreno]);
    }
    console.log('Id terreno:', terreno.id);
    return true;
  };

  const abrirProcesos = () => {
    if (eventoGuardar()) {
      navigate(`/Terrenos/procesos/${nuevoTerreno.id}`);
    }
  };

  const accionBtnGuardar = () => {
    if (eventoGuardar()) {
      alert ("Datos guardados correctamente...");
      navigate(`/Terrenos`);
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.innerSquare}>
        <h1 style={styles.title}>
          {modo === 'editar' ? '📝Editar Terreno' : '➕Crear Terreno'}
        </h1>
        <div style={styles.verticalContainer}>
        <Linea/>
          <div style={styles.horizontalContainer}>
            <div style={styles.verticalContainer}>
              <label className="block text-gray-700 font-bold">Nombre del terreno:</label>
              <label className="block text-gray-700 font-bold">Señas ubicación:</label>
              <label className="block text-gray-700 font-bold">Área:</label>
              
            </div>

            <div style={styles.verticalContainer}>
              <input style={styles.inputDataSize}
                  type="text"
                  value={terreno.nombre}
                  onChange={(e) => setTerreno(prev => ({...prev, nombre: e.target.value}))}
                  placeholder="Ingrese nombre del terreno"
              />
                <input style={styles.inputDataSize}
                  type="text"
                  value={terreno.ubicacion}
                  onChange={(e) => setTerreno(prev => ({...prev, ubicacion: e.target.value}))}
                  placeholder="Provincia, Cantón, Distrito"
              />
                <input style={styles.inputDataSize}
                  type="text"
                  value={terreno.area}
                  onChange={(e) => setTerreno(prev => ({...prev, area: e.target.value}))}
                  placeholder="Ej: 500 m²"
              />
            </div>
          </div>
          <Linea/>
        </div>
        <br></br>
        <div style={styles.horizontalContainer}>
            <BtnRectangRedond style={{...styles.cardGuardar}} onClick={accionBtnGuardar}>
              {modo === 'editar' ? 'Guardar datos' : 'Crear terreno'}
            </BtnRectangRedond>
            <BtnRectangRedond style={{...styles.cardProcesos}} onClick={() => abrirProcesos()}>
              <span>Procesos</span>
            </BtnRectangRedond>
            <BtnRectangRedond style={{...styles.cardCancelar}} onClick={cerrarEditarCrearTerreno}>
              <span>Cancelar</span>
            </BtnRectangRedond>
          </div>
      </div>
    </div>
  );
}


const styles = {
  mainContainer: {
    padding: '20px'
  },
  title: {
    margin: '100px'
  },
  innerSquare: {
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '1.5rem',
    transition: 'transform 0.2s',
  },
  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    textAlign: 'left',
  },
  horizontalContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
  },
  inputDataSize: {
    height: '30px',
    width: '300px',
  },
  cardGuardar: {
    backgroundColor: 'rgb(31, 145, 37)',
  },
  cardProcesos: {
    backgroundColor: 'rgb(0, 134, 221)',
  },
  cardCancelar: {
    backgroundColor: 'rgb(221, 21, 21)',
  },
};