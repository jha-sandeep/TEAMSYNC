import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
