<script lang="ts">
	export let showModalDisclaimer: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModalDisclaimer) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="!rounded-md max-w-[90%] lg:max-w-[50%]"
	bind:this={dialog}
	on:close={() => (showModalDisclaimer = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="m-3">
		<button
			class="absolute top-5 right-5 bg-plava p-1 rounded-lg"
			autofocus
			on:click={() => dialog.close()}
			><svg
				width="20px"
				height="20px"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
					fill="#ffffff"
				/>
			</svg></button
		>
		<div class="font-bold text-xl text-plava mb-4">Disclaimer</div>
		<div>
			Attorney Advertising. The information presented on this website is for informational purposes
			only and should not be construed as a legal advice. Viewing of, responding to, or otherwise
			transmitting the information on this website is not intended to create, and receipt of the
			same does not constitute, an attorney-client relationship. The information provided on this
			website should not be relied upon without first seeking professional legal counsel. The
			information on this website is provided only as general information which may or may not
			reflect the most current developments of law. Prior results and cases discussed on this
			website do not imply and do not guarantee a similar outcome in any other case. The links to
			other websites contained herein do not constitute a referral or endorsement of any kind.
		</div>
		<!-- svelte-ignore a11y-autofocus -->
	</div>
	<div class="flex justify-end">
		<button
			class="bg-plava py-2 px-3 rounded-md text-white font-medium text-lg"
			on:click={() => dialog.close()}
			>Close
		</button>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
