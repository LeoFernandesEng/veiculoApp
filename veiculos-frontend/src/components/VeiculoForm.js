import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Adicione Link aqui
import { Container, Card, Form, Button } from 'react-bootstrap';

const VeiculoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [veiculo, setVeiculo] = useState({
        veiculo: '',
        marca: '',
        ano: '',
        cor: '',
        descricao: '',
        vendido: false
    });

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
        setVeiculo((prevVeiculo) => ({
            ...prevVeiculo,
            [name]: type === 'checkbox' ? checked : value
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
        <Container className="mt-4">
            <Card>
                <Card.Header>{id ? 'Editar Veículo' : 'Adicionar Novo Veículo'}</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="veiculo">
                            <Form.Label>Veículo</Form.Label>
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
                            <Form.Control
                                type="text"
                                name="marca"
                                value={veiculo.marca}
                                onChange={handleChange}
                                required
                            />
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
                        <Button type="submit" variant="primary" className="me-2">Salvar</Button>
                        <Link to="/veiculos">
                            <Button variant="secondary">Voltar</Button>
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default VeiculoForm;
