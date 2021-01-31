import { Provider } from "next-auth/client";
import { ClientProvider } from "@guillotinaweb/react-gmi";
import { client } from "../services/guillotina";

import "@guillotinaweb/react-gmi/dist/css/style.css";
export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ClientProvider client={client}>
        <Component {...pageProps} />
      </ClientProvider>
    </Provider>
  );
}
