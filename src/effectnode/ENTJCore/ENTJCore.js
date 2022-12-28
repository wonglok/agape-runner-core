import md5 from 'md5'

class ENTJCore {
  constructor({
    parent = false,
    name = 'ThankyouJesusCoreEffectNode',
    global = {},
  }) {
    let self = this

    this.isAborted = false
    this.isPaused = false
    this.id = md5(Math.random())

    //
    console.log('init: ', name)

    // console.trace(name);

    if (typeof window !== 'undefined') {
      global = window
    } else {
      global.document = {
        addEventListener: () => {},
      }
      global.addEventListener = () => {}
      global.removeEventListener = () => {}
      global.dispatchEvent = () => {}
      global.performance = { now: () => {} }
      global.requestAnimationFrame = () => {}
      global.CustomEvent = class NewClass {}
    }

    this.react = new Proxy(this, {
      get: (obj, key) => {
        return self.reactTo(key)
      },
    })

    //
    this.makeKeyReactive = this.reactTo
    this.parent = parent
    this.name = name
    this.resource = new Map()

    this.remove = (k) => {
      this.resource.delete(k)
    }
    this.get = (k) => {
      return new Promise((resolve) => {
        let ttt = 0
        ttt = setInterval(() => {
          if (this.parent) {
            if (this.resource.has(k) || this.parent.resource.has(k)) {
              clearInterval(ttt)
              resolve(this.resource.get(k) || this.parent.resource.get(k))
            }
          } else {
            if (this.resource.has(k)) {
              clearInterval(ttt)
              resolve(this.resource.get(k))
            }
          }
        })
      })
    }
    let NS = `_${Math.random()}`
    this.set = (k, v) => {
      this.resource.set(k, v)
      global.dispatchEvent(new global.CustomEvent(k + NS, { detail: v }))
    }

    let defaultChange = { initFire: false }
    this.onChange = (key, fnc, { initFire = false } = defaultChange) => {
      let hh = ({ detail }) => {
        fnc(detail)
      }
      global.addEventListener(key + NS, hh)

      if (initFire === true) {
        this.get(key).then((v) => {
          fnc(v)
        })
      }

      this.onClean(() => {
        global.removeEventListener(key + NS, hh)
      })

      return () => {
        global.removeEventListener(key + NS, hh)
      }
    }

    this.tasks = []
    this.resizeTasks = []
    this.cleanTasks = []
    this.onLoop = (fnc) => {
      // if (num >= 0) {
      //   this.tasks.push(fnc);
      //   // this.tasks.sort((a, b) => {
      //   //   if (a.num > b.num) {
      //   //     return -1;
      //   //   } else if (a.num < b.num) {
      //   //     return 1;
      //   //   } else {
      //   //     return 0;
      //   //   }
      //   // });

      //   //
      // } else {
      //   this.tasks.unshift(fnc);
      // }

      this.tasks.push(fnc)

      return () => {
        this.tasks.splice(
          this.tasks.findIndex((e) => e === fnc),
          1.0
        )
      }
    }

    this.onResize = (fnc) => {
      fnc()
      this.resizeTasks.push(fnc)
    }

    this.onClean = (func) => {
      this.cleanTasks.push(func)
    }

    let intv = 0
    const internalResize = async () => {
      for (let t of this.resizeTasks) {
        await t()
      }

      // clearTimeout(intv);
      // intv = setTimeout(async () => {
      //   for (let t of this.resizeTasks) {
      //     await t();
      //   }
      // }, 16.8888);
    }
    this.doAllResize = internalResize

    let hresize = () => {
      internalResize()
    }
    global.addEventListener('resize', hresize)
    this.onClean(() => {
      global.removeEventListener('resize', hresize)
    })

    this.title = ''
    this.toggle = () => {
      this.isPaused = !this.isPaused
      console.log(this.title, 'status ::', !this.isPaused ? 'run' : 'pause')
    }
    this.pause = () => {
      this.isPaused = true
      console.log(this.title, 'status ::', !this.isPaused ? 'run' : 'pause')
    }
    this.play = () => {
      this.isPaused = false
      console.log(this.title, 'status ::', !this.isPaused ? 'run' : 'pause')
    }

    this.clean = () => {
      console.log('clean core:', name)
      this.isAborted = true
      this.isPaused = true
      try {
        this.cleanTasks.forEach((e) => e())
      } catch (e) {
        console.error(e)
      }
    }

    this.dispose = () => {
      this.clean()
    }

    this.lastTime = global.performance.now()
    this.work = () => {
      this.timeNow = global.performance.now()
      if (this.isAborted) {
        return {
          name: this.name,
          duration: 0,
        }
      }
      if (this.isPaused) {
        return {
          name: this.name,
          duration: 0,
        }
      }
      const start = global.performance.now()
      try {
        let t = this.timeNow
        const lt = this.lastTime
        let dt = t - lt
        this.lastTime = t
        dt = dt / 1000
        t = t / 1000
        //
        if (dt >= 0.1) {
          dt = 0.1
        }

        this.tasks.forEach((e) => e(dt, t))
      } catch (e) {
        console.error(e)
      }
      const end = global.performance.now()
      const duration = end - start

      return {
        name: this.name,
        duration,
      }
    }

    this.ready = new Proxy(
      {},
      {
        get: (obj, key) => {
          return this.get(key)
        },
      }
    )

    this.now = new Proxy(
      {},
      {
        get: (obj, key) => {
          if (this.parent) {
            return this.resource.get(key) || this.parent.resource.get(key)
          } else {
            return this.resource.get(key)
          }
        },
        set: (o, key, value) => {
          this.set(key, value)
          return true
        },
      }
    )

    if (parent) {
      // parent.onLoop(() => {
      //   this.work();
      // });
      parent.onClean(() => {
        this.clean()
      })
    }

    // console.log(
    //   "make core:",
    //   JSON.stringify({
    //     name: this.name,
    //     parent: this.parent.name,
    //   })
    // );

    this.autoEvent = (eventName, fnc, dom = global, config) => {
      //
      dom.addEventListener(eventName, fnc, config)
      this.onClean(() => {
        dom.removeEventListener(eventName, fnc)
      })
    }

    this.makeNode = ({ name = 'node', autoLoop = false }) => {
      // subname
      let tj = new TJCore({
        parent: self,
        name: `create Node: ${name}`,
      })

      if (autoLoop) {
        self.onLoop(() => {
          tj.work()
        })
      }

      self.onClean(() => {
        tj.clean()
        console.log('cleanup Node: ' + name)
      })

      return tj
    }

    this.makeDisposableNode = ({ name }) => {
      let tj = new ENTJCore({
        parent: self,
        name: 'createAutoNode: ' + name,
      })

      let tt = 0
      let rAF = () => {
        tt = requestAnimationFrame(rAF)
        tj.work()
      }
      tt = requestAnimationFrame(rAF)

      tj.onClean(() => {
        cancelAnimationFrame(tt)
        console.log('cleanupAutoNode: ' + name)
      })

      return tj
    }

    this.name = (name) => (v) => {
      this.now[name] = v
    }

    // this.syncGL = () => {
    //   useFrame((prop) => {
    //     for (let kn in prop) {
    //       this.resource.set(kn, prop[kn]);
    //     }
    //   });
    // };
    //
  }
}

