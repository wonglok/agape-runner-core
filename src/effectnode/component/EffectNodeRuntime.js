import { getID } from '@/helpers/getID'
import { useState } from 'react'
import { assignSignaturesToGLB } from '../store/assignSignaturesToGLB'
import { RuntimeTreeNode } from './RuntimeTreeNode'

export function EffectNodeRuntime({
  glbObject,
  glbRaw,
  disabledNodes = [],
  isEditingMode = false,
}) {
  let [instID] = useState(() => getID())
  glbObject.scene.updateMatrixWorld(true)

  assignSignaturesToGLB(glbObject)
  if (glbRaw) {
    assignSignaturesToGLB(glbRaw)
  }

  return (
    <group>
      {glbObject.scene.children.map((kid) => {
        return (
          <RuntimeTreeNode
            key={kid.uuid + instID + 'explore'}
            instID={instID}
            glbObject={glbObject}
            disabledNodes={disabledNodes}
            node={kid}
            isEditingMode={isEditingMode}
          ></RuntimeTreeNode>
        )
      })}
    </group>
  )
}

//

//

//

//
