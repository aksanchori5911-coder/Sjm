
import React, { useState, useEffect } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "PVC Aadhaar Card Print",
    message: "",
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      ...form,
      date: new Date().toLocaleString(),
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    const text = `*New Online Order*%0AName: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}%0ADetails: ${form.message}`;
    window.open(`https://wa.me/919256822911?text=${text}`, "_blank");

    setForm({ name: "", phone: "", service: "PVC Aadhaar Card Print", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans p-4">
      <h1 className="text-4xl font-bold text-center mb-6">SHREE JUJAR E MITRA</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-3 border rounded" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-3 border rounded" required />
        <select name="service" value={form.service} onChange={handleChange} className="p-3 border rounded">
          <option>PVC Aadhaar Card Print</option>
          <option>PAN Card Print</option>
          <option>Photo Print</option>
          <option>Online Form Filling</option>
        </select>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Details" className="p-3 border rounded" />
        <button className="bg-green-600 text-white p-3 rounded">Send Order</button>
      </form>

      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">All Orders</h2>
        <table className="w-full bg-white shadow rounded-xl">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Service</th>
              <th className="p-3 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="text-center">
                <td className="p-2 border">{o.date}</td>
                <td className="p-2 border">{o.name}</td>
                <td className="p-2 border">{o.phone}</td>
                <td className="p-2 border">{o.service}</td>
                <td className="p-2 border">{o.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
