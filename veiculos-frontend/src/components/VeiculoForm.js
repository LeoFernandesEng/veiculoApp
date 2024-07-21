import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

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
  const [marcas, setMarcas] = useState(['Ford', 'Honda', 'Toyota', 'Chevrolet', 'Volkswagen']);

  useEffect(() => {
    if (id) {
      fetchVeiculo();
    }
  }, [id]);

  const fetchVeiculo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/veiculos/${id}`);
      setVeiculo(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículo', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVeiculo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
      navigate('/veiculos');
    } catch (error) {
      console.error('Erro ao salvar veículo', error);
    }
  };

  return (
    <Container>
      <h1>{id ? 'Editar Veículo' : 'Novo Veículo'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="veiculo">
          <Form.Label>Nome do Veículo</Form.Label>
          <Form.Control
            type="text"
            name="veiculo"
            value={veiculo.veiculo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="marca">
          <Form.Label>Marca</Form.Label>
          <Form.Select
            name="marca"
            value={veiculo.marca}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma marca</option>
            {marcas.map((marca) => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="ano">
          <Form.Label>Ano</Form.Label>
          <Form.Control
            type="number"
            name="ano"
            value={veiculo.ano}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="cor">
          <Form.Label>Cor</Form.Label>
          <Form.Control
            type="text"
            name="cor"
            value={veiculo.cor}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="descricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            name="descricao"
            value={veiculo.descricao}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="vendido">
          <Form.Check
            type="checkbox"
            name="vendido"
            label="Vendido"
            checked={veiculo.vendido}
            onChange={handleChange}
          />
        </Form.Group>
        <Row className="my-4">
          <Col>
            <Button type="submit" variant="primary">Salvar</Button>
          </Col>
          <Col>
            <Button type="button" variant="secondary" onClick={() => navigate('/veiculos')}>Voltar</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default VeiculoForm;
