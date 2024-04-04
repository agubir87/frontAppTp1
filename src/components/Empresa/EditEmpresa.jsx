import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { updateEmpresa, getEmpresaById } from '../../services/services';

const EditEmpresa = () => {
  const { id } = useParams();
  
  const [empresa, setEmpresa] = useState({
    denominacion: '',
    telefono: '',
    horarioAtencion: '',
    quienesSomos: '',
    latitud: 0,
    longitud: 0,
    domicilio: '',
    email: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los datos de la empresa utilizando el ID de la URL
        const fetchedEmpresa = await getEmpresaById(id);
        setEmpresa(fetchedEmpresa);
      } catch (error) {
        console.error("Error al obtener la empresa:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa({ ...empresa, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Actualizar la empresa
      await updateEmpresa(id, empresa);
      setShowSuccess(true);
      setShowError(false);
    } catch (error) {
      setShowSuccess(false);
      setShowError(true);
      console.error('Error al actualizar la empresa:', error);
    }
  };

  return (
    <Container className='my-4'>
      <h1 className="mt-4 mb-4">Editar Empresa</h1>
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          La empresa se actualizó con éxito.
        </Alert>
      )}
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          Hubo un error al actualizar la empresa. Inténtalo de nuevo más tarde.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="denominacion">
          <Form.Label>Denominación</Form.Label>
          <Form.Control type="text" name="denominacion" value={empresa.denominacion} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" name="telefono" value={empresa.telefono} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="horarioAtencion">
          <Form.Label>Horario de Atención</Form.Label>
          <Form.Control type="text" name="horarioAtencion" value={empresa.horarioAtencion} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="quienesSomos">
          <Form.Label>Quiénes Somos</Form.Label>
          <Form.Control as="textarea" rows={3} name="quienesSomos" value={empresa.quienesSomos} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="latitud">
          <Form.Label>Latitud</Form.Label>
          <Form.Control type="number" name="latitud" value={empresa.latitud} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="longitud">
          <Form.Label>Longitud</Form.Label>
          <Form.Control type="number" name="longitud" value={empresa.longitud} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="domicilio">
          <Form.Label>Domicilio</Form.Label>
          <Form.Control type="text" name="domicilio" value={empresa.domicilio} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" value={empresa.email} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditEmpresa;