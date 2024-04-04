import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getEmpresaById } from '../../services/services';
import { useParams } from 'react-router-dom';

const DetallesEmpresa = () => {
    const [empresa, setEmpresa] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresaData = await getEmpresaById(id);
                setEmpresa(empresaData);
            } catch (error) {
                console.error("Error al obtener las empresas:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!empresa) {
        return <div>Cargando...</div>;
    }

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={8}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">{empresa.denominacion}</Card.Title>
                            <Card.Text>
                                <strong>Teléfono:</strong> {empresa.telefono}<br />
                                <strong>Horario de Atención:</strong> {empresa.horarioAtencion}<br />
                                <strong>Quiénes Somos:</strong> {empresa.quienesSomos}<br />
                                <strong>Latitud:</strong> {empresa.latitud}<br />
                                <strong>Longitud:</strong> {empresa.longitud}<br />
                                <strong>Domicilio:</strong> {empresa.domicilio}<br />
                                <strong>Email:</strong> {empresa.email}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DetallesEmpresa;

