import { useGLBEditor } from '@/helpers/useGLBEditor'
import { useEffect, useRef, useState } from 'react'
import SplitPane from 'react-split-pane'
import { ENAssetDrawer } from '../ENAssetDrawer/ENAssetDrawer'
import { ENCanvas } from '../ENCanvas/ENCanvas'
// import { ENFiles } from '../ENFiles/ENFiles'
import { ENGraph, OverlayHtml } from '../ENGraph/ENGraph'
import { ENBasicParams } from '../ENBasicParams/ENBasicParams'
// import { ENLayers } from '../ENLayers/ENLayers'
import { ENParams } from '../ENParams/ENParams'
import { ENProjectGuard } from '../ENProjectGuard/ENProjectGuard'
import { ENSceneOutline } from '../ENSceneOutline/ENSceneOutline'
import { PropTabs } from './PropTabs'
import { getID } from '@/lib/getID'
// import { ENTimeline } from '../ENTimeline/ENTimeline'

export function UIMain() {
  let [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('reset-size', { detail: true }))
    }, 1000)
  }, [])

  return (
    ready && (
      <div className='w-full h-full bg-white '>
        <UIMainContent></UIMainContent>
      </div>
    )
  )
}

let tt = 0
let vv = 0

function UIMainContent() {
  let setRightPaneWidth = useGLBEditor((s) => s.setRightPaneWidth)
  let rightPanelWidth = useGLBEditor((s) => s.rightPanelWidth)
  let setDrawerSize = useGLBEditor((s) => s.setDrawerSize)
  let drawerSize = useGLBEditor((s) => s.drawerSize)
  let setOutlineSerach = useGLBEditor((s) => s.setOutlineSerach)
  let outlineSearch = useGLBEditor((s) => s.outlineSearch)
  let setWorkspace = useGLBEditor((s) => s.setWorkspace)
  let workspace = useGLBEditor((s) => s.workspace)
  //
  //
  //
  return (
    <>
      <div className='w-full h-screen text-xs'>
        <div className='' style={{ height: '100%' }}>
          <div className='flex w-full' style={{ height: '75px' }}>
            {[
              {
                _id: getID(),
                workspace: 'layout',
                icon: (
                  <svg
                    clipRule='evenodd'
                    fillRule='evenodd'
                    strokeLinejoin='round'
                    strokeMiterlimit='2'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-12.5 15.5h-4v-4h4zm1.5-4h4v4h-4zm9.5 0v4h-4v-4zm-15-5.5h4v4h-4zm5.5 0h4v4h-4zm5.5 0h4v4h-4zm-11-5.5h4v4h-4zm5.5 0h4v4h-4zm5.5 0h4v4h-4z'
                      fillRule='nonzero'
                    />
                  </svg>
                ),
              },
              {
                _id: getID(),
                workspace: 'program',
                icon: (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path d='M21 4c0-1.104-.896-2-2-2h-15c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h15c1.104 0 2-.896 2-2v-15zm-2 14.25c0 .414-.336.75-.75.75h-13.5c-.414 0-.75-.336-.75-.75v-13.5c0-.414.336-.75.75-.75h13.5c.414 0 .75.336.75.75v13.5zm-9 3.75v1h-1v-1h1zm2 0v1h-1v-1h1zm-4 0v1h-1v-1h1zm6 0v1h-1v-1h1zm2 0v1h-1v-1h1zm-6-22v1h-1v-1h1zm2 0v1h-1v-1h1zm-4 0v1h-1v-1h1zm6 0v1h-1v-1h1zm2 0v1h-1v-1h1zm6 13h1v1h-1v-1zm0-4h1v1h-1v-1zm0-2h1v1h-1v-1zm0 4h1v1h-1v-1zm0 4h1v1h-1v-1zm-22-2h1v1h-1v-1zm0-4h1v1h-1v-1zm0-2h1v1h-1v-1zm0 4h1v1h-1v-1zm0 4h1v1h-1v-1zm17 2h-11v-11h11v11z' />
                  </svg>
                ),
              },

              {
                _id: getID(),
                workspace: 'sphere',
                icon: (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path d='M4.262 18.324l-1.42 1.42c-1.77-2.09-2.842-4.79-2.842-7.744s1.072-5.654 2.841-7.745l1.42 1.42c-1.411 1.725-2.261 3.928-2.261 6.325s.85 4.6 2.262 6.324zm17.738-6.324c0 2.397-.85 4.6-2.262 6.324l1.42 1.42c1.77-2.09 2.842-4.79 2.842-7.744s-1.072-5.654-2.842-7.745l-1.42 1.42c1.412 1.725 2.262 3.928 2.262 6.325zm-16.324-7.738c1.724-1.412 3.927-2.262 6.324-2.262s4.6.85 6.324 2.262l1.42-1.42c-2.091-1.77-4.791-2.842-7.744-2.842-2.954 0-5.654 1.072-7.744 2.842l1.42 1.42zm12.648 15.476c-1.724 1.412-3.927 2.262-6.324 2.262s-4.6-.85-6.324-2.262l-1.42 1.42c2.09 1.77 4.79 2.842 7.744 2.842 2.953 0 5.653-1.072 7.744-2.842l-1.42-1.42z' />
                  </svg>
                ),
              },
            ].map((tab) => {
              return (
                <div
                  key={`${tab._id}`}
                  style={{ height: '75px', width: '75px' }}
                  className={
                    'flex items-center justify-center text-xs ' +
                    `${
                      tab.workspace === workspace
                        ? ' bg-blue-200'
                        : 'bg-gray-100'
                    }`
                  }
                  onClick={() => {
                    setWorkspace(tab.workspace)
                  }}
                >
                  <div style={{ height: '24px', width: '24px' }}>
                    {tab.icon}
                  </div>
                </div>
              )
            })}
          </div>

          <div className='w-full' style={{ height: 'calc(100% - 75px)' }}>
            {
              <div
                className={
                  'w-full h-full relative ' +
                  (workspace === 'layout' ? 'block' : 'hidden')
                }
              >
                <div
                  className='flex w-full'
                  style={{ height: 'calc(100% - 300px)' }}
                >
                  <ENProjectGuard
                    loading={
                      <div className='flex items-center justify-center w-full h-full bg-gray-300'>
                        <div className='p-2 px-4 bg-gray-100 rounded-full'>
                          Loading...
                        </div>
                      </div>
                    }
                    //
                    placeholder={
                      <div className='flex items-center justify-center w-full h-full bg-gray-300 from-slate-500 to-slate-300 bg-gradient-to-b'>
                        <div className='p-2 px-4 bg-gray-100 rounded-full'>
                          Please Select a GLB File Below to Begin Editing 👇🏼
                        </div>
                      </div>
                    }
                  >
                    <div style={{ width: '300px', overflow: 'auto' }}>
                      <div>
                        <input
                          type='text'
                          placeholder='Scene Outline Search'
                          className='w-full p-2 bg-gray-400 placeholder:text-white'
                          onKeyDown={(ev) => {
                            ev.stopPropagation()
                          }}
                          onInput={(ev) => {
                            setOutlineSerach(ev.target.value)
                          }}
                          value={outlineSearch}
                        ></input>
                      </div>
                      <ENSceneOutline key={'outline-1'}></ENSceneOutline>
                    </div>
                    <div style={{ width: 'calc(100% - 300px - 400px)' }}>
                      {workspace === 'layout' && (
                        <ENCanvas key='encanvas'></ENCanvas>
                      )}
                    </div>
                    <div
                      className='h-full'
                      style={{ width: '400px', overflow: 'auto' }}
                    >
                      <ENBasicParams key={'matparams'}></ENBasicParams>
                    </div>
                  </ENProjectGuard>
                </div>
                <div className='w-full text-xs ' style={{ height: '300px' }}>
                  <ENAssetDrawer size={300}></ENAssetDrawer>
                </div>
              </div>
            }
            {
              <div
                className={
                  'relative w-full h-full flex ' +
                  (workspace === 'program' ? 'block' : 'hidden')
                }
              >
                <div style={{ width: '300px', overflow: 'auto' }}>
                  <div>
                    <input
                      type='text'
                      placeholder='Scene Outline Search'
                      className='w-full p-2 bg-gray-400 placeholder:text-white'
                      onKeyDown={(ev) => {
                        ev.stopPropagation()
                      }}
                      onInput={(ev) => {
                        setOutlineSerach(ev.target.value)
                      }}
                      value={outlineSearch}
                    ></input>
                  </div>
                  <ENSceneOutline key={'outline-2'}></ENSceneOutline>
                </div>
                <div
                  style={{
                    width: 'calc(100% - 300px - 550px)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  className='flex'
                >
                  {/* <div className='relative' style={{ height: 'calc(100%)' }}> */}
                  <ENGraph></ENGraph>
                  {/* </div> */}

                  {/* */}
                  <OverlayHtml></OverlayHtml>
                </div>
                <div
                  className='relative'
                  style={{ height: '100%', width: `550px` }}
                >
                  <div
                    className='w-full'
                    style={{
                      height: '300px',
                      // width: `${Math.floor(400)}px`,
                      // height: `${Math.floor(300)}px`,
                    }}
                  >
                    {workspace === 'program' && (
                      <ENCanvas key='encanvas'></ENCanvas>
                    )}
                  </div>
                  <div
                    className='w-full'
                    style={{ height: 'calc(100% - 300px)', overflow: 'auto' }}
                  >
                    <ENParams key={'nodeparams'}></ENParams>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      {/*  */}
      {/*  */}
      {/*  */}
      {/* <ENProjectGuard
        placeholder={
          <div className='w-full h-full border-t border-gray-300'></div>
        }
      >
        <ENTimeline></ENTimeline>
      </ENProjectGuard> */}
    </>
  )
}
