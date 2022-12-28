import { proxy, useSnapshot } from 'valtio'

// type TaskStatus = 'pending' | 'completed'
// type Filter = TaskStatus | 'all'
// type Todo = {
//   description: string
//   status: Status
//   id: number
// }
type Session = boolean | any

type ReadyStatus = 'loading' | 'done'

export const GateState = proxy<{
  // filter: Filter
  // todos: Todo[]
  userSession: Session
  xrSession: any
  readyStatus: ReadyStatus
  supportEth: boolean
  menuOverlay: boolean
  supportVR: boolean
  xrPlayer: any
}>({
  // filter: 'all',
  // todos: [],

  xrPlayer: false,
  xrSession: false,

  menuOverlay: false,
  //
  supportVR: false,
  //
  supportEth: false,

  //
  readyStatus: 'loading',
  userSession: false,
})
//
