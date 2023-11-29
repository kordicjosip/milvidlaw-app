<script lang="ts">
	import CheckmarkIcon from '$lib/assets/CheckmarkIcon.svelte';
	import kevin200 from '$lib/assets/kevin200.png';

	import { emailValidator, requiredValidator } from '$lib/formValidation/validators.js';
	import { createFieldValidator } from '$lib/formValidation/validation.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		getWebinarData,
		registerLawmatics,
		registerWebinar,
		registerWebinarDatabase
	} from '$lib/apiPozivi';
	import { goto } from '$app/navigation';
	import type { webinarRegisterDatabase } from '$lib/shared';

	const [emailValidity, validateEmail] = createFieldValidator(
		requiredValidator(),
		emailValidator()
	);
	const [firstNameValidity, validateFirstName] = createFieldValidator(requiredValidator());
	const [lastNameValidity, validateLastName] = createFieldValidator(requiredValidator());

	let webinar_id: string | null;
	let schedule: string | null;
	let first_name: string;
	let last_name: string;
	let phone: string;
	let email: string;

	let submitButtonTitle: string | null;
	$: submitButtonTitle =
		!$emailValidity.valid || !$firstNameValidity.valid || !$lastNameValidity.valid
			? 'Please fill out all required fields'
			: '';

	let everwebinarResponse: any;
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
			await submitRegistrationDatabase();
			await goto('https://milvidlaw.com/next-webinar/thank-you-for-registration/');
			//await submitLawmatics();
		}
	};
	let webinarDatabaseData: webinarRegisterDatabase;
	export const submitRegistrationDatabase = async () => {
		webinarDatabaseData = await registerWebinarDatabase({
			first_name: first_name,
			last_name: last_name,
			email: email,
			phone: phone,
			webinar: 'HTAPG',
			ew_live: everwebinarResponse.user['live_room_url'],
			ew_replay: everwebinarResponse.user['replay_room_url']
		});
	};

	// export const submitLawmatics = async () => {
	// 	lawmaticsResponse = await registerLawmatics({
	// 		first_name: first_name,
	// 		last_name: last_name,
	// 		match_contact_by: 'email',
	// 		email: email,
	// 		phone: phone,
	// 		practice_area_id: 1690,
	// 		custom_fields: [
	// 			{ id: 28272, value: webinarData.date_time },
	// 			{ id: 288415, value: utmSource },
	// 			{ id: 29064, value: webinarData.name },
	// 			{ id: 32600, value: everwebinarResponse.user['live_room_url'] },
	// 			{ id: 32601, value: everwebinarResponse.user['replay_room_url'] }
	// 		]
	// 	});
	// 	console.log(lawmaticsResponse);
	// };

	let webinarData: any;
	let webinarDate;
	let webinarTime;
	let webinarDateFormatted: any;
	let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June ',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December '
	];

	onMount(async () => {
		webinar_id = $page.url.searchParams.get('webinar_id');
		schedule = $page.url.searchParams.get('schedule');
		webinarData = await getWebinarData(webinar_id);
		webinarDate = webinarData[0]['date_time'];
		webinarDate = new Date(webinarDate);
		webinarTime = webinarDate.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
		webinarDateFormatted = `${weekDays[webinarDate.getDay()]}, ${
			months[webinarDate.getMonth()]
		} ${webinarDate.getDate()}, at ${webinarTime}`;
	});
</script>

<svelte:head>
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

<div class="flex flex-col items-center text-center my-5 lg:my-8">
	<div class="text-2xl lg:text-4xl font-bold text-neutral-700 m-3 lg:leading-10">
		Avoid Probate and Guardianship <br class="hidden lg:inline" />in 5 Easy Steps
	</div>
	<div class="text-xl lg:text-2xl text-neutral-600 mb-5">
		Secrets of Good Estate Planning in New Jersey and New York
	</div>
	<div class="text-lg lg:text-xl text-neutral-600">FREE EDUCATIONAL WEBINAR</div>
