import { SESSION_ACCESS_KEY, UserEndPoints } from '@/auth/GateConst'

export async function checkSiteIDTaken({ slug }) {
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
    //
    const response = await fetch(`${myAPIEndPoint}/site-id-taken`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        slug: slug,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      return data?.ok === true
    } else {
      console.error('bad session token')
      return Promise.reject('bad session token')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('bad json', error)
    return Promise.reject('bad json')
  }
}

export async function createSite({ slug }) {
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

    //
    const response = await fetch(`${myAPIEndPoint}/create-site`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        slug: slug,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      return data
    } else {
      console.error('server error')
      return Promise.reject('server error')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('server error', error)
    return Promise.reject('server error')
  }
}
