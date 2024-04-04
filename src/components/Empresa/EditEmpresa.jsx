import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getNoticiaById, updateNoticia } from '../../services/services';
import HtmlEditor from '../common/HtmlEditor';

const EditNoticia = () => {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        resumen: '',
        contenidoHtml: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const noticiaData = await getNoticiaById(id);
                setNoticia(noticiaData);
                setFormData({ ...noticiaData }); // Llenar el formulario con los datos de la noticia
            } catch (error) {
                console.error('Error al obtener la noticia:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleHtmlChange = (html) => {
        setFormData({ ...formData, contenidoHtml: html });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateNoticia(id, formData); 
            setShowSuccess(true);
            setShowError(false);
        } catch (error) {
            console.error('Error al actualizar la noticia:', error);
            setShowSuccess(false);
            setShowError(true);
        }
    };

    if (!noticia) {
        return <div>Cargando...</div>;
    }

    return (
        <Container className='my-4'>
            <h1 className="mt-4 mb-4">Editar Noticia</h1>
            {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                    La noticia se editó con éxito.
                </Alert>
            )}
            {showError && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                    Hubo un error al editar la noticia. Inténtalo de nuevo más tarde.
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="titulo">
                    <Form.Label>Título de la Noticia</Form.Label>
                    <Form.Control type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="resumen">
                    <Form.Label>Resumen de la Noticia</Form.Label>
                    <Form.Control as="textarea" rows={3} name="resumen" value={formData.resumen} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contenidoHtml">
                    <Form.Label>Contenido HTML de la Noticia</Form.Label>
                    <HtmlEditor
                        initialValue={formData.contenidoHtml}
                        onHtmlChange={handleHtmlChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar cambios
                </Button>
            </Form>
        </Container>
    );
};

export default EditNoticia;
