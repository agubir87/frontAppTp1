import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Modal, Card, Alert} from "react-bootstrap";
import { Link } from "react-router-dom";

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  // Simulando cargar las noticias
  useEffect(() => {
    // Aquí iría la lógica para cargar las noticias desde algún servicio o fuente de datos
    // Por ahora, simplemente inicializamos el estado con un array vacío
    setNoticias([]);
  }, []);

  return (
    <Container>
      <Row className="my-4 align-items-center">
        <Col>
          <h1>Noticias</h1>
        </Col>
        <Col className="text-end">
          <Button variant="primary">
            <Link
              to="/agregar-noticia"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "normal",
              }}
            >
              Agregar Noticia
            </Link>
          </Button>
        </Col>
      </Row>
      {noticias.length ? (
        <Row>
          <Col>
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Contenido</th>
                  <th>Fecha</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {noticias.map((noticia) => (
                  <tr key={noticia.id}>
                    <td>{noticia.id}</td>
                    <td>{noticia.titulo}</td>
                    <td>{noticia.contenido}</td>
                    <td>{noticia.fecha}</td>
                    <td>
                      <Button variant="warning">
                        <Link
                          to={`/editar-noticia/${noticia.id}`}
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
                      <Button variant="danger">Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>No hay empresas</Card.Title>
            <Card.Text>
              Parece que no hay ninguna empresa registrada. ¿Por qué no crear una ahora?
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Noticias;
