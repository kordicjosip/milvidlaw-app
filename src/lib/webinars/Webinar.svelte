<script context="module">
	const itemsCloseCallback = [];
</script>

<script lang="ts">
	import type { webinarTypes, webinarData } from '$lib/shared';
	import { onMount, onDestroy } from 'svelte';
	import { registerLawmatics, registerWebinar } from '$lib/apiPozivi';
	import { emailValidator, requiredValidator } from '$lib/formValidation/validators.js';
	import { createFieldValidator } from '$lib/formValidation/validation.js';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';

	import FiveThingsImage from '$lib/assets/5things_webinar.webp';
	import HtapgImage from '$lib/assets/htapg_webinar.webp';
	import MpsImage from '$lib/assets/mps_webinar.webp';
	import { goto } from '$app/navigation';

	const [emailValidity, validateEmail] = createFieldValidator(
		requiredValidator(),
		emailValidator()
	);
	const [firstNameValidity, validateFirstName] = createFieldValidator(requiredValidator());
	const [lastNameValidity, validateLastName] = createFieldValidator(requiredValidator());

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
	console.log(formattedWebinarDay);

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
	console.log(dateCardDate);

	let webinar_id: number = webinarData.id;
	let schedule: number = webinarData.schedule;
	let first_name: string;
	let last_name: string;
	let phone: string;
	let email: string;

	let everwebinarResponse: any;
	let lawmaticsResponse: any;

	let utmSource: string | null;

	let registerButtonText: string;
	$: registerButtonText = isOpen ? 'CANCEL' : 'SAVE YOUR SEAT';
	let submitButtonTitle: string | null;
	$: submitButtonTitle =
		!$emailValidity.valid || !$firstNameValidity.valid || !$lastNameValidity.valid
			? 'Please fill out all required fields'
			: '';
	export const submitRegistration = async () => {
		everwebinarResponse = await registerWebinar({
			webinar_id: webinar_id,
			schedule: schedule,
			first_name: first_name,
			last_name: last_name,
			phone: phone,
			email: email
		});
		console.log(everwebinarResponse);
		if (everwebinarResponse.status === 'success') {
			console.log('success everwebinar');
			await goto('https://milvidlaw.com/next-webinar/thank-you-for-registration/');
			//await submitLawmatics();
		}
	};

	export const submitLawmatics = async () => {
		lawmaticsResponse = await registerLawmatics({
			first_name: first_name,
			last_name: last_name,
			match_contact_by: 'email',
			email: email,
			phone: phone,
			practice_area_id: 1690,
			custom_fields: [
				{ id: 28272, value: webinarData.date_time },
				{ id: 288415, value: utmSource },
				{ id: 29064, value: webinarData.name },
				{ id: 32600, value: everwebinarResponse.user['live_room_url'] },
				{ id: 32601, value: everwebinarResponse.user['replay_room_url'] }
			]
		});
		console.log(lawmaticsResponse);
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
		utmSource = $page.url.searchParams.get('utm_source') || 'Web';
		console.log(utmSource);
	});
	onDestroy(() => {
		console.log(itemsCloseCallback.findIndex((callback) => close === callback));
	});
</script>

<div
	class="relative flex flex-col rounded-md w-[22rem] lg:w-[43rem] bg-white border-l-[6px] {webinarType} border border-neutral-400"
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
				class="flex transition duration-500 lg:w-full items-center justify-center h-8 lg:h-10 text-white font-bold text-xs lg:text-base"
				on:click={toggle}
				class:bg-plava={!isOpen}
				class:hover:bg-[#1e3d5c]={!isOpen}
				class:bg-neutral-400={isOpen}
				class:hover:bg-neutral-500={isOpen}
				class:rounded-br={!isOpen}
				class:rounded-bl={isOpen}
				aria-expanded={isOpen}
			>
				{registerButtonText}<svg
					style=""
					width="18"
					height="18"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					viewBox="0 0 24 24"
					transform="rotate(90)"
					stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
				>
			</button>
		</div>
		<div class="absolute block lg:hidden bottom-0 right-0">
			<button
				class="flex w-[8.5rem] transition lg:w-40 items-center justify-center h-8 lg:h-10 rounded rounded-bl-none rounded-tr-none text-white font-bold text-xs lg:text-base"
				on:click={toggle}
				class:bg-plava={!isOpen}
				class:hover:bg-[#1e3d5c]={!isOpen}
				class:bg-neutral-400={isOpen}
				class:hover:bg-neutral-500={isOpen}
				aria-expanded={isOpen}
			>
				{registerButtonText}<svg
					style="tran"
					width="18"
					height="18"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					viewBox="0 0 24 24"
					transform="rotate(90)"
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
				<div class="grid w-full gap-3">
					<div class="table relative mx-4">
						<input
							bind:value={first_name}
							class="table-cell w-full lg:p-3 p-3 lg:h-9 h-8 border rounded-md text-[#333333]"
							type="text"
							name="firstname"
							placeholder="*First Name"
							use:validateFirstName={first_name}
						/>
						{#if $firstNameValidity.dirty && !$firstNameValidity.valid}
							<span class="table-cell absolute text-red-600 text-[0.6rem] italic px-2">
								* {$firstNameValidity.message}
							</span>
						{/if}
					</div>

					<div class="table relative mx-4">
						<input
							bind:value={last_name}
							class="table-cell w-full lg:p-3 p-3 lg:h-9 h-8 border rounded-md text-[#333333]"
							type="text"
							name="lastname"
							placeholder="*Last Name"
							use:validateLastName={last_name}
						/>
						{#if $lastNameValidity.dirty && !$lastNameValidity.valid}
							<span class="table-cell absolute text-red-600 text-[0.6rem] italic px-2">
								* {$lastNameValidity.message}
							</span>
						{/if}
					</div>

					<div class="table relative mx-4">
						<input
							bind:value={email}
							class="table-cell w-full lg:p-3 p-3 lg:h-9 h-8 border rounded-md text-[#333333]"
							type="email"
							name="email"
							placeholder="*E-mail"
							use:validateEmail={email}
						/>
						{#if $emailValidity.dirty && !$emailValidity.valid}
							<span class="table-cell absolute text-red-600 text-[0.6rem] italic px-2">
								{$emailValidity.message}
							</span>
						{/if}
					</div>

					<input
						bind:value={phone}
						class="block lg:h-9 h-8 border rounded-md lg:p-3 p-3 mx-4 text-[#333333]"
						type="text"
						name="phone"
						id="phone"
						placeholder="Phone (optional)"
					/>
					<label for="phone" class="text-neutral-700 text-xs italic px-5 -translate-y-2.5">
						We will only use your phone number to send you one reminder 15 minutes before the
						webinar.</label
					>
				</div>
				<div class="flex flex-col items-center w-full justify-center mt-3 mb-12 lg:mb-3">
					<button
						title={submitButtonTitle}
						disabled={!$emailValidity.valid | !$firstNameValidity.valid | !$lastNameValidity.valid}
						class="lg:w-24 lg:h-10 w-[5.5rem] h-9 bg-red-600 hover:bg-red-500 rounded text-white font-bold mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
						type="button"
						on:click={submitRegistration}>SUBMIT</button
					>
					<span class="text-center lg:text-base text-xs mx-5 lg:mx-16"
						>If you need to make changes to your reservation, please call our offices at (201)
						380-2000.</span
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
		transform: rotate(0.75turn);
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
