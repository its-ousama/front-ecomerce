import React, { useState } from 'react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) throw new Error("Registration failed");
  
      setMessage("Registration successful!");
      setTimeout(() => {
        window.location.href = "/login"; // redirect after 1.5s
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("Registration failed");
    }
};

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUpPage;

  