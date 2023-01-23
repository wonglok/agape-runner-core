import { getID } from '@/lib/getID'
import { proxy } from 'valtio'
import { novaFolderList } from './nova-folder-aws'
// import { fetchPages } from './page-aws'
//

// //
declare type AppGroup = {
  oid: string
  displayName: string
}

// declare type AppRoute = {
//   route: string
//   packageName: string
// }

// declare type AppModules = {
//   moduleName: string
//   files: AppFile[]
//   fileIDList: string[]
// }

// declare type AppPackage = {
//   packageName: string
//   modules: AppModules[]
// }

// declare type AppSnapshot = {
//   oid: string
//   appGroupID: string
//   appName: string
//   appRoutes: AppRoute[]
//   appPackages: AppPackage[]
// }

// declare type AppFile = {
//   oid: string
//   appID: string
//   appOneID: string
//   content: string
// }

// export const createAppSnapshot = () => {
//   return {
//     //
//     //
//   }
// }

export const CSData = proxy<{
  //
  appGroups: AppGroup[]
  // appSnap: AppSnapshot[]
  // appFiles: AppFile[]
}>({
  appGroups: [],
  // appSnap: [],
  // appFiles: [],
})

//

export const invalidateAppGruop = () => {
  //
  novaFolderList({}).then((data) => {
    CSData.appGroups = data.list
  })
}
