<script>
	import '../app.css';
	import logo from '$lib/assets/horizontal-white-400x89.png';
</script>

<div
	class="flex gap-5 lg:gap-0 flex-col lg:flex-row items-center bg-plava lg:justify-around w-full p-6"
>
	<a class="" href="https://milvidlaw.com/">
		<img class="max-h-20 lg:h-20 h-12" src={logo} alt="Milvidskiy Law Group P.C. Logo" title="" />
	</a>
	<div class="flex flex-col items-center">
		<a
			class="flex flex-row items-center text-white font-bold text-center text-3xl"
			href="tel:8773103939"
			><svg height="26" width="26" transform="rotate(90)" viewBox="0 0 32 32"
				><path
					fill="#fff"
					fill-rule="evenodd"
					d="M31.073 4.433l-2.878-2.87a2.038 2.038 0 00-2.878 0L21 7.303c-.659.971-.794 2.077 0 2.87l1.762 1.757c-1.306 1.75-2.874 3.658-4.639 5.418-1.996 1.99-4.216 3.799-6.212 5.285l-1.703-1.697c-.794-.793-1.903-.659-2.878 0l-5.756 4.305c-.965.665-.795 2.077 0 2.87l2.878 2.869c1.59 1.586 3.657 1.078 5.756 0 0 0 6.353-3.556 11.792-8.98 5.116-5.102 9.073-11.827 9.073-11.827.825-2.263 1.59-4.155 0-5.74"
				/></svg
			>(877) 310-3939</a
		>
		<div class="mt-2 text-[1rem] uppercase font-[400] text-white" style="text-align:center">
			ELDER LAW | ESTATE PLANNING | SPECIAL NEEDS
		</div>
	</div>
</div>

<slot />

<style>
</style>
