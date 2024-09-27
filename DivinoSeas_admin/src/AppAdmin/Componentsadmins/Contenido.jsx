import React, { useState, useEffect } from "react";
import "../styles/Contenido.css";
import ProductItem from "./ProductInventoryList.jsx"; // Asegúrate de que este componente esté bien exportado
import Statbar from "./Statbar";
import useProduct from "../hooks/useProduct"; // Aquí importamos el hook para obtener productos

const Contenido = () => {
  const [searchText, setSearchText] = useState("");
  const { getAllProducts, loading, error } = useProduct(); // Llamada al hook
  const [items, setItems] = useState([]); // Estado para los productos

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
            />
          ))
        ) : (
          <h1 style={{ textAlign: "center" }}>No se encontraron productos</h1>
        )}
      </div>
    </div>
  );
};

export default Contenido;
