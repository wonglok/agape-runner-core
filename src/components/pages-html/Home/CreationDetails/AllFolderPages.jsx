import { useSnapshot } from 'valtio'
import { SiteStateData } from '../aws/SiteState'
import { useEffect } from 'react'
import { fetchAllCodePageInFolder } from '../aws/codepage-aws'

export function AllFolderPages({ folderID }) {
  let ssd = useSnapshot(SiteStateData)
  let pages = ssd?.codePages || []

  useEffect(() => {
    if (!folderID) {
      return
    }
    fetchAllCodePageInFolder({ folderID }).then((data) => {
      //
      SiteStateData.codePages = data?.list || []

      console.log(data?.list)
    })
  }, [folderID])

  return (
    <div>
      {pages.map((page) => {
        return (
          <div key={page.oid}>
            <div className=''></div>
            <pre>{JSON.stringify(page, null, '  ')}</pre>
          </div>
        )
      })}
    </div>
  )
}
//
//
//
//
