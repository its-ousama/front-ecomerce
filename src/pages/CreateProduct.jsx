import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    brand: "",
    model: "",
    stock: "",
    price: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (user?.role !== "admin") {
      setMessage("Access denied. Admins only.");
      return;
    }
  
    try {
      // Upload image to Cloudinary
      const imgData = new FormData();
      imgData.append("file", image);
      imgData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset
      imgData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name
  
      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: imgData,
      });
  
      const cloudData = await cloudRes.json();
      const imageUrl = cloudData.secure_url;
  
      // Now send product data to your backend with Cloudinary image URL
      const productData = {
        ...formData,
        imageUrl,
      };
  
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
  
      if (!res.ok) throw new Error("Product creation failed");
  
      setMessage("✅ Product created successfully!");
      setFormData({
        productName: "",
        productDescription: "",
        brand: "",
        model: "",
        stock: "",
        price: "",
      });
      setImage(null);
  
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating product.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Product</h2>
      {message && <div className="alert alert-info mt-3">{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-4">
        <div className="mb-3">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            className="form-control"
            rows={3}
            required
          />
        </div>

        <div className="mb-3">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="form-control"
            min="0"
            required
          />
        </div>

        <div className="mb-3">
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="mb-3">
          <label>Image (jpg, png, webp)</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
