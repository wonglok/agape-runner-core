/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { GateState } from '@/auth/GateState.ts'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'
import { StylesDashboard } from '../Compos/StylesDashboard'
import { SmartDrawer } from '../Compos/SmartDrawer'
import { useRouter } from 'next/router'
import { novaFolderCreate } from '../aws/nova-folder-aws'
import { DateTime } from 'luxon'
import { CSData, invalidateAppGruop } from '../aws/CSData'
import { AppFolder } from './AppFolder'
import { useEffect } from 'react'

export function PGDeveloper({ content }) {
  //
  let gs = useSnapshot(GateState)

  //
  //
  //
  let {
    query: { folderID },
  } = useRouter()

  useEffect(() => {
    invalidateAppGruop()
  }, [])

  //
  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu folderID={folderID}></LeftMenu>
        <SmartDrawer className=''>
          <SectionHeader
            title='App Developer Studio'
            subTitle='Apps and Procedural VFX'
            bgImage='/brand/pink-yellow.svg'
            bgOffsetY={50}
            bar={
              <>
                {/*  */}
                <div className='flex items-center w-full h-full'>
                  <button
                    onClick={() => {
                      //
                      let dt = DateTime.local()
                      novaFolderCreate({
                        displayName:
                          'new app - ' + `${dt.toFormat('yyyy LLL dd tt')}`,
                      }).then((done) => {
                        console.log(done)
                        invalidateAppGruop()
                      })
                      //
                    }}
                    className='inline-block w-20 h-20 p-2 mr-3 text-xs bg-white border-2 border-gray-400 shadow-xl rounded-2xl'
                  >
                    Create MetaOS App
                  </button>
                </div>
              </>
            }
          ></SectionHeader>
          <AppFolder></AppFolder>
          {/* <MyFolders></MyFolders> */}
        </SmartDrawer>
      </DesktopOnly>
    </>
  )
}

//

//
