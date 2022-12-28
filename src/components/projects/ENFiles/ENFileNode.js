import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect, useState } from 'react'

export function ENFileNode({ handle }) {
  let listFolderItem = useGLBEditor((s) => s.listFolderItem)

  let [arr, setArr] = useState([])
  useEffect(() => {
    if (!handle) {
      return
    }

    let load = () => {
      listFolderItem(handle).then((v) => {
        setArr(v)
      })
    }

    let tt = setInterval(() => {
      load()
    }, 1500)
    load()
    return () => {
      clearInterval(tt)
    }
  }, [handle, listFolderItem])

  return (
    <div>
      {arr.map((e) => {
        return e.handle.kind === 'directory' ? (
          <div key={e._id}>
            <div>
              <div className='inline-block'>
                {e.handle.kind === 'directory' ? '🗂' : '📄'}
              </div>
              <div className='inline-block'>{e.handle.name}</div>
            </div>
            <div className='ml-2'>
              <ENFileNode handle={e.handle}></ENFileNode>
            </div>
          </div>
        ) : (
          <div key={e._id}>
            <div>
              <div className='inline-block'>
                {e.handle.kind === 'directory' ? '🗂' : '📄'}
              </div>

              <div className='inline-block'>{e.handle.name}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

//

//

//

//
