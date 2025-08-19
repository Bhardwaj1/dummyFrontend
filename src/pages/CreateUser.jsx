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
  const [bulkMessage, setBulkMessage] = useState("");
  const [isBulkLoading, setIsBulkLoading] = useState(false);
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

  // Handle Bulk Upload (Excel file)
  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsBulkLoading(true);
    setBulkMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/bulk-user-uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setBulkMessage(`✅ ${data.message || "Bulk upload successful!"}`);
        navigate("/users"); // optional: navigate after success
      } else {
        setBulkMessage(`❌ ${data.error || "Bulk upload failed."}`);
      }
    } catch (err) {
      setBulkMessage("⚠️ Failed to upload file. Please try again.");
      console.error(err);
    } finally {
      setIsBulkLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Existing form inputs */}
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

      {/* Bulk Upload Section */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Bulk Upload Users (Excel)</h3>
        <input
          type="file"
          id="bulk-upload"
          accept=".xlsx, .xls,.csv"
          onChange={handleBulkUpload}
          className="hidden"
        />
        <label
          htmlFor="bulk-upload"
          className={`w-full inline-block text-center py-2 px-4 rounded-md cursor-pointer ${
            isBulkLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white transition`}
        >
          {isBulkLoading ? "Uploading..." : "Bulk Upload"}
        </label>
        {bulkMessage && (
          <p className="mt-2 text-center text-sm text-gray-600">{bulkMessage}</p>
        )}
      </div>

      {/* Single user creation message */}
      {message && (
        <p className="mt-3 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}