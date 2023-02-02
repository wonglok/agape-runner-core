import { AppCodeFile } from '@/aws/AppCodeFile'
import { AppEntry } from '@/aws/AppEntry'
import { AppVersion } from '@/aws/AppVersion'
import { BUCodeRunner } from '@/components/pages-html/BUCodeStudio/BUCodeRunner'
import { buildApp } from '@/components/pages-html/BUCodeStudio/Core/BuilderCore'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Open() {
  let [outputs, setOutputs] = useState(false)

  useEffect(() => {
    let id = ''

    let params = new URLSearchParams(window.location.search)
    id = params.get('id') || ''

    loadMyApp({ appVersionID: id, setOutputs })

    // AppEntry.get({ oid: id }).then((data) => {
    //   console.log(data.item)
    //   // setOutput(data.item)
    //
    // })
    // //
  }, [])

  return <>{outputs && <BUCodeRunner outputsJSON={outputs}></BUCodeRunner>}</>
}

async function loadMyApp({ appVersionID, setOutputs }) {
  let appRaw = await AppVersion.get({
    oid: appVersionID,
  }).then(({ item }) => {
    //
    return item
  })

  let AppPackages = JSON.parse(JSON.stringify(appRaw.appPackages))

  let appCodeFiles = await AppCodeFile.list({
    appVersionID: appVersionID,
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
