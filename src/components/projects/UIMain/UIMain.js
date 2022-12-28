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

//
function UIMainContent() {
  let setRightPaneWidth = useGLBEditor((s) => s.setRightPaneWidth)
  let rightPanelWidth = useGLBEditor((s) => s.rightPanelWidth)
  let setDrawerSize = useGLBEditor((s) => s.setDrawerSize)
  let drawerSize = useGLBEditor((s) => s.drawerSize)
  let setOutlineSerach = useGLBEditor((s) => s.setOutlineSerach)
  let outlineSearch = useGLBEditor((s) => s.outlineSearch)
  //
  //
  //
  return (
    <>
      <div
        // - 48px - 30px
        className='relative w-full text-xs  bordergray-500  '
        style={{ height: 'calc(100% )' }}
      >
        <div className='w-full'>
          <LeftRight
            NS={'canvas-control'}
            left={(leftSize) => (
              <UpDown
                NS={'asset-layercanvas'}
                getDefaultSize={() => {
                  return window.innerHeight - 175
                }}
                up={(sizeTD) => (
                  <>
                    <LeftRight
                      getDefaultSize={() => 300}
                      NS={'layers-canvas'}
                      left={() => (
                        <ENProjectGuard>
                          <UpDown
                            getDefaultSize={() => {
                              return ((window.innerHeight - 175) / 5) * 2.5
                            }}
                            NS={'ENSceneOutline-up-down'}
                            up={(varHeight) => {
                              return (
                                <div
                                  className='w-full'
                                  style={{ height: varHeight + 'px' }}
                                >
                                  <div
                                    style={{ height: '35' + 'px' }}
                                    className=''
                                  >
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
                                  </div>
                                  <ENSceneOutline
                                    height={varHeight - 35}
                                  ></ENSceneOutline>
                                </div>
                              )
                            }}
                            //
                            down={(varHeight) => {
                              return (
                                <div
                                  className='w-full'
                                  style={{ height: sizeTD - varHeight + 'px' }}
                                >
                                  <div
                                    style={{ height: '35' + 'px' }}
                                    className='flex items-center justify-center bg-gray-300'
                                  >
                                    <div>Helper</div>
                                  </div>
                                  <div
                                    className='w-full'
                                    style={{
                                      height: sizeTD - varHeight - 35 + 'px',
                                    }}
                                  >
                                    <div></div>
                                  </div>
                                </div>
                              )
                            }}
                          ></UpDown>
                        </ENProjectGuard>
                      )}
                      right={(size) => (
                        <UpDown
                          NS={'param-graph'}
                          getDefaultSize={() => {
                            return ((window.innerHeight - 175) / 5) * 3
                          }}
                          up={(up) => (
                            <div
                              className='relative w-full h-full'
                              style={{
                                width:
                                  window.innerWidth -
                                  (rightPanelWidth + size) +
                                  'px',
                              }}
                            >
                              {/* material.agape.json */}
                              <ENProjectGuard>
                                <ENCanvas key='encanvas'></ENCanvas>
                              </ENProjectGuard>
                              <OverlayHtml></OverlayHtml>
                            </div>
                          )}
                          down={(up) => (
                            <div
                              className='w-full'
                              style={{
                                height:
                                  window.innerHeight - drawerSize - up + 'px',
                              }}
                            >
                              <ENProjectGuard
                                //
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
                                      Please Select a GLB File Below to Begin
                                      Editing 👇🏼
                                    </div>
                                  </div>
                                }
                              >
                                <ENGraph></ENGraph>
                              </ENProjectGuard>
                            </div>
                          )}
                        ></UpDown>
                      )}
                    ></LeftRight>
                  </>
                )}
                down={(size) => {
                  setTimeout(() => {
                    setDrawerSize(window.innerHeight - size)
                  })

                  return (
                    <div
                      className='w-full bg-white'
                      style={{ height: size + 'px' }}
                    >
                      <ENAssetDrawer size={size}></ENAssetDrawer>
                    </div>
                  )
                }}
              ></UpDown>
            )}
            //
            //
            right={(size) => {
              //
              setTimeout(() => {
                setRightPaneWidth(window.innerWidth - size)
              })

              return (
                <div style={{ height: '100%' }}>
                  <ENProjectGuard>
                    <PropTabs
                      tabs={[
                        {
                          name: 'mat',
                          label: 'Basic Properties',
                          compo: (
                            <ENBasicParams key={'matparams'}></ENBasicParams>
                          ),
                        },
                        {
                          name: 'node',
                          label: 'Advanced Properties (Overrides)',
                          compo: <ENParams key={'nodeparams'}></ENParams>,
                        },
                      ]}
                    ></PropTabs>
                  </ENProjectGuard>

                  {/*
                  <UpDown
                    NS={'param-graph'}
                    getDefaultSize={() => {
                      return 300
                    }}
                    up={() => (
                      <ENProjectGuard>
                        <ENParams></ENParams>
                      </ENProjectGuard>
                    )}
                    down={() => (
                      <ENProjectGuard>
                        <ENGraph></ENGraph>
                      </ENProjectGuard>
                    )}
                  ></UpDown> */}
                </div>
              )
            }}
          ></LeftRight>
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

function LeftRight({
  NS = 'left-right',
  getDefaultSize = () => window.innerWidth - 500,
  left,
  right,
}) {
  //
  let [size, setSize] = useState(1)
  let [onoff, setOnOff] = useState(true)

  let canRun = useRef(true)
  useEffect(() => {
    return () => {
      canRun.current = false
    }
  }, [])
  useEffect(() => {
    window.dispatchEvent(new Event('reset-size', { detail: true }))
  }, [size])
  useEffect(() => {
    let ttt = setInterval(() => {
      canRun.current &&
        setSize(parseInt(localStorage.getItem(NS), 10) || getDefaultSize())
    }, 100)
    return () => {
      clearInterval(ttt)
    }
  }, [NS, getDefaultSize])
  useEffect(() => {
    canRun.current && setSize(getDefaultSize())
    let reset = ({ detail: isReset }) => {
      //
      if (isReset) {
        localStorage.setItem(NS, getDefaultSize())
      }
      canRun.current && setOnOff(Math.random())
    }
    // window.addEventListener('resize', hh)
    window.addEventListener('reset-size', reset)

    return () => {
      // window.removeEventListener('resize', hh)
      window.removeEventListener('reset-size', reset)
    }
  }, [])
  return (
    <>
      {
        <SplitPane
          split='vertical'
          size={parseInt(localStorage.getItem(NS), 10) || getDefaultSize()}
          defaultSize={
            parseInt(localStorage.getItem(NS), 10) || getDefaultSize()
          }
          onChange={(size) => {
            clearTimeout(tt)
            tt = setTimeout(() => {
              localStorage.setItem(NS, size)
              canRun.current && setSize(size)
            }, 100)
          }}
        >
          <>{left(size)}</>
          <>{right(size)}</>
        </SplitPane>
      }
    </>
  )
}

export function UpDown({
  NS = 'updown1',
  getDefaultSize = () => window.innerHeight - 24 - 24 - 280,
  up = () => <>up</>,
  down = () => <>down</>,
}) {
  let [size, setSize] = useState(1)
  let [onoff, setOnOff] = useState(true)

  let canRun = useRef(true)
  useEffect(() => {
    return () => {
      canRun.current = false
    }
  }, [])

  useEffect(() => {
    window.dispatchEvent(new Event('reset-size', { detail: true }))
  }, [size])
  useEffect(() => {
    let ttt = setInterval(() => {
      canRun.current &&
        setSize(parseInt(localStorage.getItem(NS), 10) || getDefaultSize())
    }, 100)
    return () => {
      clearInterval(ttt)
    }
  }, [NS, getDefaultSize])

  //
  useEffect(() => {
    let reset = ({ detail: isReset }) => {
      //
      if (isReset) {
        localStorage.setItem(NS, getDefaultSize())
      }

      //
      canRun.current && setOnOff(Math.random())
    }
    // window.addEventListener('resize', hh)
    window.addEventListener('reset-size', reset)

    return () => {
      // window.removeEventListener('resize', hh)
      window.removeEventListener('reset-size', reset)
    }
  }, [])
  return (
    <>
      {
        <SplitPane
          split='horizontal'
          size={parseInt(localStorage.getItem(NS), 10) || getDefaultSize()}
          defaultSize={
            parseInt(localStorage.getItem(NS), 10) || getDefaultSize()
          }
          onChange={(size) => {
            clearTimeout(vv)
            vv = setTimeout(() => {
              localStorage.setItem(NS, size)
              canRun.current && setSize(size)
            }, 100)
          }}
        >
          <>{up(size)}</>
          <>{down(size)}</>
        </SplitPane>
      }
    </>
  )
}
