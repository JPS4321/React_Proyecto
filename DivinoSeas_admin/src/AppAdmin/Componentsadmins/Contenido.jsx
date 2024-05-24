import "../styles/Contenido.css";
import ProductItem from "./ProductInventoryList.jsx"

const Contenido = () => {
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

  return (
    <div className="container mx-auto p-4">
      {items.map((item, index) => (
        <ProductItem
          key={index}
          imageSrc={item.imageSrc}
          title={item.title}
          sizes={item.sizes}
        />
      ))}
    </div>
  );
};

export default Contenido;
