import { createContext, useState, useContext } from "react";

const UserContext = createContext(); 
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
// this context file creates a UserContext and a UserProvider component that wraps the entire application.
// It also provides a custom hook useUser to access the user state and setUser function from any component.
// The user state is initialized to null and can be updated using the setUser function.