<script context="module">
export const prerender = false;
</script>

<script>
import {
  handleIncomingRedirect,
  login,
  logout,
  fetch,
  getDefaultSession,
  onLogin,
  onLogout,
  onSessionRestore,
} from '@inrupt/solid-client-authn-browser'
import {
  getSolidDataset,
  createSolidDataset,
  saveSolidDatasetAt
} from "@inrupt/solid-client";

let loginStatus = null
let userName = ''
let session = null

function loginClicked(event) {
  login({
    oidcIssuer: "https://broker.pod.inrupt.com",
    redirectUrl: window.location.href,
    clientName: "Eve Skill Queue Watch"
  });
}

async function fetchData() {
  let dataset
  const datasetUrl = 'https://pod.inrupt.com/kevinlinp/settings/eve-skill-queue-watch'

  try {
    dataset = await getSolidDataset(datasetUrl, {fetch})
    console.log('found dataset', dataset)
  } catch (error) {
    if (!e.message.match(/404/)) {
      throw e
    }
  }

  console.log(5, {dataset})

  if (!dataset) {
    const tempDataset = createSolidDataset()
    dataset = await saveSolidDatasetAt(datasetUrl, tempDataset, {fetch})
    console.log('created new dataset', dataset)
  }
}

onLogin(() => sessionChanged())
onLogout(() => sessionChanged())
onSessionRestore(() => sessionChanged())
function sessionChanged() {
  session = getDefaultSession()
  loginStatus = session.info.isLoggedIn
  userName = session.info.webId
  console.log(3, session)
}

if (typeof window !== 'undefined') {
  handleIncomingRedirect({restorePreviousSession: true});
}

function logoutClicked(event) {
  logout()
}
</script>

<svelte:head>
  <script>
    // readable-stream/n3/solid-client doesn't work without this hack for some reason
    var global = global || window;
  </script>
</svelte:head>

{#if !loginStatus}
  <button on:click="{loginClicked}">
    login
  </button>
{/if}
{#if loginStatus === true}
  <button on:click="{logoutClicked}">
    logout
  </button>
  <p>
    { userName }
  </p>

  <button on:click="{fetchData}">
    fetchData
  </button>
{/if}
