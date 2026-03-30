import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If they somehow land here while logged in, redirect them seamlessly
  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch {
      setError("Invalid administrative credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Cinematic Background Scenery & Lighting */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,151,58,0.3) 2px, rgba(201,151,58,0.3) 3px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[420px] px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <img
                src="/logo.png"
                alt="Link United"
                className="h-32 w-auto max-w-full object-contain sm:h-36 md:h-40 lg:h-44"
              />
            </div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Admin Portal Area
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-[0.15em] text-zinc-400 ml-1">
                Email Address
              </label>
              <input
                className="w-full rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 outline-none backdrop-blur-md transition-all focus:border-gold-400/50 focus:bg-gold-400/[0.02] focus:ring-1 focus:ring-gold-400/50 shadow-inner"
                type="email"
                placeholder="administrator@linkunited.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-[0.15em] text-zinc-400 ml-1">
                Security Key
              </label>
              <input
                className="w-full rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 outline-none backdrop-blur-md transition-all focus:border-gold-400/50 focus:bg-gold-400/[0.02] focus:ring-1 focus:ring-gold-400/50 shadow-inner"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-red-500/10 border border-red-500/20 py-2.5 px-3 text-center"
              >
                <p className="text-xs text-red-400/90 font-medium">
                  {error}
                </p>
              </motion.div>
            )}

            <div className="pt-2">
              <Button type="submit" fullWidth disabled={isSubmitting} className="py-3.5 text-sm tracking-wide font-medium shadow-[0_0_20px_rgba(201,151,58,0.15)] hover:shadow-[0_0_30px_rgba(201,151,58,0.3)]">
                {isSubmitting ? "Authenticating..." : "Secure Login"}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center flex items-center justify-center gap-2 opacity-60">
             <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
             </svg>
             <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-zinc-500">End-to-End Encrypted Session</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;