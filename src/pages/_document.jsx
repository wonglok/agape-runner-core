import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel='stylesheet'
          href='/font/fontawesome-free-6.2.0-web/css/all.min.css'
        />

        <script
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
              window.remoteImport = (url) => import(url)
            `,
          }}
        />
      </Head>
      <body className='w-full h-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
