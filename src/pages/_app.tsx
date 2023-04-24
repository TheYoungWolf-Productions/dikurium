// _app.tsx
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { rtlCache } from "../rtl-cache";
import { ApolloClient, createHttpLink, InMemoryCache, gql, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <div dir="rtl">
      <MantineProvider theme={{ dir: "rtl" }} withGlobalStyles withNormalizeCSS emotionCache={rtlCache}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </MantineProvider>
    </div>
  );
}
