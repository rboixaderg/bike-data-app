import { Provider } from 'next-auth/client'
import { ConfigInterface, SWRConfig } from 'swr'
import { fetcherFn, revalidateType, RevalidateOptionInterface } from 'swr/dist/types'

import { ClientProvider } from '@guillotinaweb/react-gmi'
import { client } from '../services/guillotina'

import '@guillotinaweb/react-gmi/dist/css/style.css'

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        onErrorRetry: (
          _error: Error,
          _key: string,
          _option: ConfigInterface<any, any, fetcherFn<any>>,
          revalidate: revalidateType,
          { retryCount }: RevalidateOptionInterface
        ) => {
          if (retryCount !== undefined && retryCount >= 1) return
          // retry after 5 seconds
          if (retryCount !== undefined) {
            setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000)
          }
        },
        revalidateOnFocus: false,
      }}
    >
      <Provider session={pageProps.session}>
        <ClientProvider client={client}>
          <Component {...pageProps} />
        </ClientProvider>
      </Provider>
    </SWRConfig>
  )
}
