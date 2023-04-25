// _app.tsx
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ApolloProvider } from "@apollo/client";

import { client } from "@/lib/apollo-client";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <div dir="ltr">
      <MantineProvider theme={{ dir: "ltr" }} withGlobalStyles withNormalizeCSS>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </MantineProvider>
    </div>
  );
}
