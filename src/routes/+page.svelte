<script lang="ts">
	import Webinar from '$lib/webinars/Webinar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	data.webinars.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

	console.log(data);

	$: groupedWebinars = groupByDate(data.webinars);
	function groupByDate(webinars) {
		const grouped = {};

		webinars.forEach((webinar) => {
			const date = new Date(webinar.date_time);
			const formattedDate = new Intl.DateTimeFormat('en-US', {
				weekday: 'long',
				month: 'long',
				day: 'numeric'
			}).format(date);

			if (!grouped[formattedDate]) {
				grouped[formattedDate] = [];
			}

			grouped[formattedDate].push(webinar);
		});

		return grouped;
	}
	console.log(groupedWebinars);
</script>

<svelte:head>
	<title>New Jersey Elder Law & Estate Planning Attorney | Milvidskiy Law Firm</title>
	<meta name="Description" content="New Jersey Elder Law & Estate Planning Attorney" />
</svelte:head>
<div class="flex flex-col">
	<div class="flex flex-col gap-6 w-full items-center my-5 lg:my-10">
		<div class="flex justify-start items-center w-[22rem] lg:w-[43rem] text-3xl font-bold mb-4">
			<div class="pl-6 border-b-[5px] border-[#dd2444]">UPCOMING EVENTS</div>
		</div>
		{#each Object.entries(groupedWebinars) as [date, webinarsInDateGroup]}
			<section class="flex flex-col gap-2">
				<span class="font-medium text-lg">{date}</span>
				{#each webinarsInDateGroup as webinar}
					<Webinar webinarData={webinar} />
				{/each}
			</section>
		{/each}
	</div>
</div>
