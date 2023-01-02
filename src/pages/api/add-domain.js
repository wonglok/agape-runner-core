import { UserEndPoints } from '@/helpers/UserEndPoints'
import fetch from 'node-fetch'

export default async function handler(req, res) {
  // const { slug } = req.query

  let endPoint = UserEndPoints[process.env.NODE_ENV]
  //

  let bodyData =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

  // let domain = bodyData.domain
  let slug = bodyData.slug
  let sToken = bodyData.sToken
  let siteID = bodyData.siteID

  let siteDomainAddResp = await fetch(`${endPoint}/site-domain-add`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      siteID,
      slug: slug,
    }),
    headers: {
      Authorization: `Bearer ${sToken}`,
    },
  })

  let responseSiteDomainAdd = await siteDomainAddResp.json()

  // console.log(responseSiteDomainAdd)
  if (responseSiteDomainAdd.list && responseSiteDomainAdd.list.length >= 1) {
    ///
    let domain = slug
    const response = await fetch(
      `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains?teamId=${process.env.TEAM_ID_VERCEL}`,
      {
        body: `{\n  "name": "${domain}"\n}`,
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    )

    const data = await response.json()

    if (data.error?.code == 'forbidden') {
      res.status(403).end()
    } else if (data.error?.code == 'domain_taken') {
      res.status(409).end()
    } else {
      res.status(200).json({
        ok: true,
      })
    }
  } else {
    res.status(409).end()
  }
  // console.log(responseSiteDomainAdd)
}
