import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InventoryForm.css';
import useProduct from '../hooks/useProduct'; // Hook de productos
import useCategory from '../hooks/useCategory'; // Hook de categorías
import useColeccion from '../hooks/useColeccion'; // Hook de colecciones
import useColor from '../hooks/useColor'; // Hook de colores
import usePromocion from '../hooks/usePromocion'; // Hook de promociones

const InventoryForm = ({   onClose = () => {}  }) => {

  console.log("onClose prop recibida:", onClose);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(''); // Para la categoría
  const [collectionId, setCollectionId] = useState(''); // Para la colección
  const [colorId, setColorId] = useState(''); // Para el color
  const [promotionId, setPromotionId] = useState(''); // Para la promoción
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [xs, setXs] = useState(0);
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [l, setL] = useState(0);
  const { createProduct, loading, error } = useProduct();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategory(); // Obtener categorías
  const { collections, loading: collectionsLoading, error: collectionsError } = useColeccion(); // Obtener colecciones
  const { colors, loading: colorsLoading, error: colorsError } = useColor(); // Obtener colores
  const { promotions, loading: promotionsLoading, error: promotionsError } = usePromocion(); // Obtener promociones
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && description && price && categoryId && collectionId && colorId && promotionId && image1 && image2 && xs >= 0 && s >= 0 && m >= 0 && l >= 0) {
      const productData = {
        nombre: name,
        descripcion: description,
        precio: price,
        id_categoria: categoryId, // Usar el ID de la categoría seleccionada
        id_coleccion: collectionId, // Usar el ID de la colección seleccionada
        id_color: colorId, // Usar el ID del color seleccionado
        id_promocion: promotionId, // Usar el ID de la promoción seleccionada
        imagen: image1,
        secondimage: image2,
        cantidad_xs: xs,
        cantidad_s: s,
        cantidad_m: m,
        cantidad_l: l,
      };

      const result = await createProduct(productData);

      if (result) {
        console.log("onclose", onClose)
        onClose();
        navigate('/Stock');
      }
    } else {
      alert('Por favor completa todos los campos antes de agregar el producto.');
    }
  };

  const handleCancel = () => {
    if (typeof onClose === "function") {
      console.log("onClose function llamada");
      onClose();  
    }
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
          Color:
          {colorsLoading ? (
            <p>Cargando colores...</p>
          ) : colorsError ? (
            <p style={{ color: 'red' }}>{colorsError}</p>
          ) : (
            <select value={colorId} onChange={(e) => setColorId(e.target.value)} className="input" required>
              <option value="">Selecciona un color</option>
              {colors.map((color) => (
                <option key={color.id_color} value={color.id_color}>
                  {color.nombre}
                </option>
              ))}
            </select>
          )}
        </label>
        <label className="label">
          Promoción:
          {promotionsLoading ? (
            <p>Cargando promociones...</p>
          ) : promotionsError ? (
            <p style={{ color: 'red' }}>{promotionsError}</p>
          ) : (
            <select value={promotionId} onChange={(e) => setPromotionId(e.target.value)} className="input" required>
              <option value="">Selecciona una promoción</option>
              {promotions.map((promotion) => (
                <option key={promotion.id_promocion} value={promotion.id_promocion}>
                  {promotion.descripcion} - {promotion.descuento}%
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
