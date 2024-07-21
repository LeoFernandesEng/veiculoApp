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
  }, [id]); // Add id as dependency

  if (!veiculo) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card>
        <Card.Header>{veiculo.veiculo}</Card.Header>
        <Card.Body>
          <Card.Title>{veiculo.marca}</Card.Title>
          <Card.Text>
            Ano: {veiculo.ano}<br />
            Cor: {veiculo.cor}<br />
            Descrição: {veiculo.descricao}<br />
            Vendido: {veiculo.vendido ? 'Sim' : 'Não'}<br />
            Created: {new Date(veiculo.created).toLocaleString()}<br />
            Updated: {veiculo.updated ? new Date(veiculo.updated).toLocaleString() : 'N/A'}<br />
          </Card.Text>
          <Button as={Link} to={`/veiculos/${veiculo.id}/edit`} variant="primary">Editar</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VeiculoDetails;
