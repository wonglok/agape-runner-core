import { proxy } from 'valtio'
import { AppFolder } from './app-folder-aws'
import { AppSnapshot } from './app-snapshot-aws'

// //
declare type AppGroup = {
  oid: string
  displayName: string
}

// declare type  = {
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

// declare type AppFile = {
//   oid: string
//   appID: string
//   appOneID: string
//   content: string
// }

declare type AppSnapshot = {
  oid: string
  appFolderID: string
  appName: string
  appRoutes: []
  appPackages: []
}

export const CSData = proxy<{
  //
  appGroups: AppGroup[]
  appSnap: AppSnapshot[]
  // appFiles: AppFile[]
}>({
  appGroups: [],
  appSnap: [],
  // appFiles: [],
})

//

export const invalidateAppFolder = () => {
  //
  AppFolder.list({}).then((data) => {
    CSData.appGroups = data.list
  })
}

export const invalidateAppSnapshot = ({ appID }) => {
  //
  AppSnapshot.list({ appID }).then((data) => {
    CSData.appSnap = data.list
  })
}
