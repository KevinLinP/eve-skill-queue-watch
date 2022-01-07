<script context="module">
	export const prerender = true;
</script>

<script>
  import { handleIncomingRedirect, login, logout, fetch, getDefaultSession } from '@inrupt/solid-client-authn-browser'
  import { getSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";

  async function loginClicked(event) {
    await handleIncomingRedirect();

    if (!getDefaultSession().info.isLoggedIn) {
      await login({
        oidcIssuer: "https://broker.pod.inrupt.com",
        redirectUrl: window.location.href,
        clientName: "Eve Skill Queue Watch"
      });
    }
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
    <button on:click="{loginClicked}">
      login 
    </button>

    <button on:click="{logoutClicked}">
      logout
    </button>
  </div>
</section>

<style>
</style>
