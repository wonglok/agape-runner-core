//

// import { useEffectNode } from '@/effectnode/store/useEffectNode'
import { Codes } from '@/effectnode/store/codes'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useState } from 'react'

export function ENGAddGraphNode() {
  let [str, setStr] = useState('')

  // let codes = useEffectNode((s) => s.codes)

  let selectCodeToAdd = useGLBEditor((s) => s.selectCodeToAdd)
  let setCurosrMode = useGLBEditor((s) => s.setCurosrMode)
  let setOverlayENGraph = useGLBEditor((s) => s.setOverlayENGraph)
  let refreshSystem = useGLBEditor((s) => s.refreshSystem)
  let addCode = ({ title }) => {
    selectCodeToAdd({ title })
    setOverlayENGraph('')
    setCurosrMode('add')
    refreshSystem()
  }

  //
  return (
    <>
      <div className='w-full h-full bg-white backdrop-blur-lg bg-opacity-75'>
        <div className='flex items-center w-full h-8 pl-2 bg-yellow-300 border-b border-yellow-200'>
          Add Modules
        </div>

        <textarea
          rows={1}
          autoFocus={true}
          defaultValue={str}
          onKeyDown={(ev) => {
            ev.stopPropagation()
            setStr(ev.target.value || '')
            if (ev.key === 'Enter') {
              //
              let firstCode = Codes.filter((it) => {
                return (it.title || '').indexOf(str) !== -1
              })[0]
              if (firstCode) {
                addCode({ title: firstCode.title })
              }
              ev.preventDefault()
            }
          }}
          className='w-full p-2 -mb-2 bg-white border-b border-yellow-500 cursor-pointer hover:bg-yellow-100'
        ></textarea>

        <div className='p-2 pt-3 '>
          {Codes.filter((it) => {
            return (it.title || '').indexOf(str) !== -1
          }).map((e) => {
            return (
              <div
                key={e.key}
                onClick={() => {
                  addCode({ title: e.title })
                }}
                className='mb-1 cursor-pointer'
              >
                {e.title}
              </div>
            )
          })}
        </div>
        {/*  */}
      </div>
    </>
  )
}

//
