import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InventoryForm.css';
import useProduct from '../hooks/useProduct'; // Hook de productos
import useCategory from '../hooks/useCategory'; // Hook de categorías
import useColeccion from '../hooks/useColeccion'; // Hook de colecciones
import useColor from '../hooks/useColor'; // Hook de colores
import usePromocion from '../hooks/usePromocion'; // Hook de promociones

const InventoryForm = ({ product = null, onClose = () => {} }) => {
  const [name, setName] = useState(product ? product.nombre : '');
  const [description, setDescription] = useState(product ? product.descripcion : '');
  const [price, setPrice] = useState(product ? product.precio : '');
  const [categoryId, setCategoryId] = useState(product ? product.id_categoria : '');
  const [collectionId, setCollectionId] = useState(product ? product.id_coleccion : '');
  const [colorId, setColorId] = useState(product ? product.id_color : '');
  const [promotionId, setPromotionId] = useState(product ? product.id_promocion : '');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [xs, setXs] = useState(product ? product.cantidad_xs : 0);
  const [s, setS] = useState(product ? product.cantidad_s : 0);
  const [m, setM] = useState(product ? product.cantidad_m : 0);
  const [l, setL] = useState(product ? product.cantidad_l : 0);
  
  const { createProduct, updateProduct, loading, error } = useProduct();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategory();
  const { collections, loading: collectionsLoading, error: collectionsError } = useColeccion();
  const { colors, loading: colorsLoading, error: colorsError } = useColor();
  const { promotions, loading: promotionsLoading, error: promotionsError } = usePromocion();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.nombre);
      setDescription(product.descripcion);
      setPrice(product.precio);
      setCategoryId(product.id_categoria);
      setCollectionId(product.id_coleccion);
      setColorId(product.id_color);
      setPromotionId(product.id_promocion);
      setXs(product.cantidad_xs);
      setS(product.cantidad_s);
      setM(product.cantidad_m);
      setL(product.cantidad_l);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      nombre: name,
      descripcion: description,
      precio: price,
      id_categoria: categoryId,
      id_coleccion: collectionId,
      id_color: colorId,
      id_promocion: promotionId,
      imagen: image1,
      secondimage: image2,
      cantidad_xs: xs,
      cantidad_s: s,
      cantidad_m: m,
      cantidad_l: l,
    };

    if (product) {
      // Actualizar el producto existente
      await updateProduct(product.id_producto, productData);
    } else {
      // Crear un nuevo producto
      await createProduct(productData);
    }

    onClose(); // Cerrar el formulario
    navigate('/Stock'); // Redirigir al listado de productos
  };

  const handleCancel = () => {
    onClose(); // Cerrar el formulario si se cancela
  };

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{product ? 'EDITAR PRODUCTO' : 'AÑADIR PRODUCTO'}</h2>
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
            {loading ? 'Guardando...' : product ? 'Actualizar' : 'Agregar'}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancelar</button>
        </div>
        {error && <p style={{ color: 'red' }}>{typeof error === 'string' ? error : 'Ocurrió un error'}</p>}
      </form>
    </div>
  );
};

export default InventoryForm;
