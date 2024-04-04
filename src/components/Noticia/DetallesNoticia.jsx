import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { getNoticiaById } from "../../services/services";
import { useParams } from "react-router-dom";

const DetallesNoticia = () => {
  const [noticia, setNoticia] = useState([]);
  const [empresa, setEmpresa] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticiaData = await getNoticiaById(id);
        setNoticia(noticiaData);
        setEmpresa(noticiaData.empresa.denominacion);
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8}>
          <Card className="shadow">
            <Card.Img variant="top" src={noticia.imagenNoticia} style={{ maxHeight: '300px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{noticia.tituloNoticia}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {empresa}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                {noticia.fechaPublicacion}
              </Card.Subtitle>
              <Card.Text>{noticia.resumenNoticia}</Card.Text>
              <Card.Text
                style={{ maxHeight: '300px', overflowY: 'auto' }}
                dangerouslySetInnerHTML={{ __html: noticia.contenidoHtml }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetallesNoticia;
