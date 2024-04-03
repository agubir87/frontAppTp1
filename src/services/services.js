import axios from 'axios';

const URL = "http://localhost:8080";

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