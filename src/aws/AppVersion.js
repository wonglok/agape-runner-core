import { SESSION_ACCESS_KEY } from '@/auth/GateConst'
import { invalidate } from '@react-three/fiber'
import { CSData } from './CSData'
import { UserEndPoints } from './UserEndPoints'
import nProgress from 'nprogress'

class REST {
  constructor({ table }) {
    this.table = table
  }
  async create({ slug, appGroupID }) {
    nProgress.start()
    const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY)
    if (!sToken) {
      console.error('no session token')
      nProgress.done()
      throw await Promise.reject('no session token')
    }
    if (!slug) {
      console.error('no slug given')
      nProgress.done()
      throw await Promise.reject('no slug given')
    }
    if (!appGroupID) {
      console.error('no appGroupID given')
      nProgress.done()
      throw await Promise.reject('no appGroupID given')
      //
    }

    const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]

    const response = await fetch(`${myAPIEndPoint}/${this.table}-create`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        appGroupID: appGroupID,
        slug: slug,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      nProgress.done()
      return data
    } else {
      let data = await response.json()

      console.error('server error', data.reason)

      nProgress.done()
      throw await Promise.reject('server error ' + data.reason)
    }
  }

  async list({ appGroupID }) {
    nProgress.start()

    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      nProgress.done()
      throw await Promise.reject('no sToken')
    }

    let ep = UserEndPoints[process.env.NODE_ENV]

    let res = await fetch(`${ep}/${this.table}-list`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        //
        appGroupID,
      }),
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    if (res.ok) {
      nProgress.done()
      return await res.json()
    } else {
      nProgress.done()
      throw await Promise.reject(res.json())
    }
  }

  async get({ oid }) {
    nProgress.start()

    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      nProgress.done()
      throw await Promise.reject('no sToken')
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
      nProgress.done()
      return await res.json()
    } else {
      nProgress.done()
      throw await Promise.reject(res.json())
    }
  }

  async update({ object }) {
    nProgress.start()

    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      nProgress.done()
      throw await Promise.reject('no sToken')
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
      nProgress.done()
      return await res.json()
    } else {
      nProgress.done()
      throw await Promise.reject(res.json())
    }
  }

  async remove({ object }) {
    nProgress.start()

    let sToken = localStorage.getItem(SESSION_ACCESS_KEY)

    if (!sToken) {
      nProgress.done()
      throw await Promise.reject('no sToken')
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
      nProgress.done()
      return await res.json()
    } else {
      nProgress.done()
      throw await Promise.reject(res.json())
    }
  }
  get data() {
    nProgress.done()
    return CSData.appVersions
  }
  set data(v) {
    CSData.appVersions = v
  }
  invalidate({ appGroupID }) {
    //
    this.data = []
    return this.list({ appGroupID })
      .then((data) => {
        this.data = data.list
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export const AppVersion = new REST({ table: `AppVersion` })
