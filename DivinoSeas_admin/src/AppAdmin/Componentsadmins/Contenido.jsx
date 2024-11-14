import React, { useState, useEffect } from "react";
import "../styles/Contenido.css";
import ProductItem from "./ProductInventoryList.jsx";
import Statbar from "./Statbar";
import useProduct from "../hooks/useProduct";
import EditProductInventory from "./EditProductInventory";

const Contenido = () => {
  const [searchText, setSearchText] = useState("");
  const { getAllProducts, loading, error } = useProduct();
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setItems(products);
    };

    fetchProducts();
  }, []);

  const filteredItems = items.filter((item) =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <div>
      <Statbar onSearch={setSearchText} />
      <div className="container mx-auto p-4">
        {loading ? (
          <h1 style={{ textAlign: "center" }}>Cargando productos...</h1>
        ) : error ? (
          <h1 style={{ textAlign: "center", color: "red" }}>Error: {error}</h1>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <ProductItem
              key={index}
              imageSrc={item.imagen}
              title={item.nombre}
              sizes={[
                { count: item.cantidad_xs, label: "XS" },
                { count: item.cantidad_s, label: "S" },
                { count: item.cantidad_m, label: "M" },
                { count: item.cantidad_l, label: "L" },
              ]}
              product={item}
              onEdit={() => handleEditProduct(item)}
            />
          ))
        ) : (
          <h1 style={{ textAlign: "center" }}>No se encontraron productos</h1>
        )}
      </div>

      {isEditing && (
        <EditProductInventory
          product={currentProduct}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Contenido;
