import { SESSION_ACCESS_KEY, UserEndPoints } from '@/auth/GateConst'

export async function fetchPages({ siteID = '', reloadID = Math.random() }) {
  //
  //
  try {
    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      throw new Error('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/site-page-list-mine?r=${reloadID}`, {
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
    console.log('fetch pages', siteID)
  }
}

export async function removePage({ oid }) {
  //
  //
  try {
    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      throw new Error('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/site-page-remove`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        //
        oid: oid,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    return await res.json()
  } catch (error) {
    console.error(error)
  } finally {
    console.log('removePage')
  }
}

export async function updatePage({ object }) {
  //
  //
  try {
    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      throw new Error('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/site-page-update`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        object,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    return await res.json()
  } catch (error) {
    console.error(error)
  } finally {
    console.log('updatePage')
  }
}
