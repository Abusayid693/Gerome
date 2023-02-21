import {useRouter} from 'next/router';
import React from 'react';
import {useCookies} from 'react-cookie';
import {useQuery} from 'react-query';
import {CustomerServicesProtected} from '../../packages/gerome-api';
import {COOKIE} from '../util/cookie';

export const Customers = () => {
  const [cookies] = useCookies([COOKIE]);
  const router = useRouter();

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
    <div className="border bg-white rounded shadow border-grey-2 p-5">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-5">
            <h4 className="text-xl font-medium text-grey-5">Customers</h4>
          </div>

          <div>
            <ul className="flex flex-row gap-5">
              {data?.data?.customers?.map(customer => (
                <li onClick={() => router.push(`/customer/${customer._id}`)} className="text-center cursor-pointer">
                  <div className="w-12 h-12 flex items-center text-lg uppercase justify-center bg-grey-1 rounded-full">{customer.name[0]}</div>
                  {customer.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
