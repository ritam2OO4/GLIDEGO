import { createContext, useState } from "react";
import PropTypes from "prop-types";  // ✅ Import PropTypes

export const userDataContext = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });

  return (
    <userDataContext.Provider value={{ user, setUser }}>
      {children}
    </userDataContext.Provider>
  );
}

// ✅ Validate props
UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
