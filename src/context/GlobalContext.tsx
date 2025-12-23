"use client"
import { createContext, useContext, useState } from 'react'

interface GlobalContextProps {
  isShowMenu: boolean,
  toggleMenu: () => void,
  setIsShowMenu: (event: boolean) => void
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export default function GlobalContextVrovider({children}: {children: React.ReactNode}) {
  const [isShowMenu, setIsShowMenu] = useState(false)

  const contextValue: GlobalContextProps = {
    isShowMenu,
    toggleMenu: () => setIsShowMenu(!isShowMenu),
    setIsShowMenu
  }

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )

}

export function useGlobalContext() {
  const context = useContext(GlobalContext)

  if(context === undefined) {
    throw new Error('Context Error')
  }

  return context
}
