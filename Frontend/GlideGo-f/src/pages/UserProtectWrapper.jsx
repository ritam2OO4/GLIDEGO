import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProtectWrapper({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/users/login");
    }
  }, [token, navigate]);

  // Only render children if the token exists
  return token ? <>{children}</> : null;
}

export default UserProtectWrapper;
