<script context="module">
	const itemsCloseCallback = [];
</script>

<script lang="ts">
	import type { webinarTypes, webinarData } from '$lib/shared';
	import { slide } from 'svelte/transition';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let formData: any;
	export let webinarData: webinarData;

	const dispatch = createEventDispatcher();
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
	const { form } = superForm(formData.form);

	let webinarType: webinarTypes;
	let dateCard: webinarTypes;
	let isOpen = false;

	console.log(webinarData);
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
	class="flex relative flex-col rounded-md w-[35rem] bg-white border-l-[6px] {webinarType} border border-neutral-400"
>
	<div id="Webinar header" class="flex justify-around items-center my-3">
		<div
			id="Date card"
			class="flex flex-col items-center leading-5 w-24 h-[5.25rem] bg-white shadow-2xl drop-shadow-xl rounded-md"
		>
			<span class="w-full {dateCard} text-white flex justify-center font-medium rounded-t-md"
				>NOV</span
			>
			<span class="font-bold text-4xl tracking-wide text-neutral-900">15</span>
			<span class="tracking-wide text-neutral-900">Friday</span>
		</div>

		<div class="flex flex-col">
			<div class="text-sm">{webinarData.name.split(' ')[0]}</div>

			<div class="text-lg font-medium leading-5">
				{webinarData.name.split(' ').slice(1).join(' ')}
			</div>

			<div class="text-sm flex items-center gap-1">
				<span>
					<svg
						width="14px"
						height="14px"
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
				<span class="text-xs">{webinarData.date_time}</span>
			</div>
		</div>

		<div>
			<button
				class="flex w-40 items-center justify-center h-10 bg-red-600 hover:bg-red-500 rounded text-white font-bold"
				on:click={toggle}
				aria-expanded={isOpen}
			>
				SAVE YOUR SEAT<svg
					style="tran"
					width="20"
					height="20"
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
		<ul transition:slide={{ duration: 300 }}>
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
						class="block h-9 w-full border rounded-md px-3 py-3 text-[#333333]"
						type="text"
						name="name"
						placeholder="*First Name"
						bind:value={$form.firstName}
					/>

					<input
						class="block h-9 w-full border rounded-md px-3 py-3 text-[#333333]"
						type="text"
						name="name"
						placeholder="*Last Name"
						bind:value={$form.lastName}
					/>

					<input
						class="block h-9 w-full border rounded-md px-3 py-3 text-[#333333]"
						type="email"
						name="email"
						placeholder="*E-mail"
						bind:value={$form.email}
					/>

					<input
						class="block h-9 w-full border rounded-md px-3 py-3 text-[#333333]"
						type="email"
						name="email"
						placeholder="Phone (optional)"
						bind:value={$form.phone}
					/>
				</div>
				<div class="flex w-full justify-center my-3">
					<button class="w-24 h-10 bg-red-600 hover:bg-red-500 rounded text-white font-bold"
						>SUBMIT</button
					>
				</div>
			</form>
		</ul>
	{/if}

	<div class="absolute right-6 bottom-1 text-xs text-neutral-500">
		<div class="flex">
			<span class="flex items-center hover:bg-yellow-100 rounded-2xl p-1.5 cursor-pointer">
				<svg
					width="14px"
					height="14px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					stroke="#ffffff"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0" />
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
					<g id="SVGRepo_iconCarrier">
						<path
							d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
							stroke="#edc32c"
							stroke-width="1"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
				</svg>
				Interested
			</span>
			<span class="flex items-center hover:bg-gray-200 rounded-2xl p-1.5 cursor-pointer">
				<svg
					fill="#737373"
					width="14px"
					height="14px"
					viewBox="0 -2.5 29 29"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="m.408 22.528c1.873-6.758 5.672-11.533 11.216-14.094 1.678-.752 3.633-1.353 5.673-1.709l.151-.022c.462 0 .464-.014.464-3.352v-3.351l11.446 11.446-11.446 11.446v-6.702h-1.392c-3.787.088-7.34 1.007-10.51 2.58l.145-.065c-1.836 1.072-3.41 2.347-4.767 3.825l-.013.015-1.374 1.454.408-1.472z"
					/></svg
				>
				Share
			</span>
		</div>
	</div>
</div>

<style>
	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
