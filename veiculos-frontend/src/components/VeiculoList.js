import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaInfoCircle, FaPlus } from 'react-icons/fa';

const VeiculoList = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState('');
    const [cor, setCor] = useState('');
    const [naoVendidosCount, setNaoVendidosCount] = useState(0);
    const [distribuicaoDecadas, setDistribuicaoDecadas] = useState({});
    const [distribuicaoFabricantes, setDistribuicaoFabricantes] = useState({});
    const [veiculosUltimaSemana, setVeiculosUltimaSemana] = useState([]);

    // Valores predefinidos para marcas
    const marcas = ['Ford', 'Honda', 'Toyota', 'Chevrolet', 'Volkswagen'];

    useEffect(() => {
        fetchVeiculos();
        fetchNaoVendidosCount();
        fetchDistribuicaoDecadas();
        fetchDistribuicaoFabricantes();
        fetchVeiculosUltimaSemana();
    }, []);

    const fetchVeiculos = async (filters = {}) => {
        try {
            const response = await axios.get('http://localhost:8080/veiculos', { params: filters });
            setVeiculos(response.data);
        } catch (error) {
            console.error('There was an error fetching the veiculos!', error);
        }
    };

    const fetchNaoVendidosCount = async () => {
        try {
            const response = await axios.get('http://localhost:8080/veiculos/nao-vendidos/count');
            setNaoVendidosCount(response.data);
        } catch (error) {
            console.error('Erro ao buscar contagem de veículos não vendidos', error);
        }
    };

    const fetchDistribuicaoDecadas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/veiculos/decadas');
            setDistribuicaoDecadas(response.data);
        } catch (error) {
            console.error('Erro ao buscar distribuição por década', error);
        }
    };

    const fetchDistribuicaoFabricantes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/veiculos/fabricantes');
            setDistribuicaoFabricantes(response.data);
        } catch (error) {
            console.error('Erro ao buscar distribuição por fabricante', error);
        }
    };

    const fetchVeiculosUltimaSemana = async () => {
        try {
            const response = await axios.get('http://localhost:8080/veiculos/ultima-semana');
            setVeiculosUltimaSemana(response.data);
        } catch (error) {
            console.error('Erro ao buscar veículos da última semana', error);
        }
    };

    const handleFilter = () => {
        const filters = {};
        if (marca) filters.marca = marca;
        if (ano) filters.ano = ano;
        if (cor) filters.cor = cor;
        fetchVeiculos(filters);
    };

    const handleReset = () => {
        setMarca('');
        setAno('');
        setCor('');
        fetchVeiculos();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/veiculos/${id}`);
            // Atualize apenas a lista principal de veículos, não a lista da última semana
            fetchVeiculos();
        } catch (error) {
            console.error('There was an error deleting the veiculo!', error);
        }
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h1>Gerenciamento de Veículos</h1>
                </Col>
            </Row>

            {/* Formulário de Filtro */}
            <Card className="mb-4">
                <Card.Header>Filtrar Veículos</Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Group controlId="marca">
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Select value={marca} onChange={(e) => setMarca(e.target.value)}>
                                        <option value="">Selecione uma marca</option>
                                        {marcas.map((marca) => (
                                            <option key={marca} value={marca}>{marca}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="ano">
                                    <Form.Label>Ano</Form.Label>
                                    <Form.Control type="number" value={ano} onChange={(e) => setAno(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="cor">
                                    <Form.Label>Cor</Form.Label>
                                    <Form.Control type="text" value={cor} onChange={(e) => setCor(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button onClick={handleFilter} className="mr-2">Filtrar</Button>
                        <Button onClick={handleReset} variant="secondary">Resetar</Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* Contagem de Veículos Não Vendidos */}
            <Card className="mb-4">
                <Card.Header>Estatísticas de Veículos</Card.Header>
                <Card.Body>
                    <h3>Veículos Não Vendidos</h3>
                    <p className="lead">{naoVendidosCount} veículos</p>
                </Card.Body>
            </Card>

            {/* Distribuição por Década */}
            <Card className="mb-4">
                <Card.Header>Distribuição por Década</Card.Header>
                <Card.Body>
                    <ul>
                        {Object.entries(distribuicaoDecadas).map(([decada, count]) => (
                            <li key={decada}>
                                <strong>{decada}:</strong> {count} veículos
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>

            {/* Distribuição por Fabricante */}
            <Card className="mb-4">
                <Card.Header>Distribuição por Fabricante</Card.Header>
                <Card.Body>
                    <ul>
                        {Object.entries(distribuicaoFabricantes).map(([fabricante, count]) => (
                            <li key={fabricante}>
                                <strong>{fabricante}:</strong> {count} veículos
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>

            {/* Veículos Registrados na Última Semana */}
            <Card className="mb-4">
                <Card.Header>Veículos Registrados na Última Semana</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Veículo</th>
                                <th>Marca</th>
                                <th>Ano</th>
                                <th>Cor</th>
                                <th>Descrição</th>
                                <th>Vendido</th>
                                <th>Criado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {veiculosUltimaSemana.map((veiculo) => (
                                <tr key={veiculo.id}>
                                    <td>{veiculo.veiculo}</td>
                                    <td>{veiculo.marca}</td>
                                    <td>{veiculo.ano}</td>
                                    <td>{veiculo.cor}</td>
                                    <td>{veiculo.descricao}</td>
                                    <td>{veiculo.vendido ? 'Sim' : 'Não'}</td>
                                    <td>{new Date(veiculo.created).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Lista de Veículos */}
            <Card>
                <Card.Header>Lista de Veículos</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Veículo</th>
                                <th>Marca</th>
                                <th>Ano</th>
                                <th>Cor</th>
                                <th>Descrição</th>
                                <th>Vendido</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {veiculos.map((veiculo) => (
                                <tr key={veiculo.id}>
                                    <td>{veiculo.veiculo}</td>
                                    <td>{veiculo.marca}</td>
                                    <td>{veiculo.ano}</td>
                                    <td>{veiculo.cor}</td>
                                    <td>{veiculo.descricao}</td>
                                    <td>{veiculo.vendido ? 'Sim' : 'Não'}</td>
                                    <td>
                                        <Link to={`/veiculos/${veiculo.id}`} className="btn btn-info mr-2">
                                            <FaInfoCircle className="mr-1" /> Detalhes
                                        </Link>
                                        <Link to={`/veiculos/${veiculo.id}/edit`} className="btn btn-warning mr-2">
                                            <FaEdit className="mr-1" /> Editar
                                        </Link>
                                        <Button onClick={() => handleDelete(veiculo.id)} variant="danger">
                                            <FaTrash className="mr-1" /> Deletar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Botão para Criar Novo Veículo */}
            <Row className="my-4">
                <Col className="text-center">
                    <Link to="/veiculos/create" className="btn btn-success">
                        <FaPlus className="mr-2" /> Criar Novo Veículo
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default VeiculoList;
