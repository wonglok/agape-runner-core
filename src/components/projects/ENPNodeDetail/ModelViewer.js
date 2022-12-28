import { useEffect, useState } from 'react'

let loaded = false

export function ModelViewer({ url }) {
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
      src={url}
      class='w-full h-full'
      ios-src=''
      alt='3D Model'
      shadow-intensity='1'
      camera-controls
    ></model-viewer>
  ) : null
}
