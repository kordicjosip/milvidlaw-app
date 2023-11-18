<script context="module">
	const itemsCloseCallback = [];
</script>

<script lang="ts">
	import type { webinarTypes, webinarData } from '$lib/shared';
	import { fade, blur, fly, slide, scale, draw, crossfade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { registerWebinar } from '$lib/apiPozivi';

	//Svelte slide buggy on Safari
	function safariWorkaround(node) {
		if (navigator.appVersion.includes('Safari')) {
			node.style.overflow = 'hidden';
		}
	}

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
	const toggle = () => {
		itemsCloseCallback.filter((callback) => close !== callback).forEach((i) => i());
		isOpen = !isOpen;
	};
	const close = () => (isOpen = false);

	let webinarType: webinarTypes;
	let dateCard: webinarTypes;
	let isOpen = false;

	let webinarTypeName: string;
	webinarTypeName = webinarData.name.split(' ')[0];
	switch (webinarTypeName) {
		case '[MPS]':
			webinarTypeName = 'Medicaid Planning Strategies';
			break;
		case '[Bi-Weekly]':
			webinarTypeName = 'Five Things to Know About Estate Planning Once You Turn Sixty-Five';
			break;
		case '[HTAPG]':
			webinarTypeName = 'How to Avoid Probate and Guardianship';
			break;
		default:
			break;
	}
	let webinarDay: string;
	webinarDay = webinarData.date_time.split(' ')[0];
	webinarDay = new Date(webinarDay).toLocaleDateString('en-US', {
		weekday: 'long'
	});
	let webinarTimeUS: string;
	webinarTimeUS = webinarData.date_time.split(' ')[1];
	webinarTimeUS = new Date(`2021-11-15T${webinarTimeUS}`).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit'
	});
	let dateCardDate: any;
	dateCardDate = new Date(webinarData.date_time.split(' ')[0]);
	dateCardDate = new Date(dateCardDate).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	});

	let webinar_id: number = webinarData.id;
	let schedule: number = webinarData.schedule;
	let first_name: string;
	let last_name: string;
	let phone: string;
	let email: string;

	let everWebinarResponse: any;

	export const submitRegistration = async () => {
		everWebinarResponse = await registerWebinar({
			api_key: '902faaf6-2cfc-4a3f-85c4-87851b3e7b50',
			webinar_id: webinar_id,
			schedule: schedule,
			first_name: first_name,
			last_name: last_name,
			phone: phone,
			email: email
		});
		console.log(everWebinarResponse);
	};

	onMount(() => {
		itemsCloseCallback.push(close);
		if (webinarData.name.startsWith('[B')) {
			webinarType = borderColor.ft;
			dateCard = dateCardColor.ft;
		} else if (webinarData.name.startsWith('[M')) {
			webinarType = borderColor.mps;
			dateCard = dateCardColor.mps;
		} else if (webinarData.name.startsWith('[H')) {
			webinarType = borderColor.htapg;
			dateCard = dateCardColor.htapg;
		}
	});
	onDestroy(() => {
		console.log(itemsCloseCallback.findIndex((callback) => close === callback));
	});
</script>

<div
	class="relative flex flex-col rounded-md w-[22rem] lg:w-[32rem] bg-white border-l-[6px] {webinarType} border border-neutral-400"
>
	<div
		id="Webinar header"
		class="grid-container grid-cols-[30%,70%,0%] lg:grid-cols-[25%,65%,0%] items-center my-3"
	>
		<div
			id="Date card"
			class="flex flex-col items-center lg:w-24 lg:h-[5.5rem] w-[4.8rem] h-[4.5rem] bg-white shadow-2xl drop-shadow-xl rounded-md"
		>
			<span
				class="w-full {dateCard} text-white flex justify-center text-sm lg:text-base font-medium rounded-t-md"
				>{dateCardDate.split(' ')[0].toUpperCase()}</span
			>

			<span class="font-bold text-2xl leading-7 lg:text-4xl text-neutral-900"
				>{dateCardDate.split(' ')[1]}</span
			>
			<span class="tracking-wide text-neutral-900 lg:text-base text-sm">{webinarDay}</span>
		</div>

		<div class="flex flex-col">
			<div class="font-bold leading-5 mb-1">
				{webinarTypeName}
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
				<span class="font-medium hidden lg:block">{webinarDay}, {webinarTimeUS}</span>
				<div class="font-medium flex lg:hidden">
					{webinarTimeUS}
				</div>
			</div>
		</div>
		<div />
		<div class="absolute bottom-0 right-0">
			<button
				class="flex w-32 lg:w-40 items-center justify-center h-8 lg:h-10 rounded rounded-bl-none rounded-tr-none text-white font-bold text-xs lg:text-base"
				on:click={toggle}
				class:bg-red-600={!isOpen}
				class:hover:bg-red-500={!isOpen}
				class:bg-neutral-400={isOpen}
				class:hover:bg-neutral-500={isOpen}
				aria-expanded={isOpen}
			>
				SAVE YOUR SEAT<svg
					style="tran"
					width="18"
					height="18"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
				>
			</button>
		</div>
	</div>
	{#if isOpen}
		<ul in:blur={{ duration: 300 }} use:safariWorkaround>
			<div class="flex justify-center font-bold text-xl">Register for the Webinar</div>
			<hr
				class="mx-10 my-3"
				style="height:1px;border:none;color:#d5d5d5;background-color:#d5d5d5;"
			/>
			<form method="POST" class="flex flex-col items-center">
				<div class="flex flex-col items-center">
					<div class="flex flex-col items-center mb-5">
						Selected webinar:

						<div class="font-medium">{webinarData.name}</div>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<input
						bind:value={first_name}
						class="block lg:h-9 h-8 w-full border rounded-md lg:p-3 p-3 mx-2 text-[#333333]"
						type="text"
						name="name"
						placeholder="*First Name"
					/>

					<input
						bind:value={last_name}
						class="block lg:h-9 h-8 w-full border rounded-md lg:p-3 p-3 mx-2 text-[#333333]"
						type="text"
						name="name"
						placeholder="*Last Name"
					/>

					<input
						bind:value={email}
						class="block lg:h-9 h-8 w-full border rounded-md lg:p-3 p-3 mx-2 text-[#333333]"
						type="email"
						name="email"
						placeholder="*E-mail"
					/>

					<input
						bind:value={phone}
						class="block lg:h-9 h-8 w-full border rounded-md lg:p-3 p-3 mx-2 text-[#333333]"
						type="email"
						name="email"
						placeholder="Phone (optional)"
					/>
				</div>
				<div class="flex w-full justify-center my-3">
					<button
						class="lg:w-24 lg:h-10 w-[5.5rem] h-9 bg-red-600 hover:bg-red-500 rounded text-white font-bold mb-8"
						on:click={submitRegistration}>SUBMIT</button
					>
				</div>
			</form>
		</ul>
	{/if}
</div>

<style>
	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}

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
