import { SESSION_ACCESS_KEY, UserEndPoints } from '@/auth/GateConst'
import { proxy } from 'valtio'

export const BASE_URL_SITE_SLUG_SUFFIX = `.at.agape.town`

export const restrictedDomains = ['admin.agape.town', '*.at.agape.town']

export const getURLFromSiteSlug = (slug) => {
  return `https://${slug}${BASE_URL_SITE_SLUG_SUFFIX}`
}
export const getSiteIDPageEdit = (siteID) => {
  return `/creator-portal/sites/${siteID}/edit`
}

export const getSiteIDSubPageEdit = (siteID, pageID) => {
  return `/creator-portal/sites/${siteID}/preview/${pageID}`
}

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

export async function siteCreate({ slug }) {
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
    const response = await fetch(`${myAPIEndPoint}/site-create`, {
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

export async function siteRecent({}) {
  const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY)
  if (!sToken) {
    console.error('no session token')
    return Promise.reject('no session token')
  }

  try {
    const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]

    //
    const response = await fetch(`${myAPIEndPoint}/site-recent`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        //
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

export async function siteGet({ oid }) {
  const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY)
  if (!sToken) {
    console.error('no session token')
    return Promise.reject('no session token')
  }

  try {
    const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]

    //
    const response = await fetch(`${myAPIEndPoint}/site-get`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        oid,
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
