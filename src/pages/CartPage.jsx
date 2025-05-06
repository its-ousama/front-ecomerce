import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userCartKey = user ? `cart_${user.email}` : null;

  useEffect(() => {
    if (userCartKey) {
      const storedCart = JSON.parse(localStorage.getItem(userCartKey)) || [];
      setCartItems(storedCart);

      const initialQuantities = {};
      storedCart.forEach((item) => {
        initialQuantities[item.productName] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, []);

  const handleQuantityChange = (name, value) => {
    setQuantities((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleRemove = (productName) => {
    const updatedCart = cartItems.filter((item) => item.productName !== productName);
    setCartItems(updatedCart);
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    const invoiceItems = cartItems.map((item) => ({
      productName: item.productName,
      model: item.model,
      quantity: quantities[item.productName] || 1,
    }));

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/invoices/addInvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          items: invoiceItems,
          customerName: user?.name || "Anonymous",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Checkout failed");
        return;
      }

      localStorage.removeItem(userCartKey);
      navigate("/invoice");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed.");
    }
  };

  return (
    <div className="container py-4">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item.productName} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{item.productName}</strong> ({item.model})
                </span>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    value={quantities[item.productName] || 1}
                    onChange={(e) => handleQuantityChange(item.productName, e.target.value)}
                    min="1"
                    max={item.stock}
                    className="form-control me-2"
                    style={{ width: "70px" }}
                  />
                  <span className="me-2">${item.price}</span>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.productName)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn btn-success" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
