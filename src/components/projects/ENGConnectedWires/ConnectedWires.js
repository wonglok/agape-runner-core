// import { useAccessor } from '@/vfx-studio/store/use-accessor'
// import { useENEditor } from '@/vfx-studio/store/use-en-editor'
import { useGLBEditor } from '@/helpers/useGLBEditor'
import { SingleWire } from './SingleWire'

export function ConnectedWires() {
  let effectNode = useGLBEditor(
    (s) => s.activeSceneSelection?.userData?.effectNode
  )
  let reloadGraphID = useGLBEditor((s) => s.reloadGraphID)
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)

  return (
    <group>
      {effectNode && (
        <>
          {effectNode.connections.map((link) => {
            return (
              <SingleWire
                key={
                  link._id +
                  reloadGraphID +
                  activeSceneSelection.uuid +
                  effectNode.connections.map((e) => e._id).join('_') +
                  effectNode.nodes.map((e) => e._id).join('_')
                }
                link={link}
              ></SingleWire>
            )
          })}
        </>
      )}

      {/*  */}
      {/*  */}
      {/*  */}
    </group>
  )
}

//
