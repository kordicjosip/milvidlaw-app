<script lang="ts">
	import Webinar from '$lib/webinars/Webinar.svelte';
	import type { PageData } from './$types';

	let modalWebinarData: any = {};
	export let data: PageData;
</script>

<svelte:head>
	<title>New Jersey Elder Law & Estate Planning Attorney | Milvidskiy Law Firm</title>
	<meta name="Description" content="New Jersey Elder Law & Estate Planning Attorney" />
</svelte:head>
<div class="flex flex-col gap-5 w-full items-center">
	{#each data.webinars as webinar}
		<Webinar webinarData={webinar} formData={data.form} />
	{/each}
</div>
