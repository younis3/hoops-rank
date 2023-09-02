"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  userRole: string;
  setUserRole: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<ContextProps>({
  userRole: "",
  setUserRole: (): string => "normal",
});

export const UserContextProvider = ({ children }: any) => {
  const [userRole, setUserRole] = useState("");
  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
