<script lang="ts">
	import Webinar from '$lib/webinars/Webinar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	data.webinars.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

	console.log(data);
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
