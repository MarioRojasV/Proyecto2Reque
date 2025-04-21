import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Terrenos from './pages/Terrenos';
import AcercaDe from './pages/AcercaDe';
import Cultivos from './pages/Cultivos';
import PlantillaTerreno from './components/CTerrenos/PlantillaPestañaTerrenos';
import Contacto from './pages/Contacto';
import Procesos from './pages/Procesos';

function App() {

  const [terrenos, llenarTerrenos] = useState([]);
  const [ultimoID, llenarID] = useState([]);
  useEffect(() => {
    fetch('/appDB/terrenos.json')
      .then(res => res.json())
      .then(data => {
        llenarTerrenos(data.terrenos);
        llenarID(data.ultimoID)
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Navbar />
      <main style={{}}>
      </main>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/terrenos" element={<Terrenos terrenos={terrenos } llenarTerrenos={llenarTerrenos} llenarID={llenarID}/>} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/acercade" element={<AcercaDe />} />
        <Route path="/cultivos" element={<Cultivos />} />
        <Route path="/terrenos/crear" element={<PlantillaTerreno modo="crear" terrenos={terrenos} ultimoID={ultimoID} llenarTerrenos={llenarTerrenos} llenarID={llenarID}/>} />
        <Route path="/terrenos/editar/:id" element={<PlantillaTerreno modo="editar" terrenos={terrenos} ultimoID={ultimoID} llenarTerrenos={llenarTerrenos} llenarID={llenarID}/>} />
        <Route path="/terrenos/procesos/:id" element={<Procesos terrenos={terrenos} llenarTerrenos={llenarTerrenos}/>} />
      </Routes>
      <Inicio />
    </Router>
  );
}

export default App;
