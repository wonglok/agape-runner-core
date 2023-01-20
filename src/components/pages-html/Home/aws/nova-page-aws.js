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

  const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]

  const response = await fetch(`${myAPIEndPoint}/nova-page-create`, {
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
}

export async function fetchAllCodePageInFolder({ folderID }) {
  //
  //
  // try {
  let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

  if (!sToken) {
    return Promise.reject('no sToken')
  }

  let ep = UserEndPoints[process.env.NODE_ENV]

  let res = await fetch(`${ep}/nova-page-list`, {
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

  if (res.ok) {
    return await res.json()
  } else {
    return Promise.reject(res.json())
  }
  // } catch (error) {
  //   console.error(error)
  //   return Promise.reject('server error')
  // }
}

export async function updateOneCodePage({ object }) {
  //
  //
  // try {
  let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

  if (!sToken) {
    return Promise.reject('no sToken')
  }

  let ep = UserEndPoints[process.env.NODE_ENV]

  let res = await fetch(`${ep}/nova-page-update`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      //
      object,
    }),
    headers: {
      Authorization: `Bearer ${sToken}`,
    },
  })

  if (res.ok) {
    return await res.json()
  } else {
    return Promise.reject(res.json())
  }

  // } catch (error) {
  //   console.log(error)
  //   return Promise.reject('error')
  // }
}

////////

export async function removeOneCodePage({ oid }) {
  //
  //
  // try {
  let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

  if (!sToken) {
    return Promise.reject('no sToken')
  }

  let ep = UserEndPoints[process.env.NODE_ENV]

  let res = await fetch(`${ep}/nova-page-remove`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      //
      oid,
    }),
    headers: {
      Authorization: `Bearer ${sToken}`,
    },
  })

  if (res.ok) {
    return await res.json()
  } else {
    return Promise.reject(res.json())
  }

  // } catch (error) {
  //   console.log(error)
  //   return Promise.reject('error')
  // }
}

////////
