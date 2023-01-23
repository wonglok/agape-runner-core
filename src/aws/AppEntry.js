import { SESSION_ACCESS_KEY } from '@/auth/GateConst'
import { invalidate } from '@react-three/fiber'
import { CSData } from './CSData'
import { UserEndPoints } from './UserEndPoints'

class REST {
  constructor({ table }) {
    this.table = table
  }
  async create({ title, tags }) {
    const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY)
    if (!sToken) {
      console.error('no session token')
      return Promise.reject('no session token')
    }
    if (!title) {
      console.error('no title given')
      return Promise.reject('no title given')
    }

    const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]

    const response = await fetch(`${myAPIEndPoint}/${this.table}-create`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        title: title,
        tags,
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
  get data() {
    return CSData.appEntry
  }
  set data(v) {
    CSData.appEntry = v
  }
  invalidate() {
    this.data = []
    this.list({})
      .then((data) => {
        this.data = data.list
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export const AppEntry = new REST({ table: `AppEntry` })
