import React from 'react';
import {useCookies} from 'react-cookie';
import {useQuery} from 'react-query';
import {CustomerServicesProtected} from '../../packages/gerome-api';
import {COOKIE} from '../util/cookie';

export const Aggregate = () => {
  const [cookies] = useCookies([COOKIE]);

  const api = React.useMemo(() => {
    return new CustomerServicesProtected(cookies.GEROME_COOKIE);
  }, [cookies]);

  const {data, isLoading} = useQuery(
    'customers',
    async () => {
      const {data} = await api.aggregate();
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
      {/* <p>{JSON.stringify(data?.data.customers)}</p> */}
      <div className="border-2 rounded shadow border-grey-500 p-5">
        <div className="mb-5">
          <h4 className="text-xl font-medium">Aggregate amount</h4>
        </div>
        <span className="text-4xl font-light text-slate-600">$ 45 rupees</span>
        <span className="block text-slate-500">positive</span>
      </div>
      <p className="my-4 text-md ">Insights</p>
      <div className="border-2 mb-3 rounded shadow border-grey-500 p-5">
        <div className="mb-6">
          <h4 className="text-xl font-medium">Money in</h4>
        </div>
        <span className="text-2xl font-medium text-slate-600">$ {data?.data.totalToTake} rupees</span>
        <span className="block text-slate-500">positive</span>
      </div>

      <div className="border-2 rounded shadow border-grey-500 p-5">
        <div className="mb-6">
          <h4 className="text-xl font-medium">Money out</h4>
        </div>
        <span className="text-2xl font-medium text-slate-600">$ {data?.data.totalToGive} rupees</span>
        <span className="block text-slate-500">positive</span>
      </div>
    </div>
  );
};
