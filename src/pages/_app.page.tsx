/* eslint-disable react/no-unknown-property */
import "../lib/dayjs";
import { Roboto } from "@next/font/google";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import { globalStyles } from "@/styles/globals";
import { DefaultSeo } from "next-seo";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <DefaultSeo
            openGraph={{
              type: "website",
              locale: "pt_BR",
              url: "https://www.url.ie/",
              siteName: "Ignite Call",
            }}
          />
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}
