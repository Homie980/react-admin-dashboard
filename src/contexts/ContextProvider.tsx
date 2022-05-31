import React, { createContext, SetStateAction, useContext, useState, Dispatch } from "react";


interface AppContextInterface {
  activeMenu: boolean
  setActiveMenu: Dispatch<SetStateAction<boolean>>
  isClicked: InitialState
  setisClicked: Dispatch<SetStateAction<InitialState>>
  handleClick: (clicked: InitialState | any) => void
  screenSize: number | undefined
  setScreenSize: Dispatch<SetStateAction<undefined | number>>
}

const StateContext = createContext<AppContextInterface>(undefined!);

type Props = {
  children?: React.ReactNode;
};

interface InitialState {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
}

const initialState: InitialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }: Props) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true)
  const [isClicked, setisClicked] = useState<InitialState>(initialState)
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined)

  const handleClick = (clicked: InitialState | any) => {
    setisClicked({ ...initialState, [clicked]: true })
  }
  return (
    <StateContext.Provider value={{ activeMenu, setActiveMenu, isClicked, setisClicked, handleClick, screenSize, setScreenSize }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext)
