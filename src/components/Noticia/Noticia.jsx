import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Modal, Card, Alert} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllNoticias, deleteNoticia } from "../../services/services"; // Importa la función deleteNoticia

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticias = await getAllNoticias();
        setNoticias(noticias);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNoticia(id);
      // Actualizar el estado de noticias después de eliminar la noticia
      setNoticias(noticias.filter(noticia => noticia.id !== id));
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
    }
  };

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
                  <th>Fecha de publicación</th>
                  <th>Detalle</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {noticias.map((noticia) => (
                  <tr key={noticia.id}>
                    <td>{noticia.id}</td>
                    <td>{noticia.tituloNoticia}</td>
                    <td>{noticia.fechaPublicacion}</td>
                    <td>
                      <Button variant="success">
                        <Link
                          to={`/detalles-noticia/${noticia.id}`}
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
                      <Button variant="danger" onClick={() => handleDelete(noticia.id)}>Eliminar</Button>
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
            <Card.Title>No hay Noticias</Card.Title>
            <Card.Text>
              Parece que no hay ninguna noticia registrada. ¿Por qué no crear una ahora?
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Noticias;