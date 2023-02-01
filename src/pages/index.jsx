import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { BUCodeRunner } from '@/components/pages-html/BUCodeStudio/BUCodeRunner'
import { AppEntry } from '@/aws/AppEntry'
import { AppVersion } from '@/aws/AppVersion'
import { AppCodeFile } from '@/aws/AppCodeFile'
import { buildApp } from '@/components/pages-html/BUCodeStudio/Core/BuilderCore'
import { InstancedMesh } from 'three'

export default function SlugPage() {
  //
  let { query } = useRouter()

  let [outputs, setOutputs] = useState(false)

  useEffect(() => {
    if (query && query.slug) {
      //
      let slugString = query.slug.join('/')

      console.log(slugString)

      AppEntry.querySlug({ slug: slugString }).then(async ({ list }) => {
        console.log(list)

        /** @type {{slug:string, oid: string, type: string, payload: { apGroupID: '', appVersionID: '' }}} */
        let first = list[0]

        if (first && first.type === 'write-app') {
          console.log(first.payload)

          loadMyApp({ appEntry: first, setOutputs })
        }
      })
    } else {
      AppEntry.querySlug({ slug: '' }).then(async ({ list }) => {
        console.log(list)

        /** @type {{slug:string, oid: string, type: string, payload: { apGroupID: '', appVersionID: '' }}} */
        let first = list[0]

        if (first && first.type === 'write-app') {
          console.log(first.payload)

          loadMyApp({ appEntry: first, setOutputs })
        }
      })
    }
  }, [query])

  return <>{outputs && <BUCodeRunner outputsJSON={outputs}></BUCodeRunner>}</>
}

async function loadMyApp({ appEntry, setOutputs }) {
  let appRaw = await AppVersion.get({
    oid: appEntry.payload.appVersionID,
  }).then(({ item }) => {
    //
    return item
  })

  let AppPackages = JSON.parse(JSON.stringify(appRaw.appPackages))

  let appCodeFiles = await AppCodeFile.list({
    appVersionID: appEntry.payload.appVersionID,
  }).then(({ list }) => {
    return list
  })

  try {
    buildApp({
      appLoader: 'app-loader',
      appPackages: AppPackages.map((pack) => {
        pack.modules.forEach((mod) => {
          mod.files = appCodeFiles.filter((e) => {
            return pack.oid === e.packageOID && mod.oid === e.moduleOID
          })
        })
        return pack
      }),
    })
      .then((outputs) => {
        setOutputs(outputs)
      })
      .catch((e) => {
        console.log(e)
      })
  } catch (e) {
    console.log(e)
  }
}
