import React, {createContext, useContext} from "react";

import {useLine} from '../hooks/useLine'

export type LineContext = ReturnType<typeof useLine>;

// Create Context Object
export const LineContext = createContext<LineContext>({} as LineContext);

// Create a provider for components to consume and subscribe to changes
export const LineContextProvider: React.FC = ({children}) => {
  const line = useLine()
  return (
    <LineContext.Provider value={line}>
      {children}
    </LineContext.Provider>
  );
};

export const useLineContext = () => {
  const context = useContext<LineContext>(LineContext)
  return context;
}