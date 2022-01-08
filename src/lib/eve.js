function base64ToBase64url(base64) {
  return base64.replaceAll(/[+\/=]/g, (c) => {
    const map = {
      '+': '-',
      '/': '_',
      '=': '',
    }

    return map[c]
  })
}

function generateCodeVerifier() {
  let bytes = new Uint8Array(32)
  bytes = window.crypto.getRandomValues(bytes)
  const base64 = btoa(String.fromCharCode.apply(null, bytes))

  return base64ToBase64url(base64)
}

export async function authorize() {
  let codeVerifier = generateCodeVerifier()
  window.sessionStorage.setItem('codeVerifier', codeVerifier)
  // let codeChallenge = await computeChallenge(codeVerifier)

  console.log({codeVerifier})

  const queryParams = {
    response_type: 'code',
    redirect_uri: 'http://localhost/eve/callback',
    client_id: '576dbe94b46e4174a96f8d4a63993293',
    scope: 'esi-skills.read_skillqueue.v1,esi-clones.read_implants.v1',
  }
}
