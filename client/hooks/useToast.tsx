import {createContext, useContext} from 'react';
import {ToastTypes} from '../components/toast';
export const ToastContext = createContext<(varient: ToastTypes, message: string) => void>(() => {});

export const useToast = () => {
  return useContext(ToastContext);
};
