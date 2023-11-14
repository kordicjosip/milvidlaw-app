<script>
	import '../app.css';
	import { goto } from '$app/navigation';
</script>

<div class="h-14 bg-orange-300">
	navbar
	<button on:click={() => goto('/')}>home</button>
	<button on:click={() => goto('/webinars')}>webinars</button>
</div>
<slot />
