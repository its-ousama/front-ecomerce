import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/fetchProducts.js";
import CardComponent from "../components/CardComponent";

const HomePage = () => {
  const [products, setProducts] = useState([]);

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
              title={product.productName}
              description={product.productDescription}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default HomePage;
