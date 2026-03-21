import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch {
      setError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto mt-20 max-w-md rounded-xl border border-zinc-800 bg-zinc-900/60 p-8">
      <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
      <p className="mt-2 text-sm text-zinc-300">Secure access for Link United administrators.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Login"}
        </Button>
      </form>
    </section>
  );
}

export default Login;