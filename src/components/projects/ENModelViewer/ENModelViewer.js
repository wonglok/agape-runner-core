import { useEffect, useState } from 'react'
// import { load } from '../SingleBuilderPage/SingleBuilderTool'
// import

let loaded = false

export function ENModelViewer({ url }) {
  let [ok, setOK] = useState(false)

  useEffect(() => {
    if (loaded) {
      setOK(true)
      return
    }
    import('@google/model-viewer').then((r) => {
      loaded = true
      setOK(true)
    })
  }, [])

  //
  return ok ? (
    <model-viewer
      key={url}
      src={url}
      class='w-full h-full'
      ios-src=''
      alt='Avatar'
      shadow-intensity='1'
      camera-controls
    ></model-viewer>
  ) : null
}
