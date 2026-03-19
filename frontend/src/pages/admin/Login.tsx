import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();

      if(data.token) {
        localStorage.setItem("token", data.token);
         navigate("/admin/dashboard");
      }else{
        alert(data.message);
      }
  
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section style={{ padding: "80px 20px", textAlign: "center" }}>
      <h1>Admin Login</h1>

      <form className="admin-form" onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

      </form>
    </section>
  );
}

export default Login;