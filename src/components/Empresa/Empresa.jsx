import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Modal, Card, Alert } from "react-bootstrap";
import { getAllEmpresas, deleteEmpresa } from "../../services/services";
import { Link } from "react-router-dom";

const Empresa = () => {
    const [empresas, setEmpresas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresasData = await getAllEmpresas();
                setEmpresas(empresasData);
            } catch (error) {
                console.error("Error al obtener las empresas:", error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = (id) => {
        setSelectedEmpresaId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteEmpresa(selectedEmpresaId);
            // Actualizar la lista de empresas después de eliminar
            const updatedEmpresas = empresas.filter((empresa) => empresa.id !== selectedEmpresaId);
            setEmpresas(updatedEmpresas);
            setDeleteSuccess(true);
            setShowModal(false);
        } catch (error) {
            console.error("Error al eliminar la empresa:", error);
            setDeleteError(true);
        }
    };

    return (
        <Container>
            <Row className="my-4 align-items-center">
                <Col>
                    <h1>Lista de Empresas</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="primary">
                        <Link
                            to="/agregarempresa"
                            style={{
                                textDecoration: "none",
                                color: "white",
                                fontWeight: "normal",
                            }}
                        >
                            Agregar Empresa
                        </Link>
                    </Button>
                </Col>
            </Row>
            {deleteSuccess && (
                <Alert variant="success" onClose={() => setDeleteSuccess(false)} dismissible>
                    La empresa se eliminó con éxito.
                </Alert>
            )}
            {deleteError && (
                <Alert variant="danger" onClose={() => setDeleteError(false)} dismissible>
                    Hubo un error al eliminar la empresa. Inténtalo de nuevo más tarde.
                </Alert>
            )}
            {empresas.length === 0 ? (
                <Card>
                    <Card.Body>
                        <Card.Title>No hay noticias</Card.Title>
                        <Card.Text>
                            Parece que no hay ninguna noticia registrada. ¿Por qué no crear una ahora?
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    <Col>
                        <Table striped bordered hover className="text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre de la Empresa</th>
                                    <th>Detalles</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empresas.map((empresa) => (
                                    <tr key={empresa.id}>
                                        <td>{empresa.id}</td>
                                        <td>{empresa.denominacion}</td>
                                        <td>
                                            <Button variant="success">
                                                <Link
                                                    to={`/detallesempresa/${empresa.id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                        fontWeight: "normal",
                                                    }}
                                                >
                                                    Detalles
                                                </Link>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="warning">
                                                <Link
                                                    to={`/editempresa/${empresa.id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                        fontWeight: "normal",
                                                    }}
                                                >
                                                    Editar
                                                </Link>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDeleteClick(empresa.id)}>
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de que quieres eliminar esta empresa?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Empresa;
