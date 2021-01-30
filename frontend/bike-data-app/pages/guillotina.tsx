import React from "react";
import { Guillotina } from "@guillotinaweb/react-gmi";
import { Auth } from "@guillotinaweb/react-gmi";
import { Login } from "@guillotinaweb/react-gmi";
import { getClient } from "@guillotinaweb/react-gmi";
import { ClientProvider } from "@guillotinaweb/react-gmi";

import "../node_modules/@guillotinaweb/react-gmi/dist/css/style.css";

const url = "http://localhost:8080/";
const auth = new Auth(url);
const client = getClient(url, auth);

const registry = {
  // to register views around guillotina objects paths
  paths: {},
  // default views for content types
  views: {},
  // forms for adding content, they are fired
  // throught an action
  forms: {},
  // when using the default being able to configure properties
  properties: {
    // Producto: ProductProps,
    // Tag: TagProps
  },
  behaviors: {},
  components: {},
};

export default function App() {
  const [isLogged, setLogged] = React.useState(auth.isLogged);

  const onLogin = () => {
    setLogged(true);
  };
  const onLogout = () => setLogged(false);

  (auth as any).onLogout = onLogout;

  return (
    <ClientProvider client={client}>
      {isLogged && <Guillotina auth={auth} url={url} registry={registry} />}
      {!isLogged && (
        <div className="columns is-centered">
          <div className="columns is-half">
            <Login onLogin={onLogin} auth={auth} />
          </div>
        </div>
      )}
    </ClientProvider>
  );
}
