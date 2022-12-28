import '../styles/globals.css';
import '@radix-ui/colors/blackA.css';
import '@radix-ui/colors/violet.css';

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
