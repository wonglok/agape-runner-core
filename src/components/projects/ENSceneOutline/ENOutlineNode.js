import { useGLBEditor } from '@/helpers/useGLBEditor'

export function ENOutlineNode({ level = 0, node }) {
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  let setMultipleSelection = useGLBEditor((s) => s.setMultipleSelection)
  let setSelection = useGLBEditor((s) => s.setSelection)
  let outlineSearch = useGLBEditor((s) => s.outlineSearch)

  return (
    <>
      {
        <div
          className={'pl-0 mb-1 ml-1 border-l transition-all duration-50 ' + ''}
          style={{
            background: `hsla(0,${0}%,${100.0 - (level + 2) * 2.0}%, 0.5)`,
            borderColor: `hsla(0,${0}%,${100 - (level + 2) * 10.0}%, 0.5)`,
            // borderColor: `hsla(0.0,0%,${100.0 - (level + 2) * 2.0}%, 1.0)`,
          }}
        >
          {(node?.name || '')
            .toLowerCase()
            .indexOf(outlineSearch.toLowerCase()) !== -1 && (
            <div
              className={
                'flex justify-between pl-1 text-xs ' +
                (activeSceneSelection?.uuid === node.uuid
                  ? 'bg-teal-200 p-2 text-slate-700 border-slate-700 border-l-2'
                  : 'transition-all duration-50 hover:bg-teal-100 hover:p-2')
              }
              onClick={() => {
                setSelection(node)
                setMultipleSelection([node])
              }}
            >
              <div>
                {activeSceneSelection?.uuid === node.uuid && <span>→ </span>}
                <span>{node.name}</span>
                {activeSceneSelection?.uuid === node.uuid && (
                  <span className='ml-1'>[{node.type}]</span>
                )}
              </div>
              {
                <div className='ml-1'>
                  {node.userData.effectNode?.nodes?.length > 0 ? '✳️' : ''}
                </div>
              }
            </div>
          )}

          {node.children
            .filter((e) => {
              return true
            })
            .map((kid) => {
              return (
                <ENOutlineNode
                  level={level + 1}
                  key={kid.uuid + 'outline'}
                  node={kid}
                ></ENOutlineNode>
              )
            })}
        </div>
      }
    </>
  )
}

//

//

//
