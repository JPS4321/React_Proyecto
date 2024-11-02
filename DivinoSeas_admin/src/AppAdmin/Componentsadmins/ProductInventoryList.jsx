import React, { useState } from "react";
import "../styles/Card.css";
import EditProductInventory from "./EditProductInventory"; 

function ProductInventoryList({ imageSrc, title, sizes, product }) {
  const [showEditForm, setShowEditForm] = useState(false);


  const handleButtonClick = () => {
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  };

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

      {/* Mostrar el formulario de edición si showEditForm es true */}
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
