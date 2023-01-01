import { proxy } from 'valtio'
//

//
declare type Page = {
  _id: string
}
//
declare type Domain = {
  _id: string
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
