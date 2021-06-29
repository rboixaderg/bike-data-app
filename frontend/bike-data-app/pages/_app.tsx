import { Provider } from 'next-auth/client'
import { SWRConfiguration, SWRConfig } from 'swr'
import { Fetcher, Revalidator, RevalidatorOptions } from 'swr/dist/types'

import { ClientProvider } from '@guillotinaweb/react-gmi'
import { client } from '../services/guillotina'

import 'node_modules/@guillotinaweb/react-gmi/dist/css/style.css'

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        onErrorRetry: (
          _error: Error,
          _key: string,
          _option: SWRConfiguration<any, any, Fetcher<any>>,
          revalidate: Revalidator,
          { retryCount }: RevalidatorOptions
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
