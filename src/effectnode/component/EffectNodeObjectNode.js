import { useEffect, useState } from 'react'
import { Codes } from '../store/codes'
// import { useEffectNode } from '../store/useEffectNode'
// import { useENEditor } from '@/vfx-studio/store/use-en-editor'

export function EffectNodeObjectNode({
  // mini,
  // effectNode,
  // mounter,
  // glbObject,
  on,
  emit,
  node,
  enRuntime,
  isEditingMode,
  disabledNodes = [],
}) {
  let [component, setComponent] = useState(null)
  useEffect(() => {
    let cleans = []

    //
    enRuntime.now.isEditingMode = isEditingMode

    let run = async () => {
      let featureModule = Codes.filter((e) => {
        let res = true

        disabledNodes.forEach((name) => {
          if (res) {
            if (e.title.indexOf(name) !== -1) {
              res = false
            }
          }
        })

        //
        // if (!res) {
        //   console.log('disabled node found:', e.title)
        // }
        //
        return res
      }).find((e) => e.title === node.codeID)

      //
      if (featureModule) {
        featureModule
          //
          .loader()
          .then(async (logic) => {
            enRuntime.set(node._id, node)

            //

            //
            //
            // let queue = []
            //
            //

            let mode = 'queue'
            enRuntime.ready['all-ready'].then(() => {
              mode = 'can-send'

              //
              // queue.forEach((ev) => {
              //   emit(ev.event, ev.data)
              // })
              // comments.log(ev);
            })

            //  if (mode === 'can-send') {
            //  } else {
            //    queue.push({
            //      event: output._id,
            //      data,
            //    })
            //  }
            //

            let portsAPIMap = new Map()

            let inputs = node.inputs || []
            let outputs = node.outputs || []

            //
            // portsAPIMap.set(`in${idx}`, {
            // });

            inputs.forEach((input, idx) => {
              let answer = false

              on(input._id, (v) => {
                answer = v
              })
              //
              let api = {
                stream: (onReceive) => {
                  let myanswer = false
                  let canSend = true
                  on(input._id, (v) => {
                    myanswer = v
                    onReceive(v)
                  })
                  let tt = setInterval(() => {
                    if (myanswer) {
                      if (canSend) {
                        canSend = false
                        clearInterval(tt)
                        onReceive(myanswer)
                      }
                    }
                  }, 0)
                },
                get ready() {
                  return new Promise((resolve) => {
                    let tt = setInterval(() => {
                      if (answer) {
                        clearInterval(tt)
                        resolve(answer)
                      }
                    }, 0)
                  })
                },
              }

              portsAPIMap.set(`in${idx}`, api)
              portsAPIMap.set(`in_${input.name}`, api)
            })

            outputs.forEach((output, idx) => {
              let stream = {
                pulse: (data) => {
                  let ttt = setInterval(() => {
                    if (mode === 'can-send') {
                      emit(output._id, data)
                      clearInterval(ttt)
                    }
                  })

                  // if (mode === 'can-send') {
                  // } else {
                  //   queue.push({
                  //     event: output._id,
                  //     data,
                  //   })
                  // }
                },
              }
              portsAPIMap.set(`out_${output.name}`, stream)
              portsAPIMap.set(`out${idx}`, stream)
            })

            let nodeAPI = new Proxy(node, {
              get: (obj, key) => {
                if (key === 'data') {
                  return node
                }
                if (key === 'raw') {
                  return node
                }

                if (key.indexOf('in_') === 0) {
                  return portsAPIMap.get(key)
                }
                if (key.indexOf('out_') === 0) {
                  return portsAPIMap.get(key)
                }

                //
                if (key.indexOf('in') === 0 && !isNaN(key[2])) {
                  return portsAPIMap.get(key)
                }

                if (key.indexOf('out') === 0 && !isNaN(key[3])) {
                  return portsAPIMap.get(key)
                }

                if (obj[key]) {
                  return obj[key]
                }
                //
              },
            })

            //

            let dataAPI = new Proxy(
              {},
              {
                get: (obj, accessKey) => {
                  if (accessKey === 'raw') {
                    if (enRuntime && enRuntime.now[node._id]) {
                      return enRuntime.now[node._id]
                    } else {
                      return null
                    }
                  } else if (accessKey === 'value') {
                    if (enRuntime && enRuntime.now[node._id])
                      return new Proxy(
                        {},
                        {
                          get: (_ooo, entryName) => {
                            let obj = enRuntime.now[node._id].uniforms.find(
                              (e) => e.name === entryName
                            )
                            if (obj) {
                              return obj.value
                            } else {
                              return undefined
                            }
                          },
                        }
                      )
                  } else if (
                    //
                    accessKey === 'shaders' ||
                    accessKey === 'materials' ||
                    accessKey === 'uniforms'
                  ) {
                    //
                    return new Proxy(
                      {},
                      {
                        get: (obj, entryName) => {
                          return (hander) => {
                            enRuntime.onClean(
                              enRuntime.onChange(
                                node._id,
                                (nodeData) => {
                                  //
                                  let arr = nodeData[accessKey] || []
                                  let founds = arr.filter(
                                    (m) => m.name === entryName
                                  )

                                  founds.forEach((found) => {
                                    hander(found)
                                  })

                                  if (founds.length > 1) {
                                    console.log(
                                      'duplicated item detected',
                                      entryName
                                    )
                                  }
                                },
                                {
                                  initFire: true,
                                }
                              )
                            )
                          }
                        },
                      }
                    )
                  }
                  //
                },
              }
            )

            //
            let hhhh = ({ detail }) => {
              if (detail._id === node._id) {
                enRuntime.now[detail._id] = detail
              }
            }
            window.addEventListener('pulse-node', hhhh)

            let mini = enRuntime.makeDisposableNode({ name: node.displayTitle })

            cleans.push(() => {
              window.removeEventListener('pulse-node', hhhh)
              mini.clean()
            })

            //
            logic
              .effect({
                mini,
                node: nodeAPI,
                data: dataAPI,
                setComponent,
              })
              ?.catch((e) => {
                console.log(e)
              })
              .then(() => {})
          })
      } else {
      }
    }

    //

    run().then(() => {
      enRuntime.now['ok' + node._id] = true
    })

    return () => {
      cleans.forEach((c) => c())
    }
  }, [])

  //
  //

  //
  return (
    <>
      {/*  */}
      {/*  */}
      {component}
    </>
  )
}

//
