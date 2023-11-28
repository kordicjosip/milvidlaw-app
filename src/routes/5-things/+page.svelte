<script lang="ts">
	import CheckmarkIcon from '$lib/assets/CheckmarkIcon.svelte';
	import andrey200 from '$lib/assets/andrey200.png';

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
		webinarDateFormatted = `${weekDays[webinarDate.getDay()]} ${
			months[webinarDate.getMonth()]
		} ${webinarDate.getDate()} at ${webinarTime}`;
	});
</script>

<div class="flex flex-col items-center text-center my-5 lg:my-8">
	<div class="text-2xl lg:text-4xl font-bold text-neutral-700 m-3 lg:leading-10">
		5 Things You Need to Know About Estate <br class="hidden lg:inline" />Planning Once You Turn 65
	</div>
	<div class="text-xl lg:text-2xl text-neutral-600">FREE EDUCATIONAL WEBINAR</div>
</div>
<hr />
<div class="flex flex-col-reverse lg:flex-row justify-center gap-10 px-5 lg:p-0">
	<div class="flex flex-col lg:w-2/5">
		<div class="text-xl text-neutral-600 my-5 font-bold tracking-wide">About the webinar</div>
		<div class="leading-6 tracking-wide mb-5">
			Join us to learn about some of the strategies and tools that will allow you to protect your
			life savings, preserve your estate and create your legacy. You’ll learn how different types of
			trusts and powers of attorney can help you avoid probate and guardianship, while protecting
			your assets for you and the people you love. You’ll learn about the difference between estate,
			gift, inheritance and capital gains taxes. There are many misconceptions about Medicaid and
			long-term care planning. You’ll learn how to obtain care for those you love without losing
			everything you have.
		</div>

		<div class="text-xl text-neutral-600 mb-5 font-bold tracking-wide">You'll learn:</div>
		<div class="flex flex-col gap-3">
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit"
					>How to avoid <em class="font-medium">probate</em> and
					<em class="font-medium">adult guardianship</em>, keep your estate matters private and
					appoint a family member or a friend to make financial and health-care decisions if you
					become incapacitated due to an illness, injury or advanced age.</span
				>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit"
					>The advantages (and disadvantages) of having a <em class="font-medium">Living Trust</em>
					vs. a <em class="font-medium">Will</em>, and how to determine which one you need.</span
				>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit"
					>How to plan for <em class="font-medium">Long-Term Care</em> and qualify for
					<em class="font-medium">Medicaid LTC</em> benefits while preserving your home and life savings.</span
				>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10"><CheckmarkIcon /></div>
				<span class="italic w-fit"
					>How to protect your family and your assets not only during your life, but also for the
					lives of your beneficiaries (large debts or unpaid judgments, irresponsible or risky
					lifestyles, unstable marriages, etc.).</span
				>
			</div>
		</div>

		<div class="flex gap-5 my-5">
			<img src={andrey200} alt="Our Presenter" width="81" />
			<div class="flex flex-col justify-evenly">
				<div class="text-xl font-bold text-plava">About Our Presenter</div>
				<div class="text-xl text-neutral-700">Andrey Milvidskiy, Esq.</div>
			</div>
		</div>

		<div class="leading-6 tracking-wide mb-5">
			Mr. Milvidskiy is the founder and the principal attorney of the Milvidskiy Law Group P.C., a
			New Jersey-based firm with focus on elder law and estate planning. He is the author of the
			book The Law of Aging: Estate Planning and Beyond. He regularly speaks on a wide range of
			topics, including trusts and estate planning, asset protection, special needs, long-term care
			and Medicaid planning.
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
				<div class="flex justify-center text-center text-[1.1rem] text-white mb-3">
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
