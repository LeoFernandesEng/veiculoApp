import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VeiculoList = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState('');
    const [cor, setCor] = useState('');

    useEffect(() => {
        fetchVeiculos();
    }, []);

    const fetchVeiculos = async (filters = {}) => {
        try {
            const response = await axios.get('http://localhost:8080/veiculos', { params: filters });
            setVeiculos(response.data);
        } catch (error) {
            console.error('There was an error fetching the veiculos!', error);
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
            fetchVeiculos();
        } catch (error) {
            console.error('There was an error deleting the veiculo!', error);
        }
    };

    return (
        <div>
            <h1>Gerenciamento de Veículos</h1>
            <Button as={Link} to="/veiculos/create" className="mb-3">Criar Novo Veículo</Button>
            <Form>
                <Form.Group controlId="marca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="ano">
                    <Form.Label>Ano</Form.Label>
                    <Form.Control type="number" value={ano} onChange={(e) => setAno(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="cor">
                    <Form.Label>Cor</Form.Label>
                    <Form.Control type="text" value={cor} onChange={(e) => setCor(e.target.value)} />
                </Form.Group>
                <Button onClick={handleFilter} className="mr-2">Filtrar</Button>
                <Button onClick={handleReset} variant="secondary">Resetar</Button>
            </Form>
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
                                <Link to={`/veiculos/${veiculo.id}`} className="btn btn-primary mr-2">Detalhes</Link>
                                <Link to={`/veiculos/${veiculo.id}/edit`} className="btn btn-secondary mr-2">Editar</Link>
                                <Button onClick={() => handleDelete(veiculo.id)} variant="danger">Deletar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default VeiculoList;
