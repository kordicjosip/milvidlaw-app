<script>
	import ModalDisclaimer from '$lib/webinars/ModalDisclaimer.svelte';
	import ModalPrivacyPolicy from '$lib/webinars/ModalPrivacyPolicy.svelte';

	let showModalDisclaimer = false;
	let showModalPrivacyPolicy = false;

	let currentYear = new Date().getFullYear();
</script>

<hr />
<div class="flex flex-col items-center justify-center">
	<span class="m-10 text-neutral-700">OFFICE LOCATIONS</span>
	<div class="flex flex-col lg:flex-row gap-5 lg:gap-16 text-sm lg:text-base">
		<div class="w-[12rem]">
			<div class="flex justify-center">
				<svg class="w-4" fill="#000000" viewBox="0 0 395.71 395.71" xml:space="preserve"
					><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					/><g id="SVGRepo_iconCarrier">
						<g>
							<path
								d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
							/>
						</g>
					</g></svg
				><span class="font-bold mb-1">Paramus</span>
			</div>
			<div class="flex flex-col items-center">
				<span>29 N Farview Ave</span><span>Paramus, NJ 07652</span><span
					><a href="tel:2013802000">(201) 380-2000</a></span
				>
			</div>
		</div>

		<div class="w-[12rem]">
			<div class="flex justify-center">
				<svg class="w-4" fill="#000000" viewBox="0 0 395.71 395.71" xml:space="preserve"
					><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					/><g id="SVGRepo_iconCarrier">
						<g>
							<path
								d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
							/>
						</g>
					</g></svg
				><span class="font-bold mb-1">Morristown</span>
			</div>
			<div class="flex flex-col items-center">
				<span>163 Madison Ave</span><span>2nd Fl, Ste 220</span><span>Morristown, NJ 07960</span
				><span><a href="tel:9739889200">(973) 988-9200</a></span>
			</div>
		</div>

		<div class="w-[12rem]">
			<div class="flex justify-center">
				<svg class="w-4" fill="#000000" viewBox="0 0 395.71 395.71" xml:space="preserve"
					><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					/><g id="SVGRepo_iconCarrier">
						<g>
							<path
								d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
							/>
						</g>
					</g></svg
				><span class="font-bold mb-1">Red Bank</span>
			</div>
			<div class="flex flex-col items-center">
				<span>331 Newman Springs Rd</span><span>Bldg 1, 4th Fl, Ste 143</span><span
					>Red Bank, NJ 07701</span
				><span><a href="tel:732374200">(732) 377-4200</a></span>
			</div>
		</div>
	</div>
</div>
<div class="text-xs text-neutral-700 mx-5 mt-10 mb-5">
	Copyright © 2014 - {currentYear} Milvidskiy Law Group P.C. | Attorney Advertising |
	<button on:click={() => (showModalDisclaimer = true)}>Disclaimer</button>
	| <button on:click={() => (showModalPrivacyPolicy = true)}> Privacy Policy </button>
</div>

<ModalDisclaimer bind:showModalDisclaimer />
<ModalPrivacyPolicy bind:showModalPrivacyPolicy />
