<script lang="ts">
	import Webinar from '$lib/webinars/Webinar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	data.webinars.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

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
</script>

<svelte:head>
	<title>New Jersey Elder Law & Estate Planning Attorney | Milvidskiy Law Firm</title>
	<meta name="Description" content="New Jersey Elder Law & Estate Planning Attorney" />
	<script>
		!(function (f, b, e, v, n, t, s) {
			if (f.fbq) return;
			n = f.fbq = function () {
				n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
			};
			if (!f._fbq) f._fbq = n;
			n.push = n;
			n.loaded = !0;
			n.version = '2.0';
			n.queue = [];
			t = b.createElement(e);
			t.async = !0;
			t.src = v;
			s = b.getElementsByTagName(e)[0];
			s.parentNode.insertBefore(t, s);
		})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '1705597013024351');
		fbq('track', 'PageView');
	</script>
	<noscript
		><img
			height="1"
			width="1"
			style="display:none"
			src="https://www.facebook.com/tr?id=1705597013024351&ev=PageView&noscript=1"
		/></noscript
	>
</svelte:head>
<div class="flex flex-col">
	<div class="flex flex-col gap-6 w-full items-center my-5 lg:my-10">
		<div class="flex flex-col justify-start items-center w-[22rem] lg:w-[43rem] mb-4">
			<div class="pl-6 border-b-[5px] border-[#dd2444] text-3xl font-bold mb-4">
				UPCOMING EVENTS
			</div>
			<div class="">
				Our attorneys host a series of free educational webinars focusing on such key areas as elder
				law, estate planning, wills and trusts, asset protection, long-term care and Medicaid
				planning. These sessions are designed to inform and empower you with essential legal
				knowledge. Whether you're planning for the future or navigating current legal challenges,
				our webinars offer guidance and clarity.
			</div>
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
