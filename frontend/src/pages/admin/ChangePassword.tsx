import { useState } from "react";
import { authService } from "../../services/auth.service";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.changePassword({ currentPassword, newPassword });
      setSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setError(msg || "Could not update password. Check your current password and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold text-white">Change password</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Update your admin account password. You will stay signed in after a successful change.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200" role="status">
            {success}
          </p>
        )}

        <div className="space-y-1.5">
          <label htmlFor="current-password" className="font-sans text-[10px] uppercase tracking-[0.15em] text-zinc-400 ml-1">
            Current password
          </label>
          <input
            id="current-password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 outline-none backdrop-blur-md transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="new-password" className="font-sans text-[10px] uppercase tracking-[0.15em] text-zinc-400 ml-1">
            New password
          </label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            className="w-full rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 outline-none backdrop-blur-md transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <p className="text-xs text-zinc-500">At least 8 characters.</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="confirm-password" className="font-sans text-[10px] uppercase tracking-[0.15em] text-zinc-400 ml-1">
            Confirm new password
          </label>
          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            className="w-full rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 outline-none backdrop-blur-md transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/50"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-gold-500/90 px-4 py-3 text-sm font-medium text-black transition hover:bg-gold-400 disabled:opacity-50"
        >
          {isSubmitting ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
