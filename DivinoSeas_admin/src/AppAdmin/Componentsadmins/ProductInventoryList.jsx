import "../styles/Card.css";

function ProductItem({ imageSrc, title, sizes }) {
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
        <button className="custom-add-button">+</button>
      </div>
      <div className="custom-line-separator"></div> 
    </>
  );
}

export default ProductItem;
