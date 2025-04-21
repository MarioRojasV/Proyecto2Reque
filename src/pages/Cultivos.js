export default function TablaConEstiloManual() {
    return (
      <div style={styles.contenedorPrincipal}>
        <div style={styles.title}>CultivaTEC</div>
        <div style={styles.texto}><strong>CultivaTEC</strong> CultivaTEC es una aplicación web diseñada para apoyar la gestión agrícola de forma moderna, eficiente y accesible. Nuestra plataforma permite llevar
  un control detallado de terrenos y cultivos y todos los procesos relacionados a los mismos, facilitando así la toma de decisiones informadas para
  productores y emprendedores del sector agrícola. Con una interfaz amigable y herramientas intuitivas, CultivaTEC busca impulsar la innovación
  tecnológica en el campo costarricense, promoviendo prácticas sostenibles y el crecimiento del agro.</div>
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
      color: 'black',
      fontSize: 'clamp(1.2rem, 6vw, 6rem)',
      fontFamily: '"Roboto", serif',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    texto: {
      marginTop: '1rem',       // Espacio entre los elementos
      color: 'black',
      fontSize: '2rem',
      padding: '4rem',
      textAlign: 'justify'
    },
  };
  
  
  /*
  CultivaTEC es una aplicación web diseñada para apoyar la gestión agrícola de forma moderna, eficiente y accesible. Nuestra plataforma permite llevar
  un control detallado de terrenos y cultivos y todos los procesos relacionados a los mismos, facilitando así la toma de decisiones informadas para
  productores y emprendedores del sector agrícola. Con una interfaz amigable y herramientas intuitivas, CultivaTEC busca impulsar la innovación
  tecnológica en el campo costarricense, promoviendo prácticas sostenibles y el crecimiento del agro.*/