import React, {ReactNode, useMemo} from 'react';
import {useCookies} from 'react-cookie';
import {CustomerServicesProtected} from '../../../packages/gerome-api';
import {CustomerContext} from '../../hooks';
import {COOKIE} from '../../util/cookie';

export const CustomerProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [cookies, setCookie] = useCookies([COOKIE]);
  const api = useMemo(() => {
    return new CustomerServicesProtected(cookies.GEROME_COOKIE);
  }, [cookies]);

  return <CustomerContext.Provider value={null}>{children}</CustomerContext.Provider>;
};
