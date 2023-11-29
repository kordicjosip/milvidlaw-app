<script lang="ts">
	import type { webinarTypes, webinarData } from '$lib/shared';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import FiveThingsImage from '$lib/assets/5things_webinar.webp';
	import HtapgImage from '$lib/assets/htapg_webinar.webp';
	import MpsImage from '$lib/assets/mps_webinar.webp';
	import { goto } from '$app/navigation';

	export let webinarData: webinarData;

	const borderColor: any = {
		ft: 'border-l-plava',
		mps: 'border-l-zuta',
		htapg: 'border-l-zelena'
	};
	const dateCardColor: any = {
		ft: 'bg-plava',
		mps: 'bg-zuta',
		htapg: 'bg-zelena'
	};

	let webinarType: webinarTypes;
	let webinarRoute: string;
	let dateCard: webinarTypes;
	let isOpen = false;

	let webinarTypeName: string;
	let webinarShortDesc: string;
	let webinarImage: string;
	webinarTypeName = webinarData.name.split(' ')[0];
	switch (webinarTypeName) {
		case '[MPS]':
			webinarTypeName = 'Medicaid Planning Strategies';
			webinarShortDesc =
				'Discover how to protect your home and life savings from nursing home expenses. Free educational webinar presented by Andrey Milvidskiy, Esq.';
			webinarImage = MpsImage;
			break;
		case '[Bi-Weekly]':
			webinarTypeName = '5 Things to Know About Estate Planning Once You Turn Sixty-Five';
			webinarShortDesc =
				'Free webinar about estate planning, wills and living trusts, long-term care and Medicaid planning. Presented by Andrey Milvidskiy, Esq. ';
			webinarImage = FiveThingsImage;
			break;
		case '[HTAPG]':
			webinarTypeName = 'How to Avoid Probate and Guardianship';
			webinarShortDesc =
				'Learn about what probate and adult guardianship are and how you can avoid those proceedings. Free educational webinar presented by Kevin R. Cropsey, Esq.';
			webinarImage = HtapgImage;
			break;
		default:
			break;
	}
	let webinarDay: string | Date;
	webinarDay = new Date(webinarData.date_time);
	let formattedWebinarDay = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long'
	}).format(webinarDay);

	let webinarTimeUS: string;
	webinarTimeUS = webinarData.date_time.split(' ')[1];
	webinarTimeUS = new Date(`2021-11-15T${webinarTimeUS}`).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit'
	});

	let dateCardDate: Date | string;
	dateCardDate = new Date(webinarData.date_time);
	dateCardDate = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	}).format(dateCardDate);

	let utmSource: string | null;

	onMount(() => {
		if (webinarData.name.startsWith('[B')) {
			webinarType = borderColor.ft;
			dateCard = dateCardColor.ft;
			webinarRoute = '5-things';
		} else if (webinarData.name.startsWith('[M')) {
			webinarType = borderColor.mps;
			dateCard = dateCardColor.mps;
			webinarRoute = 'mps';
		} else if (webinarData.name.startsWith('[H')) {
			webinarType = borderColor.htapg;
			dateCard = dateCardColor.htapg;
			webinarRoute = 'htapg';
		}
		utmSource = $page.url.searchParams.get('utm_source') || 'Web';
		//utmSource je utm_source iz url-a webinar.milvidlaw.com/?utm_source=google
	});
	console.log(webinarData);
</script>

<div
	on:click={() =>
		goto(`/${webinarRoute}?webinar_id=${webinarData.id}&schedule=${webinarData.schedule}`)}
	class="cursor-pointer relative flex flex-col rounded-md w-[22rem] lg:w-[43rem] bg-white border-l-[6px] {webinarType} border border-neutral-400"
>
	<div
		id="Webinar header"
		class="grid-container grid-cols-[30%,70%,0%] lg:grid-cols-[20%,45%,35%] items-center my-5"
	>
		<div
			id="Date card"
			class="flex flex-col items-center lg:w-24 lg:h-[5.5rem] w-[4.8rem] h-[4.25rem] bg-white shadow-2xl drop-shadow-xl rounded-md"
		>
			<span
				class="w-full {dateCard} text-white flex justify-center text-sm lg:text-base font-medium rounded-t-md"
				>{dateCardDate.split(' ')[1].substring(0, 3).toUpperCase()}</span
			>

			<span class="font-bold text-2xl leading-7 lg:text-4xl text-neutral-900"
				>{dateCardDate.split(' ')[2]}</span
			>
			<span class="tracking-wide text-neutral-900 lg:text-sm text-xs"
				>{formattedWebinarDay.split(' ').pop()}</span
			>
		</div>

		<div class="flex flex-col">
			<div class="font-bold leading-5 mb-1">
				{webinarTypeName}
			</div>

			<div class="text-sm mb-1">
				{webinarShortDesc}
			</div>

			<div class="flex items-center gap-1 lg:text-base text-sm">
				<span>
					<svg
						class="w-5 h-5 lg:w-3.5 lg:h-3.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="24" height="24" fill="white" />
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.8321 14.5547C15.5257 15.0142 14.9048 15.1384 14.4453 14.8321L11.8451 13.0986C11.3171 12.7466 11 12.1541 11 11.5196L11 11.5L11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7L13 11.4648L15.5547 13.1679C16.0142 13.4743 16.1384 14.0952 15.8321 14.5547Z"
							fill="#5e5e5e"
						/>
					</svg>
				</span>
				<span class="font-medium hidden lg:block"
					>{formattedWebinarDay.split(' ')[1]}, {webinarTimeUS}</span
				>
				<div class="font-medium flex lg:hidden">
					{webinarTimeUS}
				</div>
			</div>
		</div>
		<div />
		<div class="hidden lg:block absolute right-0 top-0 w-52">
			<img src={webinarImage} alt="Webinar" class="h-[8.25rem] w-full rounded-tr" />
			<button
				class="flex transition duration-500 lg:w-full items-center justify-center h-8 lg:h-10 text-white font-bold text-xs lg:text-base bg-plava hover:bg-[#1e3d5c]"
				on:click={() =>
					goto(`/${webinarRoute}?webinar_id=${webinarData.id}&schedule=${webinarData.schedule}`)}
				aria-expanded={isOpen}
			>
				Save Your Seat
			</button>
		</div>
		<div class="absolute block lg:hidden bottom-0 right-0">
			<button
				class="flex w-[8.5rem] transition lg:w-40 items-center justify-center h-8 lg:h-10 rounded rounded-bl-none rounded-tr-none text-white font-bold text-xs lg:text-base bg-plava"
				on:click={() =>
					goto(`/${webinarRoute}?webinar_id=${webinarData.id}&schedule=${webinarData.schedule}`)}
			>
				Save Your Seat
			</button>
		</div>
	</div>
</div>

<style>
	.grid-container {
		display: grid;
	}

	.grid-container > *:nth-child(1) {
		justify-self: center;
	}
	.grid-container > *:nth-child(2) {
		justify-self: start;
	}
	.grid-container > *:nth-child(3) {
		justify-self: center;
	}
</style>
