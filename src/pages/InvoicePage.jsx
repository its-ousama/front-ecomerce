import { useEffect, useState } from "react";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/invoices/getInvoices`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();
        setInvoices(data.reverse());
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvoices();
  }, [token]);

  return (
    <div className="container py-4">
      <h2>Invoices</h2>
      {invoices.map((invoice, index) => (
        <div key={index} className="card my-3 p-3">
          <p><strong>Date:</strong> {new Date(invoice.date).toLocaleString()}</p>
          <p><strong>Total:</strong> ${invoice.totalAmount}</p>
          <ul>
            {invoice.items.map((item, i) => (
              <li key={i}>
                {item.productName} ({item.model}) x {item.quantity} - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default InvoicePage;
