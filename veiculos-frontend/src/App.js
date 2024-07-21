import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VeiculoList from './components/VeiculoList';
import VeiculoDetails from './components/VeiculoDetails';
import VeiculoForm from './components/VeiculoForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<VeiculoList />} />
          <Route path="/veiculos" element={<VeiculoList />} />
          <Route path="/veiculos/:id" element={<VeiculoDetails />} />
          <Route path="/veiculos/:id/edit" element={<VeiculoForm />} />
          <Route path="/veiculos/create" element={<VeiculoForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
