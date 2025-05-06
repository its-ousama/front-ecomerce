import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/fetchProducts";
import CardComponent from "../components/CardComponent";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userCartKey = user ? `cart_${user.email}` : null;

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

    if (userCartKey) {
      const storedCart = JSON.parse(localStorage.getItem(userCartKey)) || [];
      setCart(storedCart);
    }
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    if (userCartKey) {
      localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    }
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
    </div>
  );
};

export default HomePage;
