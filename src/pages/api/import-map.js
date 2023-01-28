// import { Generator } from '@jspm/generator'

export default async function API(req, res) {
  // const generator = new Generator({
  //   mapUrl: import.meta.url,
  //   // mapUrl: import.meta.url,
  //   env: ['browser', 'production', 'module'],
  //   cache: false,
  // })
  // let bodyData = JSON.parse(req.body)
  // // console.log(JSON.parse(event.body));
  // for (let packID in bodyData.packages) {
  //   await generator.install(bodyData.packages[packID])
  // }
  // res.json(await generator.getMap())
  // return {
  //   //
  //   statusCode: 200,
  //   //
  //   // headers: { "Content-Type": "text/plain" },
  //   //
  //   headers: { 'Content-Type': 'text/javascript' },
  //   body: `${JSON.stringify(generator.getMap(), null, 2)}`,
  // }

  res.json({ ok: true })
}
