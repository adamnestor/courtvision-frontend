import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

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
      className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md 
                hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
    >
      Logout
    </button>
  );
};
