import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/Table/DataTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // fetch all users
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  // delete user handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id));
      } else {
        alert("❌ Failed to delete user");
      }
    } catch (err) {
      console.error("❌ Error deleting user:", err);
    }
  };

  // edit user handler
  const handleEdit = (user) => {
    navigate(`/update-user/${user._id}`);
  };

  if (loading) return <p>Loading...</p>;

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "username", label: "Username" },
    { key: "phone", label: "Phone" },
    { key: "role", label: "Role" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <DataTable
        columns={columns}
        data={users}
        onDelete={handleDelete}
        onEdit={handleEdit}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
