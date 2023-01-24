import { Button, Input, Modal, Table, Tag } from 'antd'
import { useState } from 'react'
import { Checkbox, Form } from 'antd'
import { getID } from '@/lib/getID'
import { AppGroup } from '@/aws/AppGroup'

export const CreateAppGroup = ({}) => {
  let [title, setTitleInput] = useState('')
  let [tags, setTags] = useState([])

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    setLoading(true)

    AppGroup.create({ slug: title, tags }).then(() => {
      AppGroup.invalidate()
    })

    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 1000)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <div className='inline-block'>
        <button
          className='inline-block p-3 px-5 text-white bg-blue-500 rounded-lg'
          onClick={showModal}
        >
          Create App
        </button>
      </div>

      <Modal
        onCancel={() => {
          setOpen(false)
        }}
        //
        open={open}
        title={`Let's create YOUR metaverse.`}
        footer={[]}
      >
        <div className='flex items-center mb-2'>
          <div className='w-32 pr-3 text-right'>Title:</div>
          <div className='w-1/2'>
            <div className='inline-block px-4 py-2 bg-white border-2 border-gray-300 rounded-l-lg'>
              🌍
            </div>
            <input
              defaultValue={''}
              placeholder='about-me'
              className='p-2 bg-white border-2 border-l-0 border-gray-300 rounded-l-none rounded-xl'
              onInput={(ev) => {
                setTitleInput(ev.target.value)
              }}
            />
          </div>
        </div>

        {/* <div className='flex items-center mb-2'>
          <div className='w-32 pr-3 text-right'>Hastags:</div>
          <div className='w-1/2'>
            <div className='inline-block px-4 py-2 bg-white border-2 border-gray-300 rounded-l-lg'>
              #
            </div>
            <input
              placeholder='add hashtags'
              className='p-2 bg-white border-2 border-l-0 border-gray-300 rounded-l-none rounded-xl'
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  let input = ev.target.value
                  setTimeout(() => {
                    ev.target.value = ''
                  })

                  if (input) {
                    setTags((s) => {
                      if (s.some((s) => s.name === input)) {
                        return s
                      }
                      return [{ oid: getID(), name: input }, ...s]
                    })
                  }
                }
              }}
              onBlur={(ev) => {
                let input = ev.target.value
                setTimeout(() => {
                  ev.target.value = ''
                })

                if (input) {
                  setTags((s) => {
                    if (s.some((s) => s.name === input)) {
                      return s
                    }
                    return [{ oid: getID(), name: input }, ...s]
                  })
                }
              }}
            />
            <div className='mt-2'>
              {tags.map((t) => {
                return (
                  <Tag
                    key={t.oid}
                    closable
                    onClose={() => {
                      setTags((s) => {
                        s.splice(
                          s.findIndex((i) => i.oid === t.oid),
                          1
                        )
                        return [...s]
                      })
                    }}
                  >
                    {t.name}
                  </Tag>
                )
              })}
            </div>
          </div>
        </div> */}
        <div className='flex items-center mb-2'>
          <div className='w-32 pr-3 text-right'></div>
          <div className='w-1/2'>
            <Button
              key='submit'
              type='primary'
              loading={loading}
              htmlType='submit'
              onClick={() => {
                handleOk()
              }}
            >
              Submit
            </Button>
            <Button
              className='ml-3'
              key='cancel'
              type='default'
              onClick={() => {
                handleCancel()
              }}
            >
              Cancel
            </Button>
          </div>
        </div>

        {/* */}
      </Modal>
    </>
  )
}
