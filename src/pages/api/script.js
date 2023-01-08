export default async function (req, res2) {
  /** @type {import("next").NextApiResponse} */

  let res = res2

  res.setHeader('content-type', 'text/javascript')
  let headers = res.getHeaders()

  console.log(headers)
  res.send(`
    export const getHappy = () => {
      return 'yaya'
    };
  `)
}
