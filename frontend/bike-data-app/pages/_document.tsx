import React from 'react'
import Document, { Html, Main, Head, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ca">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        </body>
      </Html>
    )
  }
}
