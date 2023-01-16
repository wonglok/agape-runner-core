import { SESSION_ACCESS_KEY, UserEndPoints } from '@/auth/GateConst'

export async function createCodePage({ slug, folderID }) {
  const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY)
  if (!sToken) {
    console.error('no session token')
    return Promise.reject('no session token')
  }
  if (!slug) {
    console.error('no slug given')
    return Promise.reject('no slug given')
  }

  try {
    const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]

    const response = await fetch(`${myAPIEndPoint}/codepage-create`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        slug: slug,
        folderID: folderID,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      return data
    } else {
      let data = await response.json()
      console.error('server error', data.reason)
      return Promise.reject(data.reason)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('server error', error)
    return Promise.reject('server error')
  }
}

export async function fetchAllCodePageInFolder({
  folderID,
  reloadID = Math.random(),
}) {
  //
  //
  try {
    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      throw new Error('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/codepage-list?r=${reloadID}`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        //
        folderID,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    return await res.json()
  } catch (error) {
    console.error(error)
  } finally {
    console.log('done fetchAllCodePage')
  }
}
