import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const VeiculoDetails = () => {
  const { id } = useParams();
  const [veiculo, setVeiculo] = useState(null);

  const fetchVeiculo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/veiculos/${id}`);
      setVeiculo(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículo', error);
    }
  };

  useEffect(() => {
    fetchVeiculo();
  }, [id]);

  if (!veiculo) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white">{veiculo.veiculo}</Card.Header>
        <Card.Body>
          <Card.Title>{veiculo.marca}</Card.Title>
          <Card.Text>
            Ano: {veiculo.ano}<br />
            Cor: {veiculo.cor}<br />
            Descrição: {veiculo.descricao}<br />
            Vendido: {veiculo.vendido ? 'Sim' : 'Não'}<br />
            Criado em: {new Date(veiculo.created).toLocaleString()}<br />
            Atualizado em: {veiculo.updated ? new Date(veiculo.updated).toLocaleString() : 'N/A'}<br />
          </Card.Text>
          <Link to={`/veiculos/${veiculo.id}/edit`}>
            <Button variant="primary" className="me-2">Editar</Button>
          </Link>
          <Link to="/veiculos">
            <Button variant="secondary">Voltar</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VeiculoDetails;
