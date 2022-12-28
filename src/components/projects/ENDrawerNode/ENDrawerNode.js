import { useGLBEditor } from '@/helpers/useGLBEditor'
// import { Sphere } from '@react-three/drei'
// import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useState } from 'react'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// import { ENModelViewer } from '../ENModelViewer/ENModelViewer'
import { PreviewerModelGLB } from './PreviewerModelGLB'
import { PreviewHDR } from './PreviewHDR'

export function ENDrawerNode({
  level = 1,
  getEl,
  parent,
  handle,
  onNext = () => {},
}) {
  let [entries, setEntries] = useState([])
  let listFolderItem = useGLBEditor((s) => s.listFolderItem)
  let [highLight, setHighlight] = useState(false)
  let load = useCallback(() => {
    if (!handle) {
      return
    }
    listFolderItem(handle).then(async (v) => {
      setEntries(v)
    })
  }, [handle, listFolderItem])

  useEffect(() => {
    load()

    let tt = setInterval(() => {
      load()
    }, 1000)
    return () => {
      clearInterval(tt)
    }
  }, [load])

  return (
    <div
      style={{ width: '300px', height: '100%' }}
      className='inline-block overflow-y-auto border border-r'
    >
      {entries &&
        entries.map((e) => (
          <div
            key={e._id}
            onClick={() => {
              //
              let scrollLeft = (level + 2) * 300 - getEl().clientWidth
              if (scrollLeft > 0) {
                getEl().scrollLeft = scrollLeft
              } else {
                getEl().scrollLeft = 0
              }

              setHighlight(e._id)
              if (e.handle.kind === 'directory') {
                onNext(
                  <NextFolder
                    level={level + 1}
                    getEl={getEl}
                    parent={parent}
                    handle={e.handle}
                  />
                )
              } else if (e.handle.kind === 'file') {
                if (e.handle.name.indexOf('.hdr') !== -1) {
                  onNext(
                    <PreviewHDR parent={parent} handle={e.handle}></PreviewHDR>
                  )
                } else if (e.handle.name.indexOf('.glb') !== -1) {
                  onNext(
                    <PreviewerModelGLB
                      parent={parent}
                      handle={e.handle}
                    ></PreviewerModelGLB>
                  )
                }
              }
            }}
            className={`pl-1 pt-1 pb-1 whitespace-nowrap ${
              highLight === e._id ? 'bg-gray-300' : ''
            }`}
          >
            <span className='mr-1'>
              {e.handle?.kind === 'directory' ? '🗂' : '📄'}
            </span>
            {e.handle.name}
          </div>
        ))}
    </div>
  )
}

function NextFolder({ level, getEl, parent, handle }) {
  let [next, setNext] = useState(false)
  let listFolderItem = useGLBEditor((s) => s.listFolderItem)

  useEffect(() => {
    if (!parent) {
      setNext(false)
      return
    }
    listFolderItem(parent).then((e) => {
      if (!e.some((ee) => ee.handle.name === handle.name)) {
        setNext(false)
      }
    })
  }, [handle.name, listFolderItem, parent])

  return (
    <>
      <ENDrawerNode
        level={level}
        getEl={getEl}
        parent={parent}
        onNext={(newCompo) => {
          setNext(newCompo)
        }}
        handle={handle}
      ></ENDrawerNode>
      {next}
    </>
  )
}
