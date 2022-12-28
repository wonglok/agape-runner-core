import Head from 'next/head'

export function StylesDashboard() {
  return (
    <Head>
      <link
        rel='stylesheet'
        href='/assets/css/soft-ui-dashboard-tailwind.min.css'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
        rel='stylesheet'
      />
      <script
        src='https://kit.fontawesome.com/42d5adcbca.js'
        crossOrigin='anonymous'
      ></script>
      <link href='/assets/css/nucleo-icons.css' rel='stylesheet' />
      <link href='/assets/css/nucleo-svg.css' rel='stylesheet' />
    </Head>
  )
}
