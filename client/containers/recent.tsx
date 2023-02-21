import {useRouter} from 'next/router';
import React from 'react';
import {useCookies} from 'react-cookie';
import {useQuery} from 'react-query';
import {D1ServicesProtected} from '../../packages/gerome-api';
import {COOKIE} from '../util/cookie';

export const Recent = () => {
  const [cookies] = useCookies([COOKIE]);
  const router = useRouter();
  const {cid} = router.query;

  const api = React.useMemo(() => {
    return new D1ServicesProtected(cookies.GEROME_COOKIE);
  }, [cookies]);

  const {data, isLoading, refetch, isRefetching} = useQuery(
    'd1_recent',
    async () => {
      const {data} = await api.recent(cid as string, {});
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
      retryDelay: 3000,
      staleTime: Infinity,
      enabled: !!cid
    }
  );
  return (
    <div>
      <div>{isLoading || isRefetching ? <h5>Loading...</h5> : <p>{JSON.stringify(data)}</p>}</div>
      <h3>{cid}</h3>
      <button onClick={() => refetch()}>refetch</button>
    </div>
  );
};
