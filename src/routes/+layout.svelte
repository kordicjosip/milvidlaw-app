<script>
	import '../app.css';
	import logo from '$lib/assets/horizontal-white-400x89.png';
	import Footer from '$lib/Footer.svelte';
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
<div
	class="flex gap-5 lg:gap-0 flex-col lg:flex-row items-center bg-plava lg:justify-around w-full p-6"
>
	<div class="flex gap-8 items-center">
		<img class="max-h-20 lg:h-20 h-12" src={logo} alt="Milvidskiy Law Group P.C. Logo" title="" />
		<a href="tel:8773103939">
			<svg class="block lg:hidden" height="26" width="26" viewBox="0 0 32 32"
				><path
					fill="#fff"
					fill-rule="evenodd"
					d="M31.073 4.433l-2.878-2.87a2.038 2.038 0 00-2.878 0L21 7.303c-.659.971-.794 2.077 0 2.87l1.762 1.757c-1.306 1.75-2.874 3.658-4.639 5.418-1.996 1.99-4.216 3.799-6.212 5.285l-1.703-1.697c-.794-.793-1.903-.659-2.878 0l-5.756 4.305c-.965.665-.795 2.077 0 2.87l2.878 2.869c1.59 1.586 3.657 1.078 5.756 0 0 0 6.353-3.556 11.792-8.98 5.116-5.102 9.073-11.827 9.073-11.827.825-2.263 1.59-4.155 0-5.74"
				/></svg
			></a
		>
	</div>
	<div class="hidden lg:flex flex-col items-center">
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
		<div class="mt-2 text-[1rem] uppercase font-bold text-white" style="text-align:center">
			ELDER LAW | ESTATE PLANNING | SPECIAL NEEDS
		</div>
	</div>
</div>

<slot />

<Footer />

<style>
</style>
