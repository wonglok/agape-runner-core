import { useSnapshot } from 'valtio'
import Link from 'next/link'
import { CSData } from '@/aws/CSData'
import { useEffect, useRef, useState } from 'react'
import { AppEntry } from '@/aws/AppEntry'
import { Input, Tag } from 'antd'
import { getID } from '@/lib/getID'

export function AllAppEntry() {
  let cs = useSnapshot(CSData)

  let [query, setQuery] = useState('')
  useEffect(() => {
    AppEntry.invalidate()
  }, [])

  //

  let result = cs.appEntry.filter(
    (e) =>
      e?.title?.includes(query) ||
      e?.tags?.some((t) => t?.name?.includes(query))
  )

  return (
    <div className='flex-none w-full max-w-full px-4 mt-4 mb-6'>
      <div className='relative flex flex-col min-w-0 mx-2 break-words bg-white border shadow-inner border-slate-400 shadow-slate-200 shadow-soft-xl rounded-2xl bg-clip-border'>
        <div className='p-4 pb-0 mb-0 rounded-t-2xl'>
          <h6 className='mb-1 text-xl'>My Apps</h6>

          <div className='inline-block mb-3'>
            <Input
              onInput={(ev) => {
                setQuery(ev.target.value)
              }}
              placeholder='search'
            ></Input>
          </div>

          {result.map((it) => {
            return <OneEntry key={it.oid} oid={it.oid}></OneEntry>
          })}

          {/*  */}

          {cs.appEntry.length === 0 && (
            <>
              <div className='mb-3 text-sm leading-normal'>
                Please create an item.
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
  let it = cs.appEntry.find((e) => e.oid === oid)

  let time = useRef(0)
  return (
    <div key={it.oid} className='mb-3'>
      <div className='flex items-center mb-3 text-sm leading-normal'>
        {/* <button className='p-2 px-4 mr-2 bg-gray-100 rounded-xl'>
          {it.title}
        </button> */}

        <button
          onClick={() => {
            CSData.appEntryID = it.oid
          }}
          className='inline-block p-2 px-4 mr-2 text-white bg-blue-500 rounded-xl'
        >
          Edit MetaOS App
        </button>

        <div className='inline-block'>
          <div className='inline-block'>
            <input
              className='p-2 mr-2 border-2 rounded-lg'
              defaultValue={it.title}
              onInput={(ev) => {
                clearInterval(time.current)
                time.current = setTimeout(() => {
                  let obj = CSData.appEntry.find((e) => e.oid === oid)
                  obj.title = ev.target.value

                  AppEntry.update({ object: obj }).then((e) => {
                    console.log(e)
                  })
                }, 500)
              }}
            ></input>
          </div>

          <button
            onClick={() => {
              let obj = CSData.appEntry.find((e) => e.oid === oid)

              AppEntry.update({ object: obj }).then((e) => {
                console.log(e)
              })
            }}
            className='p-2 px-4 mr-2 text-white bg-yellow-500 rounded-xl'
          >
            Rename
          </button>
        </div>

        <div className='inline-block p-2 border border-gray-300 rounded-xl'>
          <input
            className='px-2 py-1 mr-3 text-xs border-2 rounded-xl'
            placeholder='+ tags'
            defaultValue={''}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                let input = ev.target.value

                let obj = CSData.appEntry.find((e) => e.oid === oid)
                obj.tags = obj.tags || []
                obj.tags.push({
                  oid: getID(),
                  name: input,
                })

                AppEntry.update({ object: obj }).then((e) => {
                  console.log(e)
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
                  let obj = CSData.appEntry.find((e) => e.oid === oid)
                  obj.tags = obj.tags || []

                  let tags = obj.tags

                  tags.splice(
                    tags.findIndex((ta) => ta.oid === t.oid),
                    1
                  )

                  AppEntry.update({ object: obj }).then((e) => {
                    console.log(e)
                  })
                }}
              >
                {t.name}
              </Tag>
            )
          })}
        </div>
      </div>
    </div>
  )
}
