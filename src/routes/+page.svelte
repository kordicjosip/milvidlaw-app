<script lang="ts">
	import Webinar from '$lib/webinars/Webinar.svelte';
	import { webinarTypes } from '$lib/shared';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import Modal from '$lib/webinars/Modal.svelte';

	let showModal = false;
	let modalWebinarData: any = {};
	function showModalHandler(e: CustomEvent) {
		showModal = true;
		modalWebinarData = e.detail.webinarId;
		console.log(e);
	}

	let webinarData: any = {
		id: '1222',
		scheduleId: '2223',
		time: 'Wednesday, 12:00 PM',
		name: 'Five Things You Should Know',
		lastUpdated: '12:00'
	};

	export let data: PageData;

	const { form } = superForm(data.form);
	console.log(data.webinars);
</script>

<svelte:head>
	<title>New Jersey Elder Law & Estate Planning Attorney | Milvidskiy Law Firm</title>
	<meta name="Description" content="New Jersey Elder Law & Estate Planning Attorney" />
</svelte:head>
<div class="flex flex-col gap-5 w-full items-center">
	{#each data.webinars as webinar}
		<Webinar webinarType={webinarTypes.ft} webinarData={webinar} on:showModal={showModalHandler} />
	{/each}
</div>

<Modal bind:showModal>
	<div slot="header" class="flex items-center text-white font-bold text-xl pb-3">
		Register for the Webinar
	</div>
	<form method="POST" class="flex flex-col items-center text-white">
		<div class="flex flex-col items-center">
			<div class="flex flex-col items-center gap-1.5 mb-5">
				Selected webinar:
				<div>
					<div
						class="flex flex-col items-center leading-5 w-24 h-[5.25rem] bg-white shadow-2xl drop-shadow-xl rounded-md"
					>
						<span class="w-full bg-red-500 text-white flex justify-center font-medium rounded-t-md"
							>NOV</span
						>
						<span class="font-bold text-4xl tracking-wide text-neutral-900">15</span>
						<span class="tracking-wide text-neutral-900">Friday</span>
					</div>
				</div>
				<div>{modalWebinarData.name}</div>
			</div>
		</div>

		<div class="w-full flex flex-col gap-3">
			<input
				class="block h-9 w-full rounded-md ring-0 px-3 py-3 text-[#333333]"
				type="text"
				name="name"
				placeholder="*First Name"
				bind:value={$form.firstName}
			/>

			<input
				class="block h-9 w-full rounded-md ring-0 px-3 py-3 text-[#333333]"
				type="text"
				name="name"
				placeholder="*Last Name"
				bind:value={$form.lastName}
			/>

			<input
				class="block h-9 w-full rounded-md ring-0 px-3 py-3 text-[#333333]"
				type="email"
				name="email"
				placeholder="*E-mail"
				bind:value={$form.email}
			/>

			<input
				class="block h-9 w-full rounded-md ring-0 px-3 py-3 text-[#333333]"
				type="email"
				name="email"
				placeholder="Phone (optional)"
				bind:value={$form.phone}
			/>
			<div class="flex w-full justify-center">
				<button class="w-24 h-10 bg-red-600 hover:bg-red-500 rounded text-white font-bold"
					>SUBMIT</button
				>
			</div>
		</div>
	</form>
</Modal>
