import { createBrowserRouter, RouterProvider, Outlet, NavLink } from "react-router-dom";
import CreateUser from "./pages/CreateUser.jsx";
import Users from "./pages/Users.jsx";
import UpdateUser from "./pages/UpdateUser.jsx";
import ExcelUpload from "./pages/UploadBulkUser/UploadBulkUser.jsx";

function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-4 font-bold text-xl border-b">User Dashboard</div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/create-user"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            Create User
          </NavLink>

          <NavLink
            to="/update-user"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            Update User
          </NavLink>
        </nav>
      </aside>

      {/* Mobile Sidebar (collapsible) */}
      <div className="md:hidden w-full bg-white shadow-md flex justify-around p-2 fixed bottom-0 left-0 z-50">
        <NavLink to="/" className="text-gray-600 hover:text-blue-600">Home</NavLink>
        <NavLink to="/users" className="text-gray-600 hover:text-blue-600">Users</NavLink>
        <NavLink to="/create-user" className="text-gray-600 hover:text-blue-600">Create</NavLink>
        <NavLink to="/create-user" className="text-gray-600 hover:text-blue-600">Update</NavLink>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <h1 className="text-2xl font-bold">Welcome Home</h1> },
      { path: "/users", element: <Users /> },
      { path: "/create-user", element: <CreateUser /> },
      {path:"/update-user",element:<UpdateUser/>},
      {path:'/upload-excel',element:<ExcelUpload/>}
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
