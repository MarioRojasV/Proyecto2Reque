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
            <span style={{ fontSize: '3.5rem', color: getColor(terreno.estadoCultivo) }}>●</span> Siembra
          </div>
          <div style={styles.conteneVertical}>
            Estado:
            <br></br>
            <div style={styles.contenedorEstado}>{terreno.estadoCultivo}</div>
          </div>
          <div style={styles.conteneVertical}>
            Cultivo:
            <br></br>
            {terreno.cultivoEnProceso}
          </div>
          Aquí van los procesos 🌱
        </div>
        <div style={styles.square}>
          Fertilización
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
        <div style={styles.simboloCirculo}>
            Riego
          </div>
          <div style={styles.conteneVertical}>
            Sistema:
            <br></br><div>{terreno.riego["sistema"]}</div>
            <br></br>
            Frecuencia:
            <br></br><div>Cada <span style={{ color: 'blue' }}>{terreno.riego["frecuenciaDias"]}</span> días</div>
          </div>
          <div style={styles.conteneVertical}>
            Último reigo:
            <br></br><div>{terreno.riego["ultimoRiego"]}</div>
          </div>
        </div>
        <div style={styles.square}>
          Aquí van los procesos 🌱
        </div>
      </div>

      <div style={styles.contenedorHorizontal}>
        <div style={styles.square}>
          <div style={styles.simboloCirculo}>
            Otros <br></br>cuidados
          </div>
          Aquí van los procesos 🌱
        </div>
        <div style={styles.square}>
          <div style={styles.simboloCirculo}>
            Notas
          </div>
          <br></br><div style={styles.contenedorNotas}>{terreno.notas}</div>
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
    // height: '300px',  <- QUITA esta línea
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    minHeight: '300px',
    minWidth: '400px',
    padding: '1rem', // opcional, para que tenga espacio interno
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
  contenedorNotas: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.5rem',
    width: '540px',
  },
  contenedorEstado: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.5rem',
    width: '105px',
  },
};


export default Procesos;
