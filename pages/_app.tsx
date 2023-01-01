import '../styles/globals.css';
import '@radix-ui/colors/whiteA.css';

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
