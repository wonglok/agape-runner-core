import { proxy } from 'valtio'
import { fetchPages } from './page-aws'
//

//
declare type Page = {
  oid: string
  slug: string
}
//
declare type Domain = {
  oid: string
}
//

export const SiteStateData = proxy<{
  //
  domains: Domain[]
  pages: Page[]
  page: Page | undefined | null
}>({
  domains: [],
  pages: [],
  page: undefined,
})

//
export const reloadPages = ({ siteID }) => {
  return fetchPages({ siteID: siteID }).then((data) => {
    if (data) {
      SiteStateData.pages = data?.list || []
    } else {
      SiteStateData.pages = []
    }

    return SiteStateData.pages
  })
}
