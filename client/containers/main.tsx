import React from 'react';
import {useCookies} from 'react-cookie';
import {useQuery} from 'react-query';
import {CustomerServicesProtected} from '../../packages/gerome-api';
import {COOKIE} from '../util/cookie';

export const Main = () => {
  const [cookies] = useCookies([COOKIE]);

  const api = React.useMemo(() => {
    return new CustomerServicesProtected(cookies.GEROME_COOKIE);
  }, [cookies]);

  const {data, isLoading} = useQuery(
    'customers',
    async () => {
      const {data} = await api.all();
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
      retryDelay: 3000,
      staleTime: Infinity,
      enabled: true
    }
  );

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <p>{JSON.stringify(data?.data.customers)}</p>
    </div>
  );
};
