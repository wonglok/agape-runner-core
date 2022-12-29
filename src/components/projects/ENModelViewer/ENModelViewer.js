import { useEffect, useRef, useState } from 'react'
// import { load } from '../SingleBuilderPage/SingleBuilderTool'
// import

let loaded = false

export function ENModelViewer({ url }) {
  let [ok, setOK] = useState(false)
  let ref = useRef()
  useEffect(() => {
    if (ref.current) {
      ref.current.style.display = 'none'
      setTimeout(() => {
        ref.current.style.display = ''
      }, 30)
    }
    if (loaded) {
      setOK(true)
    }

    import('@google/model-viewer').then((r) => {
      loaded = true
      setOK(true)
    })
  }, [])

  //
  return (
    <div ref={ref} className='w-full h300px'>
      <style
        dangerouslySetInnerHTML={{
          __html: /* css */ `
        .h300px {
              height: 300px;
            }

      `,
        }}
      ></style>
      {ok ? (
        <model-viewer
          key={url}
          src={url}
          class='w-full h300px'
          ios-src=''
          alt='Avatar'
          shadow-intensity='1'
          camera-controls
        ></model-viewer>
      ) : null}
    </div>
  )
}
