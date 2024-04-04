import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import ImageUploader from '../common/ImageUploader';
import HtmlEditor from '../common/HtmlEditor';
import { getAllEmpresas, createNoticia, uploadImageToNoticia } from '../../services/services';

const AddNoticia = () => {
    const [titulo, setTitulo] = useState('');
    const [resumen, setResumen] = useState('');
    const [imagen, setImagen] = useState('');
    const [contenidoHtml, setContenidoHtml] = useState('');
    const [empresas, setEmpresas] = useState([]);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!imagen) {
                console.error('No se pudo guardar la noticia debido a la falta de una imagen.');
                return;
            }

            // Obtener la fecha de hoy en formato yyyy-mm-dd
            const today = new Date().toISOString().split('T')[0];

            // Crear la noticia
            const nuevaNoticia = await createNoticia({
                tituloNoticia: titulo,
                resumenNoticia: resumen,
                contenidoHTML: contenidoHtml,
                fechaPublicacion:  today, 
                idEmpresa: empresaSeleccionada
            });

            await uploadImageToNoticia(nuevaNoticia.noticia.id, imagen);
            console.log('Noticia y imagen guardadas correctamente:', nuevaNoticia);
        } catch (error) {
            console.error('Error al guardar la noticia o subir la imagen:', error);
        }
        window.location.href = `/noticia`;
    };

    return (
        <Container className='my-4'>
            <h1>Agregar Noticia</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-3' controlId="titulo">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </Form.Group>
                <Form.Group className='my-3' controlId="resumen">
                    <Form.Label>Resumen</Form.Label>
                    <Form.Control as="textarea" rows={3} value={resumen} onChange={(e) => setResumen(e.target.value)} />
                </Form.Group>
                <Form.Group className='my-3' controlId="imagen">
                    <Form.Label>Imagen</Form.Label>
                    <ImageUploader onUpload={(file) => setImagen(file)} />
                </Form.Group>
                <Form.Group className='my-3' controlId="contenidoHtml">
                    <Form.Label>Contenido HTML</Form.Label>
                    <HtmlEditor onHtmlChange={(html) => setContenidoHtml(html)} />
                </Form.Group>
                <Form.Group className='my-3' controlId="empresaSeleccionada">
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control as="select" value={empresaSeleccionada} onChange={(e) => setEmpresaSeleccionada(e.target.value)}>
                        <option value="">Selecciona una empresa</option>
                        {empresas.map(empresa => (
                            <option key={empresa.id} value={parseInt(empresa.id)}>{empresa.denominacion}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-4'>
                    Guardar
                </Button>
            </Form>
        </Container>
    );
};

export default AddNoticia;