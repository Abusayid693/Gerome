import {createContext, useContext} from 'react';

export const CustomerContext = createContext<any>(null);
export const useCustomer = () => {
  return useContext(CustomerContext);
};
