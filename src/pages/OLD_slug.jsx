import {
  DynamicPage,
  getServerSidePropsForDynamicPage,
} from '@/helpers/DynamicPage'
export const getServerSideProps = getServerSidePropsForDynamicPage({
  isIndex: false,
})
export default DynamicPage