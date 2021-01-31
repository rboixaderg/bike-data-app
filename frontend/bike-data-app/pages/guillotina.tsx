import React from 'react'
import { Guillotina as GuillotinaComponent } from '@guillotinaweb/react-gmi'
import { Login } from '@guillotinaweb/react-gmi'

import '../node_modules/@guillotinaweb/react-gmi/dist/css/style.css'
import Menu from '../components/Menu'
import Head from 'next/head'
import { auth } from '../services/guillotina'

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
}

export default function Guillotina() {
  const [isLogged, setLogged] = React.useState(auth.isLogged)

  const onLogin = () => {
    setLogged(true)
  }
  const onLogout = () => setLogged(false)

  ;(auth as any).onLogout = onLogout
  console.log(process.env.NEXT_PUBLIC_GUILLOTINA_URL)
  return (
    <>
      <Head>
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      </Head>
      <Menu />
      <section className="hero is-primary mb-3">
        <div className="container hero-body">
          <p className="title">Guillotina admin</p>
        </div>
      </section>
      <div className="container">
        {isLogged && (
          <GuillotinaComponent
            auth={auth}
            url={process.env.NEXT_PUBLIC_GUILLOTINA_URL}
            registry={registry}
          />
        )}
        {!isLogged && (
          <div className="columns is-centered">
            <div className="columns is-half">
              <Login onLogin={onLogin} auth={auth} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
