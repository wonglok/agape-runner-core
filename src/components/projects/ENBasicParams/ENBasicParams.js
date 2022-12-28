import { useGLBEditor } from '@/helpers/useGLBEditor'
import { Object3D } from 'three'
import { ENFCommon } from './ENFCommon'
import { ENFLightDir } from './ENFLightDir'
import { ENFLightPt } from './ENFLightPt'
import { ENFObject } from './ENFObject'

export function ENBasicParams({}) {
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)

  return (
    <>
      {activeSceneSelection?.isObject3D && (
        <>
          <ENFObject object={activeSceneSelection}></ENFObject>
        </>
      )}

      {activeSceneSelection?.isPointLight && (
        <>
          <ENFLightPt object={activeSceneSelection}></ENFLightPt>
        </>
      )}

      {activeSceneSelection?.isDirectionalLight && (
        <>
          <ENFLightDir object={activeSceneSelection}></ENFLightDir>
        </>
      )}

      {(activeSceneSelection?.material?.type === 'MeshPhysicalMaterial' ||
        activeSceneSelection?.material?.type === 'MeshStandardMaterial') &&
      activeSceneSelection?.material ? (
        <div className='w-full'>
          <ENFCommon
            object={activeSceneSelection}
            material={activeSceneSelection?.material}
          ></ENFCommon>

          {/*  */}
          {/* <div className='w-full whitespace-pre-wrap'>
            {JSON.stringify(activeSceneSelection?.material, null, '  ')}
          </div> */}
          {/*  */}
          {/*  */}
        </div>
      ) : null}
    </>
  )
}

//
/*
<div className='p-2 m-2 bg-yellow-400'>
          Mesh Stanadard / Physical Materail Not Found in the current selection
        </div>
*/
//

//
