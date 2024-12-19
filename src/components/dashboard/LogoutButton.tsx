import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="glass-card px-4 py-2 text-sm font-medium text-white rounded-lg 
                hover:bg-white/20 transition-colors"
    >
      Logout
    </button>
  );
};
