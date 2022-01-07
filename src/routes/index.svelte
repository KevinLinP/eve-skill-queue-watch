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

async function loginClicked(event) {
  if (!getDefaultSession().info.isLoggedIn) {
    await login({
      oidcIssuer: "https://broker.pod.inrupt.com",
      redirectUrl: window.location.href,
      clientName: "Eve Skill Queue Watch"
    });
  } else {
    alert('never supposed to get here')
  }
}

onLogin(() => {
  loginStatus = true
})
onLogout(() => {
  loginStatus = false
})
onSessionRestore(() => {
  loginStatus = true
})

if (typeof window !== 'undefined') {
  handleIncomingRedirect({restorePreviousSession: true});
}

async function logoutClicked(event) {
  await logout()
  console.log(2)
}
</script>

<svelte:head>
  <title>Eve Skill Queue Watch</title>
  <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
</svelte:head>

<section>
  <div class="container">
    {#if loginStatus === true}
      <button on:click="{logoutClicked}">
        logout
      </button>
    {/if}
    {#if loginStatus === false}
      <button on:click="{loginClicked}">
        login
      </button>
    {/if}
  </div>
</section>

<style>
</style>
