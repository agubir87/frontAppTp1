import axios from 'axios';

const URL = "http://localhost:8080";

// EMPRESAS

export const createEmpresa = async (empresaData) => {
  try {
    const response = await axios.post(`${URL}/empresa`, empresaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllEmpresas = async () => {
  try {
    const response = await axios.get(`${URL}/empresa`);
    return response.data.empresas;
  } catch (error) {
    throw error;
  }
};

export const getEmpresaById = async (id) => {
  try {
    const response = await axios.get(`${URL}/empresa/${id}`);
    return response.data.empresa;
  } catch (error) {
    throw error;
  }
};

export const updateEmpresa = async (id, empresaData) => {
  try {
    const response = await axios.put(`${URL}/empresa/${id}`, empresaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmpresa = async (id) => {
  try {
    const response = await axios.delete(`${URL}/empresa/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// NOTICIAS

export const getAllNoticias = async () => {
  try {
    const response = await axios.get(`${URL}/noticia`);
    return response.data.noticias;
  } catch (error) {
    throw error;
  }
};

export const getNoticiaById = async (id) => {
  try {
    const response = await axios.get(`${URL}/noticia/${id}`);
    return response.data.noticia;
  } catch (error) {
    throw error;
  }
};

export const deleteNoticia = async (id) => {
  try {
    const response = await axios.delete(`${URL}/noticia/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNoticia = async (noticiaData) => {
  try {
    const response = await axios.post(`${URL}/noticia`, noticiaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const uploadImageToNoticia = async (idNoticia, imagen) => {
  try {
    const formData = new FormData();
    formData.append('file', imagen);

    const response = await axios.post(`${URL}/upload-image/${idNoticia}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 200) {
      // Manejar la respuesta exitosa aquí
      console.log('Imagen subida correctamente');
      return response.data;
    } else {
      // Si la respuesta no es 200, lanzar un error
      throw new Error('La imagen no se pudo subir correctamente');
    }
  } catch (error) {
    throw error;
  }
};


export const updateNoticia = async (id, noticiaData) => {
  try {
    const response = await axios.put(`${URL}/noticia/${id}`, noticiaData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default { createEmpresa, getAllEmpresas, getEmpresaById, updateEmpresa, deleteEmpresa, getAllNoticias, getNoticiaById, deleteNoticia, createNoticia, uploadImageToNoticia, updateNoticia };
