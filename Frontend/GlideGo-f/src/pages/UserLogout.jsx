import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 202) {
        localStorage.removeItem("token"); // Optional: Clear token on logout
        navigate("/users/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Optionally handle error here
    }
  };

  // Call the logout function when the component is rendered
  handleLogout();

  return null; // Since this component only logs the user out, no UI is needed
}
