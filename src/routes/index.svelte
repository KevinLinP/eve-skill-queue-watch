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
import { getSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";

let loginStatus = null
let userName = ''

function loginClicked(event) {
  login({
    oidcIssuer: "https://broker.pod.inrupt.com",
    redirectUrl: window.location.href,
    clientName: "Eve Skill Queue Watch"
  });
}

onLogin(() => sessionChanged())
onLogout(() => sessionChanged())
onSessionRestore(() => sessionChanged())
function sessionChanged() {
  const session = getDefaultSession()
  loginStatus = session.info.isLoggedIn
  userName = session.info.webId
  console.log(3, session)
}

if (typeof window !== 'undefined') {
  handleIncomingRedirect({restorePreviousSession: true});
}

async function logoutClicked(event) {
  await logout()
  //console.log(2)
}
</script>

<svelte:head>
  <title>Eve Skill Queue Watch</title>
  <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
</svelte:head>

<section>
  <div class="container">
    {#if loginStatus === false}
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
    {/if}
  </div>
</section>

<style>
</style>
