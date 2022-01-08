function base64ToBase64url(base64) {
  return base64.replaceAll(/[+\/=]/g, (c) => {
    const characterMap = {
      '+': '-',
      '/': '_',
      '=': '',
    }

    return characterMap[c]
  })
}

function generateCodeVerifier() {
  let bytes = new Uint8Array(32)
  bytes = window.crypto.getRandomValues(bytes)
  const base64 = btoa(String.fromCharCode.apply(null, bytes))

  return base64ToBase64url(base64)
}

async function generateCodeChallenge(codeVerifier) {
  const codeVerifierBuffer = new TextEncoder().encode(codeVerifier);
  const codeChallengeBuffer = await window.crypto.subtle.digest('SHA-256', codeVerifierBuffer)
  const codeChallengeBytes = new Uint8Array(codeChallengeBuffer)
  var base64 = btoa(String.fromCharCode.apply(null, codeChallengeBytes))

  return base64ToBase64url(base64)
}

async function getQueryParams() {
  // https://datatracker.ietf.org/doc/html/rfc7636
  let codeVerifier = generateCodeVerifier()
  window.sessionStorage.setItem('codeVerifier', codeVerifier)
  let codeChallenge = await generateCodeChallenge(codeVerifier)
  console.log({codeVerifier, codeChallenge})

  let state = generateCodeVerifier()
  window.sessionStorage.setItem('state', state)

  return {
    response_type: 'code',
    redirect_uri: 'http://localhost/eve/callback',
    client_id: '576dbe94b46e4174a96f8d4a63993293',
    scope: 'esi-skills.read_skillqueue.v1 esi-clones.read_implants.v1',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state,
  }
}

export async function authorize() {
  const queryParams = await getQueryParams()
  let url = 'https://login.eveonline.com/v2/oauth/authorize/?'
  url = url + Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&')
  console.log({queryParams, url})
  window.location = url
}
