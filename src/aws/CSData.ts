import { proxy } from 'valtio'

// //

declare type EachTag = {
  oid: string
  name: string
}
declare type AppGroup = {
  oid: string
  slug: string
  tags: EachTag[]
}

declare type AppEntry = {
  oid: string
  slug: string
  tags: EachTag[]
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
}

export const CSData = proxy<{
  //
  appEntryID: string
  appEntry: AppEntry[]

  //
  appGroupID: string
  appGroup: AppGroup[]

  //
  appVersionID: string
  appVersions: AppSnapshot[]
}>({
  appEntryID: '',
  appEntry: [],

  appGroupID: '',
  appGroup: [],

  //
  appVersionID: '',
  appVersions: [],
  // appFiles: [],
})
