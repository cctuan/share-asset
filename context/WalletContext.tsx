import React, {createContext, useContext} from "react";

import {useWallet} from '../hooks/useWallet'

export type WalletContext = ReturnType<typeof useWallet>;

// Create Context Object
export const WalletContext = createContext<WalletContext>({} as WalletContext);

// Create a provider for components to consume and subscribe to changes
export const WalletContextProvider: React.FC = ({children}) => {
  const wallet = useWallet()
  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext<WalletContext>(WalletContext)
  return context;
}