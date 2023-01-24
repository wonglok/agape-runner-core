import { AppVersion } from '@/aws/AppVersion'
import { CSData } from '@/aws/CSData'
import { getID } from '@/lib/getID'
import { setBGTo } from '@/lib/setBGTo'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useSnapshot } from 'valtio'

// const confirm = Modal.confirm

export function ExtendWithVersion({ appGroupID }) {
  let cs = useSnapshot(CSData)
  // let { appGroupID } = cs

  let appGroupOne = CSData.appEntry.find((t) => {
    return t.oid === appGroupID
  })

  useEffect(() => {
    if (appGroupID) {
      AppVersion.invalidate({ appGroupID: appGroupID })
    }
  }, [appGroupID])
  return (
    <>
      <h6 className=' mb-3 text-sm'>Different Versions</h6>

      <p className='mb-3 text-sm leading-normal'>
        <button
          className='px-6 py-3 text-white bg-blue-500 rounded-xl'
          onClick={() => {
            //
            AppVersion.create({
              title: new Date().getTime(),
              slug: getID(),
              appGroupID: appGroupID,
            }).then((response) => {
              //
              console.log(response)
              //
              AppVersion.invalidate({ appGroupID: appGroupID })
            })
          }}
        >
          Create an new 3D WebApp Version
        </button>
      </p>

      {cs?.appVersions?.length > 0 ? (
        <>
          <div>
            {cs?.appVersions?.map((it) => {
              return (
                <OneVersion
                  appGroupOne={appGroupOne}
                  key={it.oid}
                  oid={it.oid}
                ></OneVersion>
              )
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

function OneVersion({ oid }) {
  //
  let av = useSnapshot(AppVersion.data)

  let it = (av || []).find((ver) => {
    return ver.oid === oid
  })

  let renameRef = useRef()

  return (
    <>
      {it && (
        <>
          <div className='mb-3 text-xs'>
            <div className='inline-block rounded-xl' ref={renameRef}>
              <div className='inline-block'>
                <button
                  onClick={() => {
                    let { destroy, update } = Modal.confirm({
                      closable: true,
                      title: 'Do you want to remove this file?',
                      icon: <ExclamationCircleFilled />,
                      content: `Confirm removal of "${it.title}"`,

                      footer: (
                        <div className='text-right'>
                          <button
                            key={'remove'}
                            onClick={() => {
                              new Promise(async (resolve, reject) => {
                                destroy()
                                await AppVersion.remove({ object: it })
                                await setTimeout(resolve, 10)
                              })
                                .catch(() => console.log('Oops errors!'))
                                .finally(() => {
                                  AppVersion.invalidate({
                                    appGroupID: it.appGroupID,
                                  })
                                })
                            }}
                            className='inline-block p-3 px-4 mx-2 my-3 text-white bg-red-500 border rounded-lg'
                          >
                            Remove
                          </button>
                          <button
                            key={'cancel'}
                            onClick={() => {
                              new Promise((resolve, reject) => {
                                setTimeout(resolve, 10)
                              })
                                .catch(() => console.log('Oops errors!'))
                                .finally(() => {
                                  destroy()
                                })
                            }}
                            className='inline-block p-3 px-4 mx-2 my-3 bg-white border rounded-lg'
                          >
                            Cancel
                          </button>
                        </div>
                      ),
                      onCancel() {},
                    })
                  }}
                  className='inline-block p-3 px-4 bg-red-500 border rounded-lg rounded-r-none bg-opacity-30'
                >
                  Remove
                </button>
                <button
                  onClick={() => {}}
                  className='inline-block p-3 px-4 bg-purple-500 border border-l-0 bg-opacity-30'
                >
                  Edit
                </button>

                <button onClick={() => {}}></button>
                <input
                  className='p-3 bg-white border border-l-0 rounded-lg rounded-l-none rounded-r-none bg-opacity-30'
                  defaultValue={it?.title || ''}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                      //
                      let obj = CSData.appVersions.find((e) => e.oid === oid)
                      obj.title = ev.target.value

                      setBGTo(renameRef.current, 'bg-yellow-300')
                      AppVersion.update({ object: obj })
                        .then(
                          (e) => {
                            console.log(e)
                            setBGTo(renameRef.current, 'bg-green-300')
                          },
                          () => {
                            setBGTo(renameRef.current, 'bg-red-300')
                          }
                        )
                        .finally(() => {
                          setTimeout(() => {
                            setBGTo(renameRef.current, 'bg-transparent')
                          }, 1000)
                          //
                        })
                    }
                  }}
                  onInput={(ev) => {
                    let obj = CSData.appVersions.find((e) => e.oid === oid)
                    obj.title = ev.target.value

                    setBGTo(renameRef.current, 'bg-yellow-100')
                  }}
                ></input>
              </div>

              <button
                onClick={(ev) => {
                  let obj = CSData.appVersions.find((e) => e.oid === oid)

                  setBGTo(renameRef.current, 'bg-yellow-300')

                  AppVersion.update({ object: obj })
                    .then(
                      (e) => {
                        setBGTo(renameRef.current, 'bg-green-300')
                      },
                      () => {
                        setBGTo(renameRef.current, 'bg-red-300')
                      }
                    )
                    .finally(() => {
                      setTimeout(() => {
                        setBGTo(renameRef.current, 'bg-transparent')
                      }, 1000)
                    })
                }}
                className='p-3 px-4 bg-white border border-l-0  rounded-l-none rounded-xl bg-opacity-30'
              >
                Rename
              </button>
            </div>

            <div></div>
          </div>
        </>
      )}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </>
  )
}

//
