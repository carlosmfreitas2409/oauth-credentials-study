import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import 'tailwindcss/tailwind.css'

import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Toaster position="top-right" />

      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
