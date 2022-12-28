import { getID } from '@/helpers/getID'
import { EffectNodeObject } from './EffectNodeObject'

export function RuntimeTreeNode({
  node,
  glbObject,
  disabledNodes,
  isEditingMode,
  instID = getID(),
}) {
  //
  return (
    <group>
      {node?.userData?.effectNode &&
        node?.userData?.effectNode.nodes.length > 0 && (
          <EffectNodeObject
            key={node.uuid + instID + 'enrun'}
            glbObject={glbObject}
            item={node}
            disabledNodes={disabledNodes}
            effectNode={node.userData.effectNode}
            isEditingMode={isEditingMode}
          ></EffectNodeObject>
        )}

      {node.children.map((gKid) => {
        return (
          <group key={gKid.uuid + instID + 'loop'}>
            <RuntimeTreeNode
              glbObject={glbObject}
              disabledNodes={disabledNodes}
              isEditingMode={isEditingMode}
              node={gKid}
            ></RuntimeTreeNode>
          </group>
        )
      })}
    </group>
  )
}

//
