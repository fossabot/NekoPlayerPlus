import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import logoEletron from './electron.png';
import logoEslint from './eslint.png';
import logoRouter from './react-router.png';
import Rutas from './Router/Rutas';
 import Counter from "./View/contador"



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
         <Counter />
         </header>
        <h1>Ejemplo de uso de reac router</h1>
        <div>
          <Rutas />
        </div>
      </div>
    </Router>
  );
}

export default App;
