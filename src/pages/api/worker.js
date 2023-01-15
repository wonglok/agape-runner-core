export default async function Worker(req, res2) {
  /** @type {import("next").NextApiResponse} */
  let res = res2

  res.setHeader('content-type', 'text/javascript')
  res.send(/* js */ `
    //
    self.onmessage = (ev) => {

      console.log(ev.data)
      self.postMessage(123123)
    }

  `)
}

//
// element on earth
// the development of the element
//
