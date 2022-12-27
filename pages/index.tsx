import Head from 'next/head';
import Image from 'next/image';

import { Inter } from '@next/font/google';

import styles from '../styles/index.module.css';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="An application for mixing and colorizing images from different wavelengths of light."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <div>Hello</div>
      </main>
    </>
  );
}
