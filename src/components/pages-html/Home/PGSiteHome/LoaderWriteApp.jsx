import { useSnapshot } from 'valtio'
import { CSData } from '@/aws/CSData.ts'
import { useEffect, useState } from 'react'
import { AppGroup } from '@/aws/AppGroup'
import { AppEntry } from '@/aws/AppEntry'
import { AppVersion } from '@/aws/AppVersion'
import { Button, Cascader, Dropdown, Space, message } from 'antd'
import {
  AppleOutlined,
  AppstoreAddOutlined,
  DownOutlined,
  LinkOutlined,
  UserOutlined,
} from '@ant-design/icons'

export function LoaderWriteApp({ appEntryID }) {
  let cs = useSnapshot(CSData)

  let appEntryOne = AppEntry.data.find((t) => {
    return t.oid === appEntryID
  })

  useEffect(() => {
    AppGroup.invalidate({})
  }, [])
  useEffect(() => {
    let gpID = appEntryOne?.payload?.appGroupID
    if (gpID) {
      AppVersion.invalidate({ appGroupID: gpID })
    }
  }, [appEntryOne?.payload?.appGroupID])

  //
  const appGroupItems = [
    ...AppGroup.data.map((r) => {
      return {
        label: r.slug,
        key: r.oid,
        icon: <UserOutlined />,
        raw: r,
        danger: false,
        disabled: false,
      }
    }),
  ]
  const menuAppGroup = {
    items: appGroupItems,
    onClick: ({ key }) => {
      appEntryOne.payload = appEntryOne.payload || {}
      appEntryOne.payload.appGroupID = key

      AppEntry.update({ object: appEntryOne })
    },
  }

  const appVersionItems = [
    ...AppVersion.data.map((r) => {
      return {
        label: r.slug,
        key: r.oid,
        icon: <UserOutlined />,
        raw: r,
        danger: false,
        disabled: false,
      }
    }),
  ]

  const menuAppVersion = {
    items: appVersionItems,
    onClick: ({ key }) => {
      appEntryOne.payload = appEntryOne.payload || {}
      appEntryOne.payload.appVersionID = key

      AppEntry.update({ object: appEntryOne })
    },
  }

  return (
    <div>
      <div className='flex items-center mb-3'>
        <span className='mr-3'> App</span>
        <AppstoreAddOutlined></AppstoreAddOutlined>
        <Dropdown className='ml-3' menu={menuAppGroup}>
          <Button>
            <Space>
              {AppGroup.data.find(
                (e) => e.oid === appEntryOne?.payload?.appGroupID
              )?.slug || 'Click to select'}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        {/*  */}
      </div>
      <div className='flex items-center mb-3'>
        <span className='mr-3'> Draft Version</span>

        <LinkOutlined />
        <Dropdown className='ml-3' menu={menuAppVersion}>
          <Button>
            <Space>
              {AppVersion.data.find(
                (e) => e.oid === appEntryOne?.payload?.appVersionID
              )?.slug || 'Click to select'}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
