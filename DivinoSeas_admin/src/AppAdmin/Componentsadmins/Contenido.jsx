import React, { useState } from "react";
import "../styles/Contenido.css";
import ProductItem from "./ProductInventoryList.jsx";
import Statbar from "./Statbar";

const Contenido = () => {
  const [searchText, setSearchText] = useState("");

  const items = [
    {
      imageSrc: "https://placehold.co/150x150",
      title: "Ana de Bretaña Blue atoll TOP",
      sizes: [
        { count: 7, label: "XS" },
        { count: 8, label: "S" },
        { count: 5, label: "M" },
        { count: 3, label: "L" },
      ],
    },
    {
      imageSrc: "https://placehold.co/150x150",
      title: "Ana de Bretaña Blue atoll BOTTOM",
      sizes: [
        { count: 7, label: "XS" },
        { count: 8, label: "S" },
        { count: 5, label: "M" },
        { count: 3, label: "L" },
      ],
    },
  ];

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Statbar onSearch={setSearchText} />
      <div className="container mx-auto p-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <ProductItem
              key={index}
              imageSrc={item.imageSrc}
              title={item.title}
              sizes={item.sizes}
            />
          ))
        ) : (
          <h1 style={{ textAlign: 'center' }}>No se encontraron productos</h1>
        )}
      </div>
    </div>
  );
};

export default Contenido;
