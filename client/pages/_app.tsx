import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type {AppProps} from 'next/app';
import {CookiesProvider} from 'react-cookie';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AuthProvider} from '../context/auth';
import {ToastProvider} from '../context/toast';
import '../styles/globals.css';
config.autoAddCss = false;

const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <AuthProvider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </AuthProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
