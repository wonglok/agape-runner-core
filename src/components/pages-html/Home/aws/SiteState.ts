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

export const pagesData = proxy<{
  //
  domains: Domain[]
  pages: Page[]
}>({
  domains: [],
  pages: [],
})

//

//
