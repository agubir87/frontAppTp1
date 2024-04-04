import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getNoticiaById, updateNoticia } from '../../services/services';
import HtmlEditor from '../common/HtmlEditor';

const EditNoticia = () => {
    const [noticia, setNoticia] = useState({
        titulo: '', 
        resumen: '', 
        contenidoHtml: ''
    });
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedNoticia = await getNoticiaById(id);
                setNoticia(fetchedNoticia);
            } catch (error) {
                console.error("Error al obtener la noticia:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Actualizar la noticia
            await updateNoticia(id, {
                tituloNoticia: noticia.titulo,
                resumenNoticia: noticia.resumen,
                contenidoHTML: noticia.contenidoHtml,
            });

            console.log('Noticia actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la noticia:', error);
        }
    };

    const handleHtmlChange = (html) => {
        setNoticia({ ...noticia, contenidoHtml: html });
    };

    return (
        <Container className='my-4'>
            <h1>Editar Noticia</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-3' controlId="titulo">
                    <Form.Label>Título de la Noticia</Form.Label>
                    <Form.Control type="text" name="titulo" value={noticia.titulo} onChange={(e) => setNoticia({ ...noticia, titulo: e.target.value })} />
                </Form.Group>
                <Form.Group className='my-3' controlId="resumen">
                    <Form.Label>Resumen de la Noticia</Form.Label>
                    <Form.Control as="textarea" rows={3} name="resumen" value={noticia.resumen} onChange={(e) => setNoticia({ ...noticia, resumen: e.target.value })} />
                </Form.Group>
                <Form.Group className='my-3' controlId="contenidoHtml">
                    <Form.Label>Contenido HTML de la Noticia</Form.Label>
                    <HtmlEditor
                        initialValue={noticia.contenidoHtml}
                        onHtmlChange={handleHtmlChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-4'>
                    Guardar cambios
                </Button>
            </Form>
        </Container>
    );
};

export default EditNoticia;
