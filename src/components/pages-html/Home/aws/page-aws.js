import { SESSION_ACCESS_KEY, UserEndPoints } from '@/auth/GateConst'

export async function fetchPages(siteID) {
  //
  //
  try {
    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      throw new Error('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/site-page-list-mine`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        //
        siteID: siteID,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    return await res.json()
  } catch (error) {
    console.error(error)
  } finally {
    console.log('finally')
  }
}
