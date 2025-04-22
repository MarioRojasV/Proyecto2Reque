import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablaTerrenos from '../components/TablaTerrenos';

const Terrenos = ({terrenos, llenarTerrenos, llenarID}) => {

  console.log('Terrenos recibidos:', terrenos);



    const [terrenoSeleccionado, setTerrenoSeleccionado] = useState(null);
    const navigate = useNavigate();

    const abrirFormularioCrear = () => {
        navigate(`/Terrenos/crear`);
    };

    const abrirFormularioEditar = (idTerreno) => {
      if (idTerreno === null) {
        alert("Por favor, seleccione un terreno primero.");
        return;
      }
      navigate(`/Terrenos/editar/${idTerreno}`);
    };

    const abrirProcesos = (idTerreno) => {
      if (idTerreno === null) {
        alert("Por favor, seleccione un terreno primero.");
        return;
      }
      navigate(`/Terrenos/procesos/${idTerreno}`);
    };

    
    const eliminarTerreno = () => {
      if (terrenoSeleccionado === null) {
        alert("Por favor, seleccione un terreno primero...");
        return;
      }
    
      const confirmacion = window.confirm("¿Estás seguro de eliminar este terreno?");
      if (!confirmacion) return;
    
      const nuevosTerrenos = terrenos.filter(t => t.id !== terrenoSeleccionado);
      llenarTerrenos(nuevosTerrenos);
      setTerrenoSeleccionado(null); // Limpiamos la selección
    };
    

    return (
        <>
          <div style={styles.container}>
            <div style={styles.imageWrapper}>
              <img
                src="/images/imagenTerreno2.jpg"
                alt="Terreno"
                style={styles.image}
              />
              <div style={styles.textOverlay}>Terrenos</div>
            </div>
      
            <div style={styles.cardContainer}>
              <div style={{ ...styles.card, ...styles.cardCrear }} title="Crear terreno" onClick={abrirFormularioCrear}>
                <div style={styles.symbol}> + </div>
              </div>
              <div style={{ ...styles.card, ...styles.cardEditar }} title="Editar terreno" onClick={() => abrirFormularioEditar(terrenoSeleccionado)}>
                <div style={{...styles.symbol, ...styles.symbolEdit}}> ✐ </div>
              </div>
              <div style={{ ...styles.card, ...styles.cardProcesos }} title="Procesos terreno" onClick={() => abrirProcesos(terrenoSeleccionado)}>
                <div style={{...styles.symbol, ...styles.symbolEdit}}> ✐ </div>
              </div>
              <div style={{ ...styles.card, ...styles.cardEliminar }} title="Eliminar terreno" onClick={() => eliminarTerreno()}>
                <div style={styles.symbol}> × </div>
              </div>
            </div>
          

            <TablaTerrenos
              terrenos={terrenos}
              onSeleccionarTerreno={(id) => setTerrenoSeleccionado(id)}
            />




          </div>
        </>
      );
      
};

const styles = {
    container: {
        textAlign: 'center',
        margin: 0,
        padding: 0,
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
    textOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: 'clamp(1.2rem, 12vw, 21rem)',
        fontFamily: '"Georgia", serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    cardContainer: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'right',
        gap: '6.5rem',
        flexWrap: 'wrap',
        marginRight: '2rem',
    },
    card: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontSize: '1.1rem',
        cursor: 'pointer',
        boxShadow: ' 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s',
    },
    cardCrear: {
        backgroundColor: 'rgb(31, 145, 37)',
    },
    cardEditar: {
        backgroundColor: 'rgb(235, 185, 21)',
    },
    cardProcesos: {
      backgroundColor: 'rgb(0, 134, 221)',
    },
    cardEliminar: {
        backgroundColor: 'rgb(221, 21, 21)',
    },
    symbol: {
        marginBottom: '10px',
        color: 'white',
        fontSize: '3.5rem',
        fontFamily: '"Georgia", serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    symbolEdit: {
        fontSize: '2rem',
        margin: '1rem'
    },
};

export default Terrenos;
