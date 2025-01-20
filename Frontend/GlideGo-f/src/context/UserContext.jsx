import { createContext, useState } from "react";

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
    <div>
      <userDataContext.Provider value={{user,setUser}}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
