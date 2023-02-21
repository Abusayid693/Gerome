import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {SessionProvider} from 'next-auth/react';
import type {AppProps} from 'next/app';
import {CookiesProvider} from 'react-cookie';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AuthProvider} from '../context/auth';
import {ToastProvider} from '../context/toast';
import '../styles/globals.css';

import {SmallNav} from '../components/nav';

config.autoAddCss = false;

const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60} baseUrl="http://localhost:3000/api/auth/">
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <AuthProvider>
            <ToastProvider>
              <SmallNav />
              <div className="w-screen h-20 bg-grey-1" />
              <Component {...pageProps} />
            </ToastProvider>
          </AuthProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
