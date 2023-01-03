import { proxy } from 'valtio'
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

//