let isFunction = function (obj) {
  return typeof obj === 'function' || false
}

export class EventEmitter {
  constructor() {
    this.listeners = new Map()
  }
  addEventListener(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, [])
    this.listeners.get(label).push(callback)
  }

  removeEventListener(label, callback) {
    let listeners = this.listeners.get(label)
    let index = 0

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        let a = () => {
          i = index
          return i
        }
        return isFunction(listener) && listener === callback ? a() : i
      }, -1)

      if (index > -1) {
        listeners.splice(index, 1)
        this.listeners.set(label, listeners)
        return true
      }
    }
    return false
  }
  trigger(label, ...args) {
    let listeners = this.listeners.get(label)

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener(...args)
      })
      return true
    }
    return false
  }
}

export const sleep = (t) => {
  return new Promise((resolve) => {
    setTimeout(resolve, t)
  })
}

export const download = async (classRef, url) => {
  let fnc = classRef
  fnc.Cache = fnc.Cache || new Map()
  let myCache = fnc.Cache

  //
  return new Promise((resolve, reject) => {
    if (myCache.has(url)) {
      resolve(myCache.get(url))
    } else {
      try {
        new classRef().load(url, (result) => {
          myCache.set(url, result)
          resolve(result)
        })
      } catch (e) {
        reject(e)
      }
    }
  })
}

export { ENTJCore }
