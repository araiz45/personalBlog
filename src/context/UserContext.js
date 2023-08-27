import React, { createContext, useState } from "react"
export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [info, setInfo] = useState(null)
  return (
    <UserContext.Provider value={{setInfo, info}}>
        {children}
    </UserContext.Provider>
  )
}

