import React from 'react';

const Procesos = ({terrenos, llenarTerrenos}) => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      backgroundColor: '#f0f0f0',
    },
    square: {
      width: '300px',
      height: '300px',
      backgroundColor: '#ffffff',
      border: '2px solid #333',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.square}>
        Aquí van los procesos 🌱
      </div>
    </div>
  );
};

export default Procesos;
