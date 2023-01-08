import { HTMLLandingPage } from '@/components/landing-page/HTMLLandingPage'
import {
  DynamicPage,
  getServerSidePropsForDynamicPage,
} from '@/helpers/DynamicPage'

export const getServerSideProps = async (context) => {
  let host = context.req.headers.host || ''

  if (host === 'localhost:3000') {
    return {
      props: {
        layout: 'landing-page',
      },
    }
  } else if (host.includes('www.agape.town')) {
    return {
      props: {
        layout: 'landing-page',
      },
    }
  } else if (host.includes('wonglok.ap.ngrok.io')) {
    return {
      props: {
        layout: 'landing-page',
      },
    }
  } else {
    let res = await getServerSidePropsForDynamicPage({
      isIndex: true,
    })(context)

    return res
  }
}

export default function Page(props) {
  if (props.layout === 'landing-page') {
    return <HTMLLandingPage {...props}></HTMLLandingPage>
  }
  return <DynamicPage {...props}></DynamicPage>
}
