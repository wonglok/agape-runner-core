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
      return Promise.reject('server error ' + data.reason)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('server error', error)
    return Promise.reject('server error')
  }
}
