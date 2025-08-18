// import React, { createContext, useContext, useState } from "react";
// // import { loginWithAuth0 } from "./auth0";

// type AuthContextType = {
//   user: any;
//   login: () => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState(null);

//   const login = async () => {
//     try {
//     //   const { user } = await loginWithAuth0();
//       console.log("✅ User logged in:", user);

//       //setUser(user);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
