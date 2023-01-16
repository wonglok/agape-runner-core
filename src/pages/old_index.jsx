import {
  DynamicPage,
  getServerSidePropsForDynamicPage,
} from '@/helpers/DynamicPage'

export const getServerSideProps = getServerSidePropsForDynamicPage({
  isIndex: true,
})

export default DynamicPage