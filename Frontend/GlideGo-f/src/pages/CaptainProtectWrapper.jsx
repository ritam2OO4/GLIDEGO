import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext.jsx";

function UserProtectWrapper({ children }) {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/captains/login");
      return;
    }

    const validateToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200 && response.data.captain) {
          setCaptain(response.data.captain);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          navigate("/captains/login");
        }
      } catch (error) {
        console.error("Token validation failed:", error.message);
        localStorage.removeItem("token");
        navigate("/captains/login");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [navigate, setCaptain, captain]);

  if (isLoading) return <div className="loading-spinner">Loading...</div>;

  return isAuthenticated ? <>{children}</> : null;
}

export default UserProtectWrapper;
