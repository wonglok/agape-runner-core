import { useSnapshot } from 'valtio'
import { CSData } from '@/aws/CSData'
import { useEffect, useRef, useState } from 'react'
import { AppGroup } from '@/aws/AppGroup'
import { Input, Modal, Tag } from 'antd'
import { getID } from '@/lib/getID'
import { setBGTo } from '@/lib/setBGTo'
import { CreateAppGroup } from './CreateAppGroup'
import { ExtendWithVersion } from './ExtendWithVersion'
import { ExclamationCircleFilled } from '@ant-design/icons'

export function AllAppGroup() {
  let cs = useSnapshot(CSData)

  let [query, setQuery] = useState('')
  useEffect(() => {
    AppGroup.invalidate({}).then(() => {
      AppGroup.data = AppGroup.data || []

      let preferApp =
        AppGroup.data.find((e) => e.slug === '/') || AppGroup.data[0]
      if (preferApp && preferApp.oid) {
        CSData.appGroupID = preferApp.oid
      }
    })
  }, [])

  let result = cs.appGroup.filter(
    (e) =>
      e?.slug?.includes(query) || e?.tags?.some((t) => t?.name?.includes(query))
  )

  return (
    <div className='flex-none w-full max-w-full px-4 mt-4 mb-6'>
      <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
          <h6 className=' mb-3 text-xl'>3D WebApps Studio</h6>

          <div className='inline-block w-full mb-3 lg:w-1/3'>
            <input
              onInput={(ev) => {
                setQuery(ev.target.value)
              }}
              placeholder='Search pages and filter hashtags'
            ></input>
          </div>

          {result.map((it) => {
            return <OneEntry key={it.oid} oid={it.oid}></OneEntry>
          })}

          {cs.appGroup.length === 0 && (
            <>
              <div className='mb-3 text-sm leading-normal'>
                Please create an App.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function OneEntry({ oid }) {
  let cs = useSnapshot(CSData)
  let it = cs?.appGroup?.find((e) => e.oid === oid)
  //
  let renameRef = useRef()

  // let time = useRef(0)
  return (
    <>
      {it && (
        <div key={it?.oid} className='mb-3'>
          <div className='flex flex-wrap items-center mb-3 text-sm leading-normal'>
            <button
              onClick={() => {
                CSData.appGroupID = it.oid
              }}
              className='inline-block p-3 px-4 mr-2 text-white bg-blue-500 rounded-xl'
            >
              Edit
            </button>

            <div className='inline-flex rounded-xl' ref={renameRef}>
              <div className='inline-block'>
                <button className='p-3 px-4 bg-white border-2 rounded-lg rounded-r-none bg-opacity-50'>
                  App
                </button>
                <input
                  className='p-3 bg-white border-2 border-l-0 rounded-lg rounded-l-none rounded-r-none bg-opacity-50'
                  defaultValue={it?.slug || ''}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                      //
                      let obj = AppGroup.data.find((e) => e.oid === oid)
                      obj.slug = ev.target.value

                      setBGTo(renameRef.current, 'bg-yellow-300')
                      AppGroup.update({ object: obj })
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
                    let obj = AppGroup.data.find((e) => e.oid === oid)
                    obj.slug = ev.target.value

                    setBGTo(renameRef.current, 'bg-yellow-100')
                  }}
                ></input>
              </div>

              <button
                onClick={(ev) => {
                  let obj = AppGroup.data.find((e) => e.oid === oid)

                  setBGTo(renameRef.current, 'bg-yellow-300')

                  AppGroup.update({ object: obj })
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
                className='p-3 px-4 bg-white border-2 border-l-0  rounded-l-none rounded-r-none rounded-xl bg-opacity-50'
              >
                Rename
              </button>

              <button
                onClick={() => {
                  let { destroy, update } = Modal.confirm({
                    closable: true,
                    title: 'Do you want to remove this file?',
                    icon: <ExclamationCircleFilled />,
                    content: `Confirm removal of "${it.slug}"`,

                    footer: (
                      <div className='text-right'>
                        <button
                          key={'remove'}
                          onClick={() => {
                            new Promise(async (resolve, reject) => {
                              destroy()
                              await AppGroup.remove({ object: it })
                              await setTimeout(resolve, 10)
                            })
                              .catch(() => console.log('Oops errors!'))
                              .finally(() => {
                                AppGroup.invalidate({
                                  //
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
                className='p-3 px-4 bg-red-300 border-2 border-l-0  rounded-l-none rounded-xl bg-opacity-50'
              >
                Delete
              </button>
            </div>

            <div className='inline-block p-2 ml-2  border-2 border-gray-300 rounded-xl'>
              <input
                className='px-2 py-1 mr-3 text-xs border-2 rounded-xl'
                placeholder='+ tags'
                defaultValue={''}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter') {
                    let input = ev.target.value

                    let obj = AppGroup.data.find((e) => e.oid === oid)
                    obj.tags = obj.tags || []
                    obj.tags.push({
                      oid: getID(),
                      name: input,
                    })

                    setBGTo(renameRef.current, 'bg-yellow-300')
                    AppGroup.update({ object: obj })
                      .then(
                        (e) => {
                          console.log(e)
                          setBGTo(renameRef.current, 'bg-green-300')
                        },
                        async (err) => {
                          console.log(await err)
                          setBGTo(renameRef.current, 'bg-red-300')
                        }
                      )
                      .finally(() => {
                        setTimeout(() => {
                          setBGTo(renameRef.current, 'bg-transparent')
                        }, 1000)
                      })

                    setTimeout(() => {
                      ev.target.value = ''
                    })
                  }
                }}
              ></input>

              {(it?.tags || []).map((t) => {
                return (
                  <Tag
                    key={t.oid}
                    closable
                    onClose={() => {
                      let obj = AppGroup.data.find((e) => e.oid === oid)
                      obj.tags = obj.tags || []

                      let tags = obj.tags

                      tags.splice(
                        tags.findIndex((ta) => ta.oid === t.oid),
                        1
                      )

                      AppGroup.update({ object: obj }).then(
                        (e) => {
                          console.log(e)
                        },
                        () => {
                          //
                        }
                      )
                    }}
                  >
                    {t.name}
                  </Tag>
                )
              })}
            </div>
          </div>

          <div className='mb-3'></div>
        </div>
      )}
    </>
  )
}
