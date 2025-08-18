import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ User created successfully!");
        setFormData({
          name: "",
          email: "",
          username: "",
          phone: "",
          password: "",
        });
        navigate("/users"); // optional navigation
      } else {
        setMessage(`❌ ${data.error || "Failed to create user."}`);
      }
    } catch (err) {
      setMessage("⚠️ Something went wrong.");
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </form>
      {message && (
        <p className="mt-3 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
