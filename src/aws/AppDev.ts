import { proxy } from 'valtio'
import { AppVersion } from './AppVersion'
import { AppCodeFile } from './AppCodeFile'
import { buildApp } from '@/components/pages-html/BUCodeStudio/Core/BuilderCore'
import nProgress from 'nprogress'
import { SESSION_ACCESS_KEY } from '@/auth/GateConst'
import { UserEndPoints } from './UserEndPoints'

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

  appLoader: string
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

  activePackageID: string | null
  activeModuleID: string | null
  activeFileID: string | null
  save: Function
  buildCode: Function
  saveCodeFile: Function
  importCode: Function
  getAppSource: () => {
    appLoader: string
    appPackages: AppPackage[]
  }
}>({
  appCodeFiles: [],
  draft: null,

  activePackageID: null,
  activeModuleID: null,
  activeFileID: null,

  importCode: async ({ appVersionID, appGroupID, appSource }) => {
    nProgress.start()

    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      nProgress.done()
      throw await Promise.reject('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/AppPackage-importCode`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        //
        appVersionID,
        appGroupID,
        appSource,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    if (res.ok) {
      nProgress.done()
      return await res.json()
    } else {
      nProgress.done()
      throw await Promise.reject(res.json())
    }
  },

  getAppSource: () => {
    let AppPackages = JSON.parse(JSON.stringify(AppDev.draft.appPackages))

    let appSource = {
      appLoader: 'app-loader',
      appPackages: AppPackages.map((pack) => {
        pack.modules.forEach((mod) => {
          mod.files = AppDev.appCodeFiles.filter((e) => {
            return pack.oid === e.packageOID && mod.oid === e.moduleOID
          })
        })

        return pack
      }),
    }

    return appSource
  },

  buildCode: async () => {
    //
    try {
      buildApp(AppDev.getAppSource())
        .then((outputs) => {
          const bc = new BroadcastChannel('editor' + AppDev.draft.oid)
          bc.postMessage({
            outputs,
          })
        })
        .catch((e) => {
          console.log(e)
        })
    } catch (e) {
      console.log(e)
    }
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

        return r
      },
      async (err) => {
        let res = await err

        console.log(res)

        return res
      }
    )
  },
})
