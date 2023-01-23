import { getID } from '@/lib/getID'
import { ethers } from 'ethers'
import { SESSION_ACCESS_KEY, SESSION_REDIRECT_KEY } from './GateConst'
import { GateState } from './GateState.ts'
import Router from 'next/router'
import { UserEndPoints } from '@/aws/UserEndPoints'

export const hydration = async () => {
  if (typeof window !== 'undefined') {
    //

    if (typeof window.ethereum !== 'undefined') {
      GateState.supportEth = true
    } else {
      GateState.supportEth = false
    }

    const search = window.location.search
    const params = new URLSearchParams(search)
    const sTokenInURL = params.get('token')
    if (sTokenInURL) {
      window.localStorage.setItem(SESSION_ACCESS_KEY, sTokenInURL)
      // window.location.assign('/')
      await Router.push(Router.pathname).then(async () => {
        let redir = localStorage.getItem(SESSION_REDIRECT_KEY)
        localStorage.removeItem(SESSION_REDIRECT_KEY)
        if (redir) {
          await Router.push(redir)
        }
      })
    }

    //
    await loadSession()
    GateState.readyStatus = 'done'
  }
}
/*
let redir = localStorage.getItem(SESSION_REDIRECT_KEY)
if (!redir) {
} else if (redir && redir.length > 0 && redir[0] === '/') {
  localStorage.removeItem(SESSION_REDIRECT_KEY)
  window.location.assign(redir)
}
*/

export const loadSession = async () => {
  const sToken = window.localStorage.getItem(SESSION_ACCESS_KEY)
  if (sToken) {
    const user = await getUserInfo(sToken)
    if (user) {
      GateState.userSession = user
    } else {
      GateState.userSession = false
    }
  }

  GateState.readyStatus = 'done'
}

export const getUserInfo = async (sToken) => {
  if (!sToken) {
    return false
  }
  try {
    const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]
    //
    const response = await fetch(`${myAPIEndPoint}/session`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    })

    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('bad session token')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export const signOut = async () => {
  localStorage.removeItem(SESSION_REDIRECT_KEY)
  localStorage.removeItem(SESSION_ACCESS_KEY)
  GateState.userSession = false
  GateState.menuOverlay = false
  GateState.readyStatus = 'loading'

  setTimeout(() => {
    GateState.readyStatus = 'done'
  }, 1000)
}

export const getEndPointURL = () => {
  const myAPIEndPoint = UserEndPoints[process.env.NODE_ENV]
  return myAPIEndPoint
}

export const loginEth = async () => {
  // let urlSearchParams = new URLSearchParams(window.location.search)
  // let redirect = urlSearchParams.get('redirect')
  // if (redirect) {
  //   localStorage.setItem(SESSION_REDIRECT_KEY, redirect)
  // }

  try {
    let provider
    if (typeof window !== 'undefined' && window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    } else {
      provider = null
    }

    if (provider) {
      await provider.send('eth_requestAccounts', [])

      const signer = await provider.getSigner()
      const providerAddress = await signer.getAddress()

      let json = {
        domain: window.location.host,
        address: providerAddress, //connetorData.account,
        statement: 'Ethereum Sign In',
        origin: window.location.origin,
        version: '1',
        // chainId: connetorData.chain.id,
        nonce:
          getID() +
          getID() +
          getID() +
          getID() +
          getID() +
          getID() +
          getID() +
          getID(),
      }
      let message = `Welcome to Agape!
Let's sign you in...
domain : ${json.domain}
origin : ${json.origin}
addresss : ${json.address}
nonce : ${json.nonce}
`
      const originalSignature = await signer.signMessage(message)

      let signature = originalSignature
      let raw = message

      window.top.location.assign(
        `${getEndPointURL()}/auth/wallet/authorize?signature=${encodeURIComponent(
          signature
        )}&raw=${encodeURIComponent(raw)}`
      )
    }
  } catch (e) {
    console.log(e)
  }
}

export const loginGoogle = () => {
  // let urlSearchParams = new URLSearchParams(window.location.search)
  // let redirect = urlSearchParams.get('redirect')
  // if (redirect) {
  //   localStorage.setItem(SESSION_REDIRECT_KEY, redirect)
  // }
  window.location.assign(`${getEndPointURL()}/auth/google/authorize`)
}

export const loginGuest = () => {
  // let urlSearchParams = new URLSearchParams(window.location.search)
  // let redirect = urlSearchParams.get('redirect')
  // if (redirect) {
  //   localStorage.setItem(SESSION_REDIRECT_KEY, redirect)
  // }
  window.location.assign(`${getEndPointURL()}/auth/guest/authorize`)
}

export const loginGuestLocal = () => {
  // let urlSearchParams = new URLSearchParams(window.location.search)
  // let redirect = urlSearchParams.get('redirect')
  // if (redirect) {
  //   localStorage.setItem(SESSION_REDIRECT_KEY, redirect)
  // }
  window.location.assign(`${getEndPointURL()}/auth/local/authorize`)
}
