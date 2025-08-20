import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        identifier,
        password,
      });
      alert("Login successful!");
      console.log(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="text"
          placeholder="Email / Username / Phone"
          className="w-full p-2 mb-3 border rounded-lg"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <div className="relative mb-3">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-sm"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded-lg mb-3"
        >
          Login
        </button>

        <a
          href="http://localhost:5000/api/auth/google"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span>Login with Google</span>
        </a>
      </div>
    </div>
  );
}
