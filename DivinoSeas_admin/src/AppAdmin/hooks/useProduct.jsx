import { useState } from 'react';
import axios from 'axios';

const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Crear un producto
  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('nombre', productData.nombre);
    formData.append('descripcion', productData.descripcion);
    formData.append('precio', productData.precio);
    formData.append('id_categoria', productData.id_categoria);
    formData.append('imagen', productData.imagen);
    formData.append('secondimage', productData.secondimage);
    formData.append('cantidad_xs', productData.cantidad_xs);
    formData.append('cantidad_s', productData.cantidad_s);
    formData.append('cantidad_m', productData.cantidad_m);
    formData.append('cantidad_l', productData.cantidad_l);

    // Agregar color, colección y promoción como un solo valor
    if (productData.colorId) {
      formData.append('id_color', productData.colorId);
    }
    if (productData.collectionId) {
      formData.append('id_coleccion', productData.collectionId);
    }
    if (productData.promotionId) {
      formData.append('id_promocion', productData.promotionId);
    }

    try {
      const response = await axios.post('http://localhost:3000/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al crear el producto:', err);
      setError(err.response?.data || 'Error al crear el producto');
      setLoading(false);
      return null;
    }
  };

  // Obtener todos los productos
  const getAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/productos');
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError(err.response?.data || 'Error al obtener productos');
      setLoading(false);
      return [];
    }
  };

  // Obtener producto por ID
  const getProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/productos/${id}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al obtener producto:', err);
      setError(err.response?.data || 'Error al obtener producto');
      setLoading(false);
      return null;
    }
  };

  // Actualizar un producto
  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('nombre', productData.nombre);
    formData.append('descripcion', productData.descripcion);
    formData.append('precio', productData.precio);
    formData.append('id_categoria', productData.id_categoria);
    formData.append('imagen', productData.imagen);
    formData.append('secondimage', productData.secondimage);
    formData.append('cantidad_xs', productData.cantidad_xs);
    formData.append('cantidad_s', productData.cantidad_s);
    formData.append('cantidad_m', productData.cantidad_m);
    formData.append('cantidad_l', productData.cantidad_l);

    // Agregar color, colección y promoción como un solo valor
    if (productData.colorId) {
      formData.append('id_color', productData.colorId);
    }
    if (productData.collectionId) {
      formData.append('id_coleccion', productData.collectionId);
    }
    if (productData.promotionId) {
      formData.append('id_promocion', productData.promotionId);
    }

    try {
      const response = await axios.put(`http://localhost:3000/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al actualizar el producto:', err);
      setError(err.response?.data || 'Error al actualizar el producto');
      setLoading(false);
      return null;
    }
  };

  return {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    loading,
    error,
  };
};

export default useProduct;
