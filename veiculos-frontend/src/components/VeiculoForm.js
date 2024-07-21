import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const VeiculoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [veiculo, setVeiculo] = useState({
    veiculo: '',
    marca: '',
    ano: '',
    cor: '',
    descricao: '',
    vendido: false,
  });

  const fetchVeiculo = async () => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:8080/veiculos/${id}`);
        setVeiculo(response.data);
      } catch (error) {
        console.error('Erro ao buscar veículo', error);
      }
    }
  };

  useEffect(() => {
    fetchVeiculo();
  }, [id]); // Add id as dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculo((prevVeiculo) => ({
      ...prevVeiculo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/veiculos/${id}`, veiculo);
      } else {
        await axios.post('http://localhost:8080/veiculos', veiculo);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar veículo', error);
    }
  };

  return (
    <Container>
      <h2>{id ? 'Editar Veículo' : 'Criar Veículo'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formVeiculo">
          <Form.Label>Veículo</Form.Label>
          <Form.Control type="text" name="veiculo" value={veiculo.veiculo} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formMarca">
          <Form.Label>Marca</Form.Label>
          <Form.Control type="text" name="marca" value={veiculo.marca} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formAno">
          <Form.Label>Ano</Form.Label>
          <Form.Control type="number" name="ano" value={veiculo.ano} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formCor">
          <Form.Label>Cor</Form.Label>
          <Form.Control type="text" name="cor" value={veiculo.cor} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control type="text" name="descricao" value={veiculo.descricao} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formVendido">
          <Form.Check type="checkbox" label="Vendido" name="vendido" checked={veiculo.vendido} onChange={(e) => setVeiculo({ ...veiculo, vendido: e.target.checked })} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? 'Salvar Alterações' : 'Criar Veículo'}
        </Button>
      </Form>
    </Container>
  );
};

export default VeiculoForm;
