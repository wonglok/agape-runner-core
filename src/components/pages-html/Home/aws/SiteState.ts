import { proxy } from 'valtio'
import { fetchPages } from './page-aws'
//

//
declare type Page = {
  oid: string
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
}>({
  domains: [],
  pages: [],
})

//
export const reloadPages = ({ siteID }) => {
  fetchPages({ siteID: siteID }).then((data) => {
    if (data) {
      SiteStateData.pages = data.list
    } else {
      SiteStateData.pages = []
    }
  })
}
