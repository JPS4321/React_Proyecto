import "../styles/Card.css";

function ProductItem({ imageSrc, title, sizes }) {
  return (
    <>
      <div className="product-item">
        <div className="product-info">
          <span className="product-title">{title}</span>
          <img src={imageSrc} alt={title} className="product-image" />
        </div>
        <div className="product-sizes-container">
          <div className="product-sizes">
            {sizes.map((size, index) => (
              <span key={index} className="size-item">
                <span>{size.count}</span>
                <span>{size.label}</span>
              </span>
            ))}
          </div>
        </div>
        <button className="add-button">+</button>
      </div>
      <div className="lineapuessfek"></div> 
    </>
  );
}

export default ProductItem;
