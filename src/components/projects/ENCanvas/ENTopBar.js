import { useGLBEditor } from '@/helpers/useGLBEditor'
import { PointLight } from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { DirectionalLight, Object3D } from 'three140'

export function ENTopBarr() {
  let switchMode = useGLBEditor((s) => s.switchMode)
  let editorNavigationMode = useGLBEditor((s) => s.editorNavigationMode)
  let activeSceneSelection = useGLBEditor((s) => s.activeSceneSelection)
  let setSelection = useGLBEditor((s) => s.setSelection)
  let loadGLB = useGLBEditor((s) => s.loadGLB)
  let refreshSystem = useGLBEditor((s) => s.refreshSystem)
  let setOutlineSerach = useGLBEditor((s) => s.setOutlineSerach)

  let multipleSelection = useGLBEditor((s) => s.multipleSelection)
  return (
    <>
      <div className='absolute top-0 left-0 '>
        <button
          className={`select-none inline-block p-1 my-1 ml-1 mr-1 text-xs  ${
            editorNavigationMode === 'meta' ? 'bg-green-300' : 'bg-white'
          }`}
          onClick={() => {
            switchMode('meta')
          }}
        >
          Collider
        </button>
        <button
          className={`select-none inline-block p-1 my-1 ml-1 mr-1 text-xs  ${
            editorNavigationMode === 'floor' ? 'bg-green-300' : 'bg-white'
          }`}
          onClick={() => {
            switchMode('floor')
          }}
        >
          Floor
        </button>

        {/* <button
        className={`select-none inline-block p-1 my-1 ml-1 mr-1 text-xs  ${
          editorNavigationMode === 'avatar' ? 'bg-green-300' : 'bg-white'
        }`}
        onClick={() => {
          switchMode('avatar')
        }}
      >
        Avatar Mode
      </button> */}
        <button
          className={`select-none inline-block p-1 my-1 ml-1 mr-1 text-xs  ${
            editorNavigationMode === 'orbit' ? 'bg-green-300' : 'bg-white'
          }`}
          onClick={() => {
            switchMode('orbit')
          }}
          //
        >
          Orbit
        </button>
      </div>

      <div className='absolute top-0 right-0 z-10 p-1'>
        {activeSceneSelection && (
          <div>
            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={async () => {
                //

                let fin = document.createElement('input')
                fin.type = 'file'
                fin.accept = 'model/gltf-binary'
                fin.onchange = (ev) => {
                  let first = ev.target.files[0]

                  if (first) {
                    let url = URL.createObjectURL(first)

                    loadGLB(url, true).then((glb) => {
                      let o3 = new Object3D()
                      o3.name = 'Imported GLB'
                      o3.position.copy(activeSceneSelection.position)
                      o3.position.x += 0.1
                      o3.position.z += 0.1
                      o3.add(glb.scene)

                      activeSceneSelection.parent.add(o3)
                      setSelection(o3)
                      refreshSystem()
                    })
                  }
                }
                fin.click()

                // loadGLB()
                // let cloned  =
                // cloned.position.x += 0.1
                // cloned.position.z += 0.1
              }}
            >
              + GLB
            </button>

            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={async () => {
                let pl = new PointLight(0xff00ff, 50)
                pl.name = 'PointLight_' + Math.random().toString().slice(2, 5)
                pl.position.copy(activeSceneSelection.position)

                activeSceneSelection.parent.add(pl)
                setSelection(pl)
                setOutlineSerach(pl.name)
                refreshSystem()
              }}
            >
              + Point Light
            </button>

            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={async () => {
                let pl = new DirectionalLight(0xff00ff, 50)
                pl.name =
                  'DirectionalLight_' + Math.random().toString().slice(2, 5)
                pl.position.copy(activeSceneSelection.position)

                activeSceneSelection.parent.add(pl)
                setSelection(pl)
                setOutlineSerach(pl.name)
                refreshSystem()
              }}
            >
              + Dir Light
            </button>

            {activeSceneSelection && (
              <button
                className='p-1 mb-1 mr-1 bg-white'
                onClick={() => {
                  //

                  if (multipleSelection.length > 0) {
                    multipleSelection
                      .filter((e) => e)
                      .forEach((it) => {
                        console.log(it)
                        if (it.isHelper) {
                          return
                        }
                        let cloned = clone(it)

                        if (it.parent) {
                          it.parent.add(cloned)
                        }

                        cloned.position.x += 0.1
                        cloned.position.z += 0.1
                      })
                  } else {
                    let cloned = clone(activeSceneSelection)

                    activeSceneSelection.parent.add(cloned)

                    cloned.position.x += 0.1
                    cloned.position.z += 0.1
                    setSelection(cloned)
                  }
                }}
              >
                Duplicate
              </button>
            )}

            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={() => {
                if (window.confirm('remove?')) {
                  if (multipleSelection.length > 0) {
                    multipleSelection.forEach((activeSceneSelection) => {
                      activeSceneSelection.removeFromParent()
                      setSelection(false)
                      setOutlineSerach('')
                      refreshSystem()
                    })
                  } else {
                    activeSceneSelection.removeFromParent()
                    setSelection(false)
                    setOutlineSerach('')
                    refreshSystem()
                  }
                }
              }}
            >
              Remove
            </button>
            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('useTranslate', { detail: {} })
                )
              }}
            >
              Translate
            </button>
            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('useScale', { detail: {} })
                )
              }}
            >
              Scale
            </button>
            <button
              className='p-1 mb-1 mr-1 bg-white'
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('useRotation', { detail: {} })
                )
              }}
            >
              Rotation
            </button>
          </div>
        )}

        {/* <button
          onClick={() => {
            //
          }}
          className='inline-block p-1 m-1 bg-white cursor-pointer select-none'
        >
          HDR
        </button> */}
      </div>
    </>
  )
}
