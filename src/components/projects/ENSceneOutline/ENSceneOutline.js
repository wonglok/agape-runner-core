import { GlobalsEmptyObjects } from '@/effectnode/store/assignSignaturesToGLB'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { UpDown } from '../UIMain/UIMain'
import { ENOutlineNode } from './ENOutlineNode'
import { useEffect, useRef } from 'react'

export function ENSceneOutline({}) {
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  let activeGLBRuntimeObject = useGLBEditor((s) => s.activeGLBRuntimeObject)
  let outlineSearch = useGLBEditor((s) => s.outlineSearch)
  let workspace = useGLBEditor((s) => s.workspace)

  let ref = useRef()
  return (
    <div
      ref={ref}
      className='w-full px-1 py-12 pt-4 overflow-auto text-xs bg-white'
      style={{ height: 100 + '%' }}
    >
      {activeGLBRuntimeObject?.scene?.children
        .slice()
        .sort((a, b) => {
          if (GlobalsEmptyObjects.includes(a.name)) {
            return -1
          }
          return 0
        })

        .map((kid) => {
          return (
            <ENOutlineNode
              key={kid.uuid + 'outline'}
              node={kid}
              scrollerRef={ref}
            ></ENOutlineNode>
          )
        })}
    </div>
  )
}

//

//
