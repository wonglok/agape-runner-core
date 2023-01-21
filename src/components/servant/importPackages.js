// import { UserEndPoints } from '@/aws/UserEndPoints'

import { UserEndPoints } from '@/helpers/UserEndPoints'

// let getEndPoint = () => UserEndPoints[process.env.NODE_ENV]
//
// let getImportMap = async (myPackages) => {
//   return fetch(`${getEndPoint()}/import-map`, {
//     method: 'POST',
//     body: JSON.stringify({
//       packages: myPackages,
//     }),
//     mode: 'cors',
//   }).then((r) => {
//     if (r.ok) {
//       return r.json()
//     } else {
//       return Promise.reject()
//     }
//   })
// }

//
export const importLib = async (lib, resources) => {
  let res = document.body.querySelector('#importmap')

  if (!res) {
    document.body.appendChild(
      Object.assign(document.createElement('script'), {
        id: 'importmap',
        type: 'importmap-shim',
        innerHTML: JSON.stringify({
          imports: {},
        }),
      })
    )

    document.body.appendChild(
      Object.assign(document.createElement('script'), {
        id: 'esms-options',
        innerHTML: JSON.stringify({
          shimMode: true,
        }),
      })
    )
  }

  return new Promise(async (resolve) => {
    installImportMapOnce()
    await import('es-module-shims')

    //
    // myPackages.map((it) => {
    //  return window.importShim(it)
    // })
    //
    //window.importShim.addImportMap(v)

    let tt = setInterval(() => {
      if (window.importShim) {
        clearInterval(tt)
        window.importShim.addImportMap({
          imports: {
            [lib]: new Blob([code], { type: 'text/javascript' }),
          },
        })
        window.importShim(lib).then(resolve)
        resolve()
      }
    })
  })
}

//

// let importNPM = async (myPackages = []) => {
//   //
//   await installImportMapOnce()

//   //

//   return getImportMap(myPackages)
//     .then((v) => {
//       window.importShim.addImportMap(v)

//       return Promise.all(
//         myPackages.map((it) => {
//           return window.importShim(it)
//         })
//       ).then((result) => {
//         //
//         // console.log(result)
//         //
//         return result
//       })
//     })
//     .catch((e) => {
//       console.warn(e)
//     })
// }
