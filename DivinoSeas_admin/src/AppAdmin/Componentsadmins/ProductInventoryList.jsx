import React, { useState, useEffect } from "react";
import "../styles/Card.css";
import EditProductInventory from "./EditProductInventory"; // Importa el nuevo componente

function ProductInventoryList({ imageSrc, title, sizes, product }) {
  const [showEditForm, setShowEditForm] = useState(false);

  // Agrega un efecto para revisar si el producto se recibe correctamente
  useEffect(() => {
    if (!product) {
      console.error("El producto es undefined o null en ProductInventoryList");
    } else {
      console.log("Producto recibido en ProductInventoryList:", product);
    }
  }, [product]);

  const handleButtonClick = () => {
    if (!product) {
      console.error("El producto es undefined o null cuando se hace clic en el botón");
    } else {
      console.log("Botón presionado, producto:", product);
      setShowEditForm(true);
    }
  };

  const handleCloseForm = () => {
    console.log("Formulario de edición cerrado.");
    setShowEditForm(false);
  };

  if (!product) {
    // Renderiza un mensaje de error o nada si el producto es inválido
    return <p>Error: Producto no encontrado o inválido.</p>;
  }

  return (
    <>
      <div className="custom-product-item">
        <div className="custom-product-info">
          <span className="custom-product-title">{title}</span>
          <img src={imageSrc} alt={title} className="custom-product-image" />
        </div>
        <div className="custom-product-sizes-container">
          <div className="custom-product-sizes">
            {sizes.map((size, index) => (
              <span key={index} className="custom-size-item">
                <span>{size.count}</span>
                <span>{size.label}</span>
              </span>
            ))}
          </div>
        </div>
        <button className="custom-add-button" onClick={handleButtonClick}>
          +
        </button>
      </div>
      <div className="custom-line-separator"></div>

      {showEditForm && (
        <EditProductInventory
          product={product}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
}

export default ProductInventoryList;
