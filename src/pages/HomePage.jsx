import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/fetchProducts";

const HomePage = () => {
  const [products, setProducts] = useState([]); // Empty list to start

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getProducts(); // call fetch when component mounts
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Products</h1>

      {/* If no products yet */}
      {products.length === 0 ? (
        <p className="text-center">No products yet ...</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.productName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">{product.productDescription}</p>
                  <p className="card-text fw-bold">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

  