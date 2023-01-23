import { Button, Input, Modal, Table, Tag } from 'antd'
import { useState } from 'react'
import { Checkbox, Form } from 'antd'
import { getID } from '@/lib/getID'
import { AppEntry } from '@/aws/AppEntry'

export const CreateApp = ({}) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    setLoading(true)

    console.log(title, tags)

    AppEntry.create({ title, tags }).then(() => {
      AppEntry.invalidate()
    })

    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 1000)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  let [title, setTitleInput] = useState('')
  let [tags, setTags] = useState([])

  return (
    <>
      <div className='inline-block'>
        <Button type='primary' className='inline-block' onClick={showModal}>
          Create MetaOS App Package
        </Button>
      </div>

      <Modal open={open} title='Create MetaOS App' footer={[]}>
        <div className='flex items-center mb-2'>
          <div className='w-32 pr-3 text-right'>App Title:</div>
          <div className='w-1/2'>
            <Input
              placeholder='App Title'
              onInput={(ev) => {
                //
                setTitleInput(ev.target.value)
              }}
            />
          </div>
        </div>

        <div className='flex items-center mb-2'>
          <div className='w-32 pr-3 text-right'>Hastags:</div>
          <div className='w-1/2'>
            <Input
              placeholder='add #metaverse tags'
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  let input = ev.target.value
                  ev.target.value = ''

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
                ev.target.value = ''

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
        </div>
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
