import { SESSION_ACCESS_KEY, UserEndPoints } from '@/auth/GateConst'
import { CSData } from './CSData'

class REST {
  constructor({ table }) {
    this.table = table
  }
  async create({ displayName }) {
    const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY)
    if (!sToken) {
      console.error('no session token')
      return Promise.reject('no session token')
    }
    if (!displayName) {
      console.error('no displayName given')
      return Promise.reject('no displayName given')
    }

    const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]

    const response = await fetch(`${myAPIEndPoint}/${this.table}-create`, {
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

      return Promise.reject('server error ' + data.reason)
    }
  }

  async list({}) {
    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      return Promise.reject('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/${this.table}-list`, {
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
      return Promise.reject(res.json())
    }
  }

  async get({ oid }) {
    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      return Promise.reject('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/${this.table}-get`, {
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
  }

  async update({ object }) {
    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      return Promise.reject('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/${this.table}-update`, {
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
  }

  async remove({ object }) {
    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      return Promise.reject('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/${this.table}-remove`, {
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
      return Promise.reject(res.json())
    }
  }
  invalidate() {
    this.list({}).then((data) => {
      CSData.appGroups = data.list
    })
  }
}

export const AppFolder = new REST({ table: `app-folder` })
