import { proxy } from 'valtio'
import { AppVersion } from './AppVersion'
import { AppCodeFile } from './AppCodeFile'
import { buildApp } from '@/components/pages-html/BUCodeStudio/Core/BuilderCore'

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
  buildCode: Function
  saveCodeFile: Function
}>({
  appCodeFiles: [],
  draft: null,

  activePackageID: '',
  activeModuleID: '',
  activeFileID: '',

  buildCode: async ({}) => {
    //
    let AppPackages = JSON.parse(JSON.stringify(AppDev.draft.appPackages))

    buildApp({
      appLoader: 'app-loader',
      appPackages: AppPackages.map((pack) => {
        pack.modules.forEach((mod) => {
          mod.files = AppCodeFile.data.filter((e) => {
            return (
              AppDev.activePackageID === e.packageOID &&
              AppDev.activeModuleID === e.moduleOID
            )
          })
        })

        return pack
      }),
    }).then((outputs) => {
      const bc = new BroadcastChannel('editor')
      bc.postMessage({
        outputs,
      })
    })
  },

  saveCodeFile: async ({ object }) => {
    if (!object) {
      throw new Error('needs object')
    }

    try {
      AppDev.buildCode().catch((e) => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)
    }

    //
    return AppCodeFile.update({ object }).then(
      (r) => {
        console.log(r)

        return r
      },
      async (err) => {
        console.log(await err)
      }
    )
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
