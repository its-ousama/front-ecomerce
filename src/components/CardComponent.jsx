const CardComponent = ({ title, description, price, imageUrl, product, onAddToCart }) => {
    return (
      <article className="col">
        <div className="card shadow-sm h-100">
        {console.log("Image URL:", imageUrl)}
         <img
          src={imageUrl || "https://via.placeholder.com/300x200"}
          className="card-img-top"
          alt={product.productName}
          style={{ minHeight: "200px", objectFit: "contain" }}
        />
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="fw-bold">{price} $</p>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-sm btn-outline-success w-100"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  };
  
  export default CardComponent;
  