const Page = (props) => {
  return <>{/*  */}</>
}
Page.layout = 'PromotePage'

export default Page

async function getStaticProps() {
  return {
    props: {
      title: 'Effect Node Forge',
    },
  }
}

export { getStaticProps }
