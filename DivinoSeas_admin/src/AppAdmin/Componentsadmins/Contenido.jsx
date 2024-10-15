import React, { useState, useEffect } from "react";
import "../styles/Contenido.css";
import ProductItem from "./ProductInventoryList.jsx"; // Asegúrate de que este componente esté bien exportado
import Statbar from "./Statbar";
import useProduct from "../hooks/useProduct"; // Aquí importamos el hook para obtener productos
import InventoryForm from "./InventoryForm"; // Importa el formulario de inventario

const Contenido = () => {
  const [searchText, setSearchText] = useState("");
  const { getAllProducts, loading, error } = useProduct(); // Llamada al hook
  const [items, setItems] = useState([]); // Estado para los productos
  const [isEditing, setIsEditing] = useState(false); // Estado para abrir/cerrar el formulario
  const [currentProduct, setCurrentProduct] = useState(null); // Producto actual que se está editando

  // useEffect para cargar los productos solo cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setItems(products); // Almacenar los productos en el estado
    };

    fetchProducts();
  }, []); // Array de dependencias vacío para ejecutar solo una vez

  // Filtrado de productos basado en el texto de búsqueda
  const filteredItems = items.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  // Función para manejar la edición de un producto
  const handleEditProduct = (product) => {
    setCurrentProduct(product); // Establecer el producto actual en el estado
    setIsEditing(true); // Mostrar el formulario de edición
  };

  // Función para cerrar el formulario de edición
  const handleCloseForm = () => {
    setIsEditing(false);
    setCurrentProduct(null); // Limpiar el producto actual después de cerrar el formulario
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
              imageSrc={item.imagen} // Usar solo la imagen principal
              title={item.nombre}
              sizes={[
                { count: item.cantidad_xs, label: "XS" },
                { count: item.cantidad_s, label: "S" },
                { count: item.cantidad_m, label: "M" },
                { count: item.cantidad_l, label: "L" },
              ]}
              onEdit={() => handleEditProduct(item)} // Llamar a la función de edición
            />
          ))
        ) : (
          <h1 style={{ textAlign: "center" }}>No se encontraron productos</h1>
        )}
      </div>

      {/* Mostrar el formulario si estamos en modo edición */}
      {isEditing && (
        <InventoryForm
          product={currentProduct} // Pasar el producto actual al formulario
          onClose={handleCloseForm} // Cerrar el formulario
        />
      )}
    </div>
  );
};

export default Contenido;
