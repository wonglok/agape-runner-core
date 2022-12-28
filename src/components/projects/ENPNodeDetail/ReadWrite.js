export function getURLFromArrayLike(buffer) {
  let inbound = buffer

  console.log(inbound)

  let url = false

  if (inbound instanceof ArrayBuffer) {
    let blbo = new Blob([inbound], { type: 'application/octet-stream' })
    url = URL.createObjectURL(blbo)
  }
  if (inbound instanceof String) {
    url = inbound
  }

  if (inbound instanceof Uint8Array) {
    let blbo = new Blob([inbound], { type: 'application/octet-stream' })
    url = URL.createObjectURL(blbo)
  }

  if (inbound instanceof Array) {
    let blbo = new Blob([inbound], { type: 'application/octet-stream' })
    url = URL.createObjectURL(blbo)
  }

  return url
}
