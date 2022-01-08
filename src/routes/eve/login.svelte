<script context="module">
export const prerender = false;
</script>

<script>
import { authorize } from '../../lib/eve.js'


function loginClicked(event) {
  authorize()
}

</script>

<button on:click="{loginClicked}">
  login
</button>
