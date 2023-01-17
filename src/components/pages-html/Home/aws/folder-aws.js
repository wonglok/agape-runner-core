import { SESSION_ACCESS_KEY, UserEndPoints } from '@/auth/GateConst'

export async function folderCreate({ displayName }) {
  const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY)
  if (!sToken) {
    console.error('no session token')
    throw await Promise.reject('no session token')
  }
  if (!displayName) {
    console.error('no displayName given')
    throw await Promise.reject('no displayName given')
  }

  // try {
  const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]

  //
  const response = await fetch(`${myAPIEndPoint}/folder-create`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      displayName: displayName,
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
    throw await Promise.reject('server error ' + data.reason)
  }
  // } catch (error) {
  //   // eslint-disable-next-line no-console
  //   console.error('server error', error)
  //   throw Promise.reject('server error')
  // }
}

//!SECTION

export async function fetchAllFolders({}) {
  //
  //
  // try {
  let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

  if (!sToken) {
    throw new Error('no sToken')
  }

  let ep = UserEndPoints[process.env.NODE_ENV]

  let res = await fetch(`${ep}/folder-list`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      //
    }),
    headers: {
      Authorization: `Bearer ${sToken}`,
    },
  })

  if (res.ok) {
    return await res.json()
  } else {
    throw await Promise.reject(res.json())
  }
  // } catch (error) {
  //   console.log(error)
  //   throw Promise.reject('error')
  // }
}

////////

export async function fetchOneFolder({ oid }) {
  //
  //
  // try {
  let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

  if (!sToken) {
    throw new Error('no sToken')
  }

  let ep = UserEndPoints[process.env.NODE_ENV]

  let res = await fetch(`${ep}/folder-get`, {
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
    throw await Promise.reject(res.json())
  }
  // } catch (error) {
  //   console.log(error)

  //   throw Promise.reject('error')
  // }
}

export function getFolderEditorURL(folder) {
  return `/admin/folders/${folder.oid}`
}

export async function updateOneFolder({ object }) {
  //
  //
  // try {
  let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

  if (!sToken) {
    throw new Error('no sToken')
  }

  let ep = UserEndPoints[process.env.NODE_ENV]

  let res = await fetch(`${ep}/folder-update`, {
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
    throw await Promise.reject(res.json())
  }
  // } catch (error) {
  //   console.log(error)
  //   throw Promise.reject('error')
  // }
}

////////

export async function removeOneFolder({ object }) {
  //
  //
  // try {
  let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

  if (!sToken) {
    throw new Error('no sToken')
  }

  let ep = UserEndPoints[process.env.NODE_ENV]

  let res = await fetch(`${ep}/folder-remove`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      //
      oid: object.oid,
    }),
    headers: {
      Authorization: `Bearer ${sToken}`,
    },
  })

  if (res.ok) {
    return await res.json()
  } else {
    throw await Promise.reject(res.json())
  }
  // } catch (error) {
  //   console.log(error)
  //   throw Promise.reject('error')
  // }
}

////////
