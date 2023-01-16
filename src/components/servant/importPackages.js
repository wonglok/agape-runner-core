// import { UserEndPoints } from '@/aws/UserEndPoints'

import { UserEndPoints } from '@/helpers/UserEndPoints'

let getEndPoint = () => UserEndPoints[process.env.NODE_ENV]
//
let getImportMap = async (myPackages) => {
  return fetch(`${getEndPoint()}/import-map`, {
    method: 'POST',
    body: JSON.stringify({
      packages: myPackages,
    }),
    mode: 'cors',
  }).then((r) => {
    if (r.ok) {
      return r.json()
    } else {
      return Promise.reject()
    }
  })
}

//
let installImportMapOnce = async () => {
  let res = document.body.querySelector('#importmap')

  if (!res) {
    document.body.appendChild(
      Object.assign(document.createElement('script'), {
        id: 'importmap',
        type: 'importmap-shim',
        innerHTML: JSON.stringify({ imports: {} }),
      })
    )

    document.body.appendChild(
      Object.assign(document.createElement('script'), {
        id: 'esms-options',
        type: 'esms-options',
        innerHTML: JSON.stringify({
          shimMode: true,
        }),
      })
    )

    await import('es-module-shims')
  }
}

//
let importNPM = async (myPackages = []) => {
  //
  await installImportMapOnce()

  return getImportMap(myPackages)
    .then((v) => {
      window.importShim.addImportMap(v)

      return Promise.all(
        myPackages.map((it) => {
          return window.importShim(it)
        })
      ).then((result) => {
        //
        // console.log(result)
        //
        return result
      })
    })
    .catch((e) => {
      console.warn(e)
    })
}

export const importPackages = importNPM
export { importNPM }
