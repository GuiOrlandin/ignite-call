/* eslint-disable react/no-unknown-property */
import type { AppProps } from "next/app";

import { globalStyles } from "@/styles/globals";

import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </div>
  );
}
