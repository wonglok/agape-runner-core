export default async function Script(req, res2) {
  /** @type {import("next").NextApiResponse} */
  let res = res2

  res.setHeader('content-type', 'text/javascript')
  res.send(/* js */ `
    export const getHappy = () => {
      return 'yaya'
    };
  `)
}
