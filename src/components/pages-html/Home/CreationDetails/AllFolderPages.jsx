import { useSnapshot } from 'valtio'
import { SiteStateData } from '../aws/SiteState'
import { useEffect } from 'react'
import { fetchAllCodePageInFolder } from '../aws/codepage-aws'
import { OnePageRecord } from './OnePageRecord'

export function AllFolderPages({ folderID }) {
  let ssd = useSnapshot(SiteStateData)
  let pages = ssd?.codePages || []

  useEffect(() => {
    if (!folderID) {
      return
    }
    fetchAllCodePageInFolder({ folderID }).then(
      (data) => {
        //
        SiteStateData.codePages = data?.list || []
      },
      async (err) => {
        //
        console.log(await err)
      }
    )
  }, [folderID])

  //

  //
  return (
    <div>
      {pages.map((page) => {
        return <OnePageRecord key={page.oid} page={page}></OnePageRecord>
      })}
    </div>
  )
}
//
//
//
//
