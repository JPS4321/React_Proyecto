import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InventoryForm.css';
import useProduct from '../hooks/useProduct'; // Hook de productos
import useCategory from '../hooks/useCategory'; // Hook de categorías
import useColeccion from '../hooks/useColeccion'; // Hook de colecciones

const InventoryForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(''); // Para la categoría
  const [collectionId, setCollectionId] = useState(''); // Para la colección
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [xs, setXs] = useState(0);
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [l, setL] = useState(0);
  const { createProduct, loading, error } = useProduct();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategory(); // Obtener categorías
  const { collections, loading: collectionsLoading, error: collectionsError } = useColeccion(); // Obtener colecciones
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && description && price && categoryId && collectionId && image1 && image2 && xs >= 0 && s >= 0 && m >= 0 && l >= 0) {
      const productData = {
        nombre: name,
        descripcion: description,
        precio: price,
        id_categoria: categoryId, // Usar el ID de la categoría seleccionada
        id_coleccion: collectionId, // Usar el ID de la colección seleccionada
        imagen: image1,
        secondimage: image2,
        cantidad_xs: xs,
        cantidad_s: s,
        cantidad_m: m,
        cantidad_l: l,
      };

      const result = await createProduct(productData);

      if (result) {
        onClose();
        navigate('/Stock');
      }
    } else {
      alert('Por favor completa todos los campos antes de agregar el producto.');
    }
  };

  const handleCancel = () => {
    onClose();
    navigate('/Stock');
  };

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">AÑADIR PRODUCTO</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Nombre del producto:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" required />
        </label>
        <label className="label">
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input textarea" required />
        </label>
        <label className="label">
          Precio:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input" required />
        </label>
        <label className="label">
          Categoría:
          {categoriesLoading ? (
            <p>Cargando categorías...</p>
          ) : categoriesError ? (
            <p style={{ color: 'red' }}>{categoriesError}</p>
          ) : (
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="input" required>
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
          )}
        </label>
        <label className="label">
          Colección:
          {collectionsLoading ? (
            <p>Cargando colecciones...</p>
          ) : collectionsError ? (
            <p style={{ color: 'red' }}>{collectionsError}</p>
          ) : (
            <select value={collectionId} onChange={(e) => setCollectionId(e.target.value)} className="input" required>
              <option value="">Selecciona una colección</option>
              {collections.map((collection) => (
                <option key={collection.id_coleccion} value={collection.id_coleccion}>
                  {collection.nombre}
                </option>
              ))}
            </select>
          )}
        </label>
        <label className="label">
          Imagen 1:
          <input type="file" onChange={handleImage1Change} className="input-file" required />
          <div className="drag-drop-area">Arrastra una imagen aquí o haz clic para seleccionar.</div>
        </label>
        <label className="label">
          Imagen 2:
          <input type="file" onChange={handleImage2Change} className="input-file" required />
          <div className="drag-drop-area">Arrastra una segunda imagen aquí o haz clic para seleccionar.</div>
        </label>
        <div className="sizes-container">
          <label className="size-label">
            XS:
            <input type="number" value={xs} onChange={(e) => setXs(e.target.value)} className="input-size" min="0" required />
          </label>
          <label className="size-label">
            S:
            <input type="number" value={s} onChange={(e) => setS(e.target.value)} className="input-size" min="0" required />
          </label>
          <label className="size-label">
            M:
            <input type="number" value={m} onChange={(e) => setM(e.target.value)} className="input-size" min="0" required />
          </label>
          <label className="size-label">
            L:
            <input type="number" value={l} onChange={(e) => setL(e.target.value)} className="input-size" min="0" required />
          </label>
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Agregando...' : 'Agregar'}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default InventoryForm;
