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
  packageName: string
  modules: RawModule[]
}

declare type RawModule = {
  moduleName: string
  files: AppFile[]
}

declare type AppFile = {
  oid: string
  fileName: string
  content: string
}
//

export const AppDev = proxy<{
  draft: AppVersionDraft
  appFiles: AppFile[]

  save: Function
}>({
  appFiles: [],
  draft: null,

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
