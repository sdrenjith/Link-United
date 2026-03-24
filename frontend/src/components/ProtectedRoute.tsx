import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-8 text-center text-zinc-300">Loading session...</div>;
  }

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;