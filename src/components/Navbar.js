import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>CultivaTEC</Link>
      <ul style={styles.links}>
        <li><Link to="/" style={styles.link}>Inicio</Link></li>
        <li><Link to="/Terrenos" style={styles.link}>Terrenos</Link></li>
        <li><Link to="/Cultivos" style={styles.link}>Cultivos</Link></li>
        <li><Link to="/Contacto" style={styles.link}>Contacto</Link></li>
        <li><Link to="/AcercaDe" style={styles.link}>Acerca de...</Link></li>
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
    fontFamily: 'Segoe UI, sans-serif',
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    gap: '2.5rem',
    margin: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontFamily: 'Segoe UI, sans-serif',
  }
};

export default Navbar;
