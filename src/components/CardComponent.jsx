const CardComponent = ({ title, description, price, imageUrl }) => {
    return (
      <article className="col">
        <div className="card shadow-sm">
          <img
            src={imageUrl || "https://via.placeholder.com/300x200"}
            className="card-img-top"
            alt={title}
            style={{ minHeight: "200px", objectFit: "contain" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <p className="fw-bold">{price} $</p>
                <button className="btn btn-sm btn-outline-primary">Buy</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };
  
  export default CardComponent;
  