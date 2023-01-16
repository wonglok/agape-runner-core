import { Generator } from '@jspm/generator'

export default async function ImportMap(req, res) {
  const generator = new Generator({
    mapUrl: import.meta.url,
    env: ['browser', 'production', 'module'],
    cache: false,
  })

  let bodyData = JSON.parse(req.body)
  // console.log(JSON.parse(event.body));

  for (let packID in bodyData.packages) {
    await generator.install(bodyData.packages[packID])
  }

  res.json(generator.getMap())
}
