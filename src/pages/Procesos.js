import React, { useState, useEffect } from 'react';
import BtnRectangRedond from '../components/BotonRectangRedondeado';
import { useNavigate, useParams } from 'react-router-dom';

const Procesos = ({terrenos, llenarTerrenos}) => {

  
  const {id} = useParams();
  const [terreno, setTerreno] = useState({id: '',
    nombre: '',
    ubicacion: '',
    area: '',
    estadoCultivo: '',
    cultivoEnProceso: '',
    planSiembraId: '',
    estado: '',
    labranza: [],
    cal: {},
    riego: {},
    fertilizacion: {},
    historialFertilizaciones: [],
    otrosCuidados: [],
    notas: '',
  });

  const getColor = (estadoCultivo) => {
    if (estadoCultivo === "sin cultivo") return "rgb(126, 126, 126)";
    if (estadoCultivo === "en proceso") return "rgb(235, 185, 21)";
    if (estadoCultivo === "listo para cosechar") return "rgb(31, 145, 37)";
    return "#fff";
  };

  useEffect(() => {
    const terrenoSeleccionado = terrenos.find(t => t.id === parseInt(id));
    if (terrenoSeleccionado) {
      setTerreno(terrenoSeleccionado);
    }
  }, [terrenos, id]);
  

  return (
    <div style={styles.container}>
      <div style={styles.contenedorHorizontal}>
        <div style={styles.square}>
          <div style={styles.conteneVertical}>
            #️⃣ID terreno:
            <div style={styles.textoID}>#{terreno.id}</div>
          </div>
          <div style={styles.conteneVertical}>
            🏷️Nombre del terreno:
            <br></br><div style={styles.conteneTextoInfo}>{terreno.nombre}</div>
          </div>
          <div style={styles.conteneVertical}>
            📍Ubicación:
          <br></br><div style={styles.conteneTextoInfo}>{terreno.ubicacion}</div>
          </div>
          <div style={styles.conteneVertical}>
            📏Área:
            <div style={styles.conteneTextoInfo}>{terreno.area}m²</div>
          </div>
        </div>
      </div>

      <div style={styles.contenedorHorizontal}>
        <div style={styles.square}>
          <div style={styles.simboloCirculo}>
            Cal
          </div>
          <div style={styles.conteneVertical}>
            🏷️Fecha:
            <br></br><div>{terreno.cal["fecha"]}</div>
            <br></br>
            Dosis:
            <br></br><div>{terreno.cal["dosis"]}</div>
          </div>
          <div style={styles.conteneVertical}>
            pH previo:
            <br></br><div>{terreno.cal["phPrevio"]}</div>
            <br></br>
            pH meta:
            <br></br><div>{terreno.cal["phObjetivo"]}</div>
          </div>
        </div>
        <div style={styles.square}>
          Aquí van los procesos 🌱
        </div>
        <div style={styles.square}>
          Aquí van los procesos 🌱
        </div>
      </div>

      <div style={styles.contenedorHorizontal}>
        <div style={styles.square}>
          <div style={{...styles.simboloCirculo, fontSize: '3.5rem', color:getColor(terreno.estadoCultivo)}}>
            ●
          </div>
          <div style={styles.conteneVertical}>
            Cultivo:
            <br></br>
            {terreno.cultivoEnProceso}
          </div>
          Aquí van los procesos 🌱
        </div>
        <div style={styles.square}>
          Aquí van los procesos 🌱
        </div>
      </div>
    </div>
  );
};




const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  square: {
    width: '100%',
    height: '300px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    minWidth: '400px',
  },
  contenedorHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '20px',
  },
  conteneVertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  textoID: {
    color: 'red',
    fontSize: '8.5rem',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  conteneTextoInfo: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '2.5rem',
    width: '240px',
  },
  simboloCirculo: {
    fontSize: '2.5rem',
    marginBottom: '180px',
  },
};


export default Procesos;
