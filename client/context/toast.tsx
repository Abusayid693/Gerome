import {ReactNode, useState} from 'react';
import {Toast, SUCCESS, ToastTypes} from '../components/toast';
import {ToastContext} from '../hooks/useToast';
import crypto from 'crypto';
import _ from 'lodash';

interface ToastContent {
  varient: ToastTypes;
  message: string;
  id: string;
}
type T = Record<'string', ToastContent>;

export const ToastProvider: React.FC<{
  children: ReactNode;
}> = ({children}) => {
  const [isOpen, setOpen] = useState<T>();

  const __onClose = (id: string) => {
    setOpen({..._.omit(isOpen, [id])} as any);
  };

  const __onOpen = (varient: ToastTypes = SUCCESS, message: string = 'Message') => {
    const id = crypto.randomBytes(16).toString('hex');
    setOpen(prevState => ({...prevState, [id]: {varient, message, id}} as T));
  };
  return (
    <ToastContext.Provider value={__onOpen}>
      {isOpen &&
        Object.values(isOpen as T).map((item, i) => (
          <Toast varient={item.varient} message={item.message} index={i} onClose={() => __onClose(item.id)} />
        ))}
      {children}
    </ToastContext.Provider>
  );
};
