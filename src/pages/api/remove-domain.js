import { restrictedDomains } from '@/components/pages-html/Home/aws/site-aws'
import { UserEndPoints } from '@/helpers/UserEndPoints'
import fetch from 'node-fetch'

export default async function handler(req, res) {
  // const { domain } = req.query

  let endPoint = UserEndPoints[process.env.NODE_ENV]
  //

  let bodyData =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

  // let domain = bodyData.domain
  let slug = bodyData.slug
  let sToken = bodyData.sToken
  let siteID = bodyData.siteID

  let siteDomainRemoveResp = await fetch(`${endPoint}/site-domain-remove`, {
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

  let removeResp = await siteDomainRemoveResp.json()

  if (removeResp.ok === true) {
  } else {
    return res.status(409).end()
  }

  let domain = slug
  if (restrictedDomains.includes(domain)) {
    // not required –> only for this demo to prevent removal of a few restricted domains
    return res.status(403).end()
  }

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}?teamId=${process.env.TEAM_ID_VERCEL}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
      method: 'DELETE',
    }
  )

  const json = await response.json()
  res.status(200).send(json)
}
