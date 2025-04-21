export default function TablaConEstiloManual() {
    return (
      <div style={styles.contenedorPrincipal}>
        <div style={styles.title}>Contacto</div>
        <div style={styles.subContenedorHorizontal}>
            <div style={styles.simboloDev}>
                {"</>"}
            </div>
            <div style={styles.texto}>
                <strong>Mario Andrés Rojas Varela</strong><br></br>
                Rol: Desarrollador<br></br>
                Tel: +506 8488 4570<br></br>
                Correo: marioand2105@gmail.com
            </div>
        </div>
        <div style={styles.subContenedorHorizontal}>
            <div style={styles.simboloDev}>
                {"</>"}
            </div>
            <div style={styles.texto}>
                <strong>Estaban Rodríguez Salas</strong><br></br>
                Rol: Desarrollador<br></br>
                Tel: +506 8488 4570<br></br>
                Correo: es.rodriguez.tec@gmail.com
            </div>
        </div>
      </div>
    );
  }
  
  const styles = {
    contenedorPrincipal: {
        display: 'flex',
        flexDirection: 'column', // Alineación vertical
        alignItems: 'center',    // Centra horizontalmente
    },
    title: {
        marginTop: '9rem',
        marginBottom: '5rem',
        color: 'black',
        fontSize: 'clamp(3.2rem, 6vw, 6rem)',
        fontFamily: '"Roboto", serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    texto: {
        color: 'black',
        fontSize: '2rem',
        padding: '4rem',
        textAlign: 'left'
    },
    subContenedorHorizontal: {
        display: 'flex',
        alignItems: 'center',    // Centra horizontalmente
    },
    simboloDev: {
        fontSize: 'clamp(1.2rem, 6vw, 6rem)',
        fontFamily: '"Fredoka", sans-serif',
        fontWeight: 'bold',
    },
  };