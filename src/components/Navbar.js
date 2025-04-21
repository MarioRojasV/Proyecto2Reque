import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>CultivaTEC</Link>
      <ul style={styles.links}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Terrenos">Terrenos</Link></li>
        <li><Link to="/Cultivos">Cultivos</Link></li>
        <li><Link to="/Contacto">Contacto</Link></li>
        <li><Link to="/AcercaDe">Acerca de...</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2e7d32',
    color: 'white',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'Segoe UI, sans-serif', // o cualquier fuente moderna
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    gap: '2.5rem',
    fontColor: 'white',
    margin: 0,
  }
};

export default Navbar;
