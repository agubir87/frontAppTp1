import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { getEmpresaById, updateEmpresa } from '../../services/services';
import { useParams } from 'react-router-dom';

const EditEmpresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState({
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
        const empresaData = await getEmpresaById(id);
        setEmpresa(empresaData);
        setFormData({ ...empresaData }); // Llenar el formulario con los datos de la empresa
      } catch (error) {
        console.error('Error al obtener la empresa:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateEmpresa(id, formData); // Actualizar la empresa con los datos del formulario
      setShowSuccess(true);
      setShowError(false);
    } catch (error) {
      console.error('Error al actualizar la empresa:', error);
      setShowSuccess(false);
      setShowError(true);
    }
  };

  if (!empresa) {
    return <div>Cargando...</div>;
  }

  return (
    <Container className='my-4'>
      <h1 className="mt-4 mb-4">Editar Empresa</h1>
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          La empresa se editó con éxito.
        </Alert>
      )}
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          Hubo un error al editar la empresa. Inténtalo de nuevo más tarde.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="denominacion">
          <Form.Label>Denominación</Form.Label>
          <Form.Control type="text" name="denominacion" value={formData.denominacion} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="horarioAtencion">
          <Form.Label>Horario de Atención</Form.Label>
          <Form.Control type="text" name="horarioAtencion" value={formData.horarioAtencion} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="quienesSomos">
          <Form.Label>Quiénes Somos</Form.Label>
          <Form.Control as="textarea" rows={3} name="quienesSomos" value={formData.quienesSomos} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="latitud">
          <Form.Label>Latitud</Form.Label>
          <Form.Control type="number" name="latitud" value={formData.latitud} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="longitud">
          <Form.Label>Longitud</Form.Label>
          <Form.Control type="number" name="longitud" value={formData.longitud} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="domicilio">
          <Form.Label>Domicilio</Form.Label>
          <Form.Control type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" value={formData.email} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </Container>
  );
};

export default EditEmpresa;