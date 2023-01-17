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
declare type Folder = {
  oid: string
  displayName: string
}
//
declare type CodePage = {
  oid: string
  slug: string
  folderID
}
//

export const SiteStateData = proxy<{
  //
  domains: Domain[]
  pages: Page[]
  page: Page | undefined | null
  folders: Folder[]
  codePages: CodePage[]
}>({
  domains: [],
  pages: [],
  page: undefined,

  ///!SECTION
  folders: [],
  //!SECTION
  codePages: [],
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
