import { proxy } from 'valtio'
import { AppVersion } from './AppVersion'

/*

export let appContent = {
  appLoader: 'app-loader',
  appPackages: [
    { packageName: 'app-loader', modules: RawModules },
    { packageName: 'page-about', modules: RawModules },
    { packageName: 'lib-webgl', modules: RawModules },
  ],
  appAssets: [],
}

*/

declare type AppVersionDraft = {
  oid: string
  appGroupID: string
  slug: string

  appLoader: 'string'
  appPackages: AppPackage[]
  appAssets: []
  //
}

declare type AppPackage = {
  oid: string
  packageName: string
  modules: RawModule[]
}

declare type RawModule = {
  oid: string
  moduleName: string
  files: AppCodeFile[]
}

declare type AppCodeFile = {
  appGroupID: string
  appVersionID: string

  //
  oid: string

  packageOID: string
  moduleOID: string

  fileName: string
  content: string
}
//

export const AppDev = proxy<{
  draft: AppVersionDraft
  appCodeFiles: AppCodeFile[]

  activePackageID: string
  activeModuleID: string
  activeFileID: string
  save: Function
  saveCodeFile: Function
}>({
  appCodeFiles: [],
  draft: null,

  activePackageID: '',
  activeModuleID: '',
  activeFileID: '',

  saveCodeFile: ({ object }) => {
    //
  },
  save: async ({ object = false }) => {
    //
    if (!object) {
      throw new Error('needs object')
    }
    return AppVersion.update({ object }).then(
      (r) => {
        console.log(r)
      },
      async (err) => {
        console.log(await err)
      }
    )
  },
})
