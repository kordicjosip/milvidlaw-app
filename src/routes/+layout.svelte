<script>
	import '../app.css';
	import logo from '$lib/assets/horizontal-white-400x89.png';
	import Hamburger from '$lib/Hamburger.svelte';
	import { slide } from 'svelte/transition';

	let mobileNavOpen = false;
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
	/*CSS3 STROKE EFFECT*/
	#mainNav ul {
		list-style: none;
		margin: 0;
	}
	#mainNav ul li a {
		padding-bottom: 10px;
		text-decoration: none;
	}
	#mainNav ul li a,
	#mainNav ul li a:after,
	#mainNav ul li a:before {
		transition: all 0.2s;
	}
	#mainNav ul li a:hover {
		color: #bcac6d;
	}

	/* stroke */
	#mainNav.stroke ul li a {
		position: relative;
	}
	#mainNav.stroke ul li a:after,
	#mainNav ul li a:after {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 0%;
		content: '.';
		color: transparent;
		background: #bcac6d;
		height: 2px;
	}

	#mainNav.stroke ul li a:hover:after {
		width: 100%;
	}

	#mainNav ul li a {
		transition: all 1s;
	}

	#mainNav ul li a:after {
		text-align: left;
		content: '.';
		margin: 0;
		opacity: 0;
	}
	#mainNav ul li a:hover {
		color: #bcac6d;
		z-index: 1;
	}
	#mainNav ul li a:hover:after {
		z-index: -10;
		animation: fill 1s forwards;
		opacity: 1;
	}

	.mobilenav > ul > li {
		@apply font-light text-sm;
	}
	.mobilenav > ul > li:not(:last-child) {
		@apply mb-6;
	}
</style>