</div>
<hr />
<div class="flex flex-col-reverse lg:flex-row justify-center gap-10 px-5 lg:p-0">
	<div class="flex flex-col lg:w-2/5">
		<div class="text-xl text-neutral-600 my-5 font-bold tracking-wide">About the webinar</div>
		<div class="leading-6 tracking-wide mb-5">
			Everyone knows something about probate and adult guardianship and probably has heard how
			important it is to avoid those proceedings. But not everyone knows what it really means and
			why they need to avoid it. In this presentation, we will explain what those proceedings are
			and share some of the strategies that attorneys use to avoid probate and guardianship and help
			clients to protect themselves and their families.
		</div>

		<div class="text-xl text-neutral-600 mb-5 font-bold tracking-wide">You'll learn:</div>
		<div class="flex flex-col gap-3">
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit"
					>What <em class="font-medium">probate</em> is and isn’t. How to avoid probate (and whether
					you need to avoid it).</span
				>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit"
					>The difference between having a <em class="font-medium">Will</em> and a
					<em class="font-medium">Living Trust</em>. How to determine which one you need</span
				>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit">
					What is <em class="font-medium">adult guardianship</em> and why is it so important to avoid?</span
				>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit"
					>The differences between a <em class="font-medium">Power of Attorney</em>, a
					<em class="font-medium">Health Care Proxy</em>, and an
					<em class="font-medium">Advance Directive</em>.</span
				>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit"
					>The different types of a <em class="font-medium">Power of Attorney</em> (durable vs. non-durable,
					immediate vs. springing, general vs. limited), and how to determine which one you need.</span
				>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit"
					>How to protect yourself, your family, and your assets in the event of incapacity and upon
					your death.</span
				>
			</div>
		</div>

		<div class="flex gap-5 my-5">
			<img src={kevin200} alt="Our Presenter" width="81" />
			<div class="flex flex-col justify-evenly">
				<div class="text-xl font-bold text-plava">About Our Presenter</div>
				<div class="text-xl text-neutral-700">Kevin R. Cropsey, Esq.</div>
			</div>
		</div>

		<div class="leading-6 tracking-wide mb-5">
			Kevin R. Cropsey, Esq. is an associate attorney with Milvidskiy Law Group P.C. His practice is
			concentrated on probate, estate litigation, and guardianship of incapacitated adults. Mr.
			Cropsey offers a unique perspective on estate planning based on his experience with cases
			where something went wrong. In this presentation, he will share his experience so that you can
			avoid making the same mistakes when planning your estate.
		</div>

		<div class="text-xl font-bold text-plava mb-5">Contact Us</div>
		<div class="flex flex-col mb-5">
			<span>Milvidskiy Law Group P.C.</span>
			<span>29 N Farview Ave, Paramus, NJ 07652</span>
			<span><a href="tel:2013802000">(201) 380-2000</a></span>
			<span>info@milvidlaw.com</span>
		</div>
	</div>

	<div class="lg:w-1/4">
		<ul class="bg-plava rounded-3xl p-5 my-5 lg:sticky lg:top-10">
			<div class="flex justify-center font-bold text-xl text-white mb-3">
				Register for the Webinar
			</div>
			{#if webinarDateFormatted !== undefined}
				<div class="flex justify-center text-center text-base text-white mb-3">
					{webinarDateFormatted}
				</div>
			{:else}
				<div class="mx-10 animate-pulse bg-[#0f477f] rounded-full flex space-x-4 h-5 mb-3" />
			{/if}
			<div class="flex flex-col justify-center text-center text-sm text-white">
				Can't make it{webinarDate ? ' on ' + months[webinarDate.getMonth()] : ''}
				{webinarDate ? webinarDate.getDate() : ''}?
				<a href="/" class="underline">Check out other dates!</a>
			</div>
			<hr
				class="mx-10 my-5"
				style="height:1px;border:none;color:#d5d5d5;background-color:#d5d5d5;"
			/>
			<form method="POST" class="flex flex-col items-center">
				<div class="grid w-full gap-5">
					<div class="table relative mx-2">
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

					<div class="table relative mx-2">
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

					<div class="table relative mx-2">
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
						class="block lg:h-9 h-8 border rounded-md lg:p-3 p-3 mx-2 text-[#333333]"
						type="text"
						name="phone"
						id="phone"
						placeholder="Phone (optional)"
					/>
					<label for="phone" class="text-neutral-300 text-xs italic px-5 -translate-y-2.5">
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
					<span class="text-center lg:text-base text-xs mx-2 mt-2 text-neutral-300"
						>If you need to make changes to your reservation, please call our offices at (201)
						380-2000.</span
					>
				</div>
			</form>
		</ul>
	</div>
</div>

<div class="flex items-center justify-center m-10">
	<button
		on:click={() => goto('/')}
		class="border-plava border-4 rounded-md py-2 px-3 text-plava font-bold hover:text-white hover:bg-plava transition-all"
		>Go back</button
	>
</div>
