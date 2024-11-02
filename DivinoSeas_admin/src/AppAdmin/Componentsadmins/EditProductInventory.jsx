import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InventoryForm.css";
import useCategory from "../hooks/useCategory";
import useColeccion from "../hooks/useColeccion";
import useColor from "../hooks/useColor";
import usePromocion from "../hooks/usePromocion";
import useProduct from "../hooks/useProduct";

const EditProductInventory = ({ product, onClose = () => {} }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [colorId, setColorId] = useState("");
  const [promotionId, setPromotionId] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [xs, setXs] = useState(0);
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [l, setL] = useState(0);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);

  const { updateProduct, loading, error } = useProduct();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategory();
  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useColeccion();
  const { colors, loading: colorsLoading, error: colorsError } = useColor();
  const {
    promotions,
    loading: promotionsLoading,
    error: promotionsError,
  } = usePromocion();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.nombre || "");
      setDescription(product.descripcion || "");
      setPrice(product.precio || "");
      setCategoryId(product.id_categoria || "");
      setCollectionId(product.id_coleccion || "");
      setColorId(product.id_color || "");
      setPromotionId(product.id_promocion || "");
      setXs(product.cantidad_xs || 0);
      setS(product.cantidad_s || 0);
      setM(product.cantidad_m || 0);
      setL(product.cantidad_l || 0);
      setImage1Preview(product.imagen || null);
      setImage2Preview(product.secondimage || null);
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

    try {
      await updateProduct(product.id_producto, productData);
      onClose();
      navigate("/Stock");
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    setImage1(file);
    setImage1Preview(URL.createObjectURL(file));
  };

  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    setImage2(file);
    setImage2Preview(URL.createObjectURL(file));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">EDITAR PRODUCTO</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Nombre del producto:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </label>
        <label className="label">
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input textarea"
            required
          />
        </label>
        <label className="label">
          Precio:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            required
          />
        </label>
        <label className="label">
          Categoría:
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="input"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categoriesLoading ? (
              <option>Cargando categorías...</option>
            ) : categoriesError ? (
              <option style={{ color: "red" }}>Error al cargar categorías</option>
            ) : (
              categories.map((category) => (
                <option key={category.id_categoria} value={category.id_categoria}>
                  {category.nombre}
                </option>
              ))
            )}
          </select>
        </label>
        <label className="label">
          Colección:
          <select
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="input"
          >
            <option value="">Selecciona una colección</option>
            {collectionsLoading ? (
              <option>Cargando colecciones...</option>
            ) : collectionsError ? (
              <option style={{ color: "red" }}>Error al cargar colecciones</option>
            ) : (
              collections.map((collection) => (
                <option key={collection.id_coleccion} value={collection.id_coleccion}>
                  {collection.nombre}
                </option>
              ))
            )}
          </select>
        </label>
        <label className="label">
          Color:
          <select
            value={colorId}
            onChange={(e) => setColorId(e.target.value)}
            className="input"
          >
            <option value="">Selecciona un color</option>
            {colorsLoading ? (
              <option>Cargando colores...</option>
            ) : colorsError ? (
              <option style={{ color: "red" }}>Error al cargar colores</option>
            ) : (
              colors.map((color) => (
                <option key={color.id_color} value={color.id_color}>
                  {color.nombre}
                </option>
              ))
            )}
          </select>
        </label>
        <label className="label">
          Promoción:
          <select
            value={promotionId}
            onChange={(e) => setPromotionId(e.target.value)}
            className="input"
          >
            <option value="">Selecciona una promoción</option>
            {promotionsLoading ? (
              <option>Cargando promociones...</option>
            ) : promotionsError ? (
              <option style={{ color: "red" }}>Error al cargar promociones</option>
            ) : (
              promotions.map((promotion) => (
                <option key={promotion.id_promocion} value={promotion.id_promocion}>
                  {promotion.descripcion} - {promotion.descuento}%
                </option>
              ))
            )}
          </select>
        </label>
        <label className="label">
          Imagen 1:
          {image1Preview && (
            <img
              src={image1Preview}
              alt="Imagen 1"
              className="image-preview"
              style={{ maxWidth: "300px", margin: "10px 0" }}
            />
          )}
          <input type="file" onChange={handleImage1Change} className="input-file" />
        </label>
        <label className="label">
          Imagen 2:
          {image2Preview && (
            <img
              src={image2Preview}
              alt="Imagen 2"
              className="image-preview"
              style={{ maxWidth: "300px", margin: "10px 0" }}
            />
          )}
          <input type="file" onChange={handleImage2Change} className="input-file" />
        </label>
        <div className="sizes-container">
          <label className="size-label">
            XS:
            <input
              type="number"
              value={xs}
              onChange={(e) => setXs(e.target.value)}
              className="input-size"
              min="0"
              required
            />
          </label>
          <label className="size-label">
            S:
            <input
              type="number"
              value={s}
              onChange={(e) => setS(e.target.value)}
              className="input-size"
              min="0"
              required
            />
          </label>
          <label className="size-label">
            M:
            <input
              type="number"
              value={m}
              onChange={(e) => setM(e.target.value)}
              className="input-size"
              min="0"
              required
            />
          </label>
          <label className="size-label">
            L:
            <input
              type="number"
              value={l}
              onChange={(e) => setL(e.target.value)}
              className="input-size"
              min="0"
              required
            />
          </label>
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Guardando..." : "Actualizar"}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancelar
          </button>
        </div>
        {error && (
          <p style={{ color: "red" }}>
            {typeof error === "string" ? error : "Ocurrió un error"}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProductInventory;
