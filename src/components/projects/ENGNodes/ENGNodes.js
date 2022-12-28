// import { useENEditor } from '@/vfx-studio/store/use-en-editor'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { NodeSingle } from './NodeSingle'

export function ENGNodes() {
  let reloadGraphID = useGLBEditor((s) => s.reloadGraphID)
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  let effectNode = activeSceneSelection?.userData?.effectNode
  return (
    <group key={'gpnodesingle'}>
      {effectNode && (
        <>
          {effectNode?.nodes
            ?.filter((e) => e)
            .map((nd) => {
              return (
                <NodeSingle
                  key={nd._id}
                  node={nd}
                  graph={effectNode}
                  effectNode={effectNode}
                ></NodeSingle>
              )
            })}
        </>
      )}
      {/*  */}
    </group>
  )
}
