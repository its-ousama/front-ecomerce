import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/fetchProducts";
import CardComponent from "../components/CardComponent";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.productName} added to cart`);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Products</h1>

      {products.length === 0 ? (
        <p className="text-center">No products found...</p>
      ) : (
        <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {products.map((product) => (
            <CardComponent
              key={product._id}
              product={product}
              title={product.productName}
              description={product.productDescription}
              price={product.price}
              imageUrl={product.imageUrl}
              onAddToCart={handleAddToCart}
            />
          ))}
        </section>
      )}

      {/* Preview Cart Below */}
      <div className="mt-5">
        <h3>Cart Preview</h3>
        {cart.length === 0 ? (
          <p>No items yet</p>
        ) : (
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.productName} - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
