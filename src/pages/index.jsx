import {
  DynamicPage,
  getServerSidePropsForDynamicPage,
} from '@/helpers/DynamicPage'

export const getServerSideProps = getServerSidePropsForDynamicPage({
  isIndex: true,
  siteRoot: true,
})

export default DynamicPage
