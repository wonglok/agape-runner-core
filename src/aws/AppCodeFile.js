import { SESSION_ACCESS_KEY } from '@/auth/GateConst'
import { invalidate } from '@react-three/fiber'
import { CSData } from './CSData'
import { UserEndPoints } from './UserEndPoints'
import nProgress from 'nprogress'
import { AppDev } from './AppDev'

class REST {
  constructor({ table }) {
    this.table = table
  }
  async create({
    appGroupID,
    appVersionID,
    packageOID,
    moduleOID,
    fileName,
    content,
  }) {
    nProgress.start()
    const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY)
    if (!sToken) {
      console.error('no session token')
      nProgress.done()
      throw await Promise.reject('no session token')
    }
    if (!appVersionID) {
      console.error('no appVersionID given')
      nProgress.done()
      throw await Promise.reject('no appVersionID given')
    }
    if (!appGroupID) {
      console.error('no appGroupID given')
      nProgress.done()
      throw await Promise.reject('no appGroupID given')
    }

    if (!packageOID) {
      console.error('no packageOID given')
      nProgress.done()
      throw await Promise.reject('no packageOID given')
    }
    if (!moduleOID) {
      console.error('no moduleOID given')
      nProgress.done()
      throw await Promise.reject('no moduleOID given')
    }

    if (!fileName) {
      console.error('no fileName given')
      nProgress.done()
      throw await Promise.reject('no fileName given')
    }
    if (typeof content === 'undefined') {
      console.error('no content given')
      nProgress.done()
      throw await Promise.reject('no content given')
    }

    const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]

    const response = await fetch(`${myAPIEndPoint}/${this.table}-create`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        appGroupID,
        appVersionID,
        packageOID,
        moduleOID,
        fileName,
        content,
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

  async list({ appVersionID }) {
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
        appVersionID,
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
    return AppDev.appCodeFiles
  }
  set data(v) {
    AppDev.appCodeFiles = v
  }
  invalidate({ appVersionID }) {
    //
    this.data = []
    return this.list({ appVersionID })
      .then((data) => {
        this.data = data.list
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export const AppCodeFile = new REST({ table: `AppCodeFile` })
