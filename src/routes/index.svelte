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
  <title>Eve Skill Queue Watch</title>
  <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
</svelte:head>

<section>
  <div class="container">
      <button on:click="{loginClicked}">
        login
      </button>
    {#if loginStatus === false}
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
  </div>
</section>

<style>
</style>
