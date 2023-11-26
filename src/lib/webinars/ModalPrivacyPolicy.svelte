<script lang="ts">
	export let showModalPrivacyPolicy: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModalPrivacyPolicy) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="!rounded-md max-w-[90%] lg:max-w-[50%]"
	bind:this={dialog}
	on:close={() => (showModalPrivacyPolicy = false)}
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
		<div class="font-bold text-xl text-plava mb-4">Privacy Policy</div>
		<div>
			This Privacy Statement describes how Milvidskiy Law Group P.C. collects, uses, and discloses
			certain personal information obtained through our public web site at www.milvidlaw.com (the
			“Web Site”). This Privacy Statement does not address information collection through other
			sources such as in-person seminars, workshops, or in-person consultations and contacts.

			<h2>Personal Information Collection and Use</h2>

			In general, you can visit our Web Site without telling us who you are or revealing any
			information about yourself. There are times, however, when we ask for personally identifiable
			information from you, such as your name, company, e-mail address, phone number, and address
			(“Personal Information”). We request this information in order to correspond with you, to
			provide you with a subscription to a newsletter or publication, to notify you about events, or
			otherwise to respond to your requests or provide you with information that we consider may be
			of interest to you. Where applicable, we will differentiate between personal data fields that
			are optional and those that are mandatory to obtain the requested information. If you receive
			a marketing e-mail from Milvidskiy Law Group P.C., you will be provided with an automated way
			to opt out (unsubscribe) from that particular communication or from all marketing e-mails sent
			by our firm. Please follow the instructions on the e-mail you received. If you have received
			unwanted e-mail from our firm, please forward a copy of that e-mail to info@milvidlaw.com.
			Please note that if you reply to a Milvidskiy Law Group P.C. address in one of our marketing
			e-mails or otherwise send a communication to us, your communication will not create an
			attorney-client relationship with us. Do not send us any information that you or anyone else
			considers to be confidential or secret unless we have first agreed to be your lawyers in that
			matter. Any information you send us before we agree to be your lawyers cannot be protected
			from disclosure.

			<h2>Data Sharing</h2>

			We may share Personal Information among our member attorneys for purposes of responding to
			your requests or otherwise as necessary for the purposes described above. We may also in
			limited circumstances share Personal Information with government authorities or others as
			required to protect the interests of the firm or others, as necessary in connection with the
			sale or transfer of all or a portion of the business, or as required by applicable law or
			court order.

			<h2>International Data Transfers</h2>

			This Web Site is hosted on a web server in the United States. If you are located in a non-US
			jurisdiction, your provision of Personal Information or other access to our Web Site
			constitutes your transfer of such data to the United States, a jurisdiction that may not
			provide a level of data protection equivalent to the laws in your home country.

			<h2>Security Measures</h2>

			Milvidskiy Law Group P.C. maintains appropriate technical and organizational security measures
			to protect the security of your Personal Information against the loss, misuse, unauthorized
			access, disclosure or alteration.

			<h2>Links to Other Web Sites</h2>

			The privacy practices set forth in this Privacy Statement are for our web site only. This web
			site may contain links to other sites. Milvidskiy Law Group P.C. is not responsible for the
			privacy practices or the content of such sites. If you link to or otherwise visit any other
			site, please review the privacy policies posted at that site.

			<h2>Cookies and Passive Tracking</h2>

			A “cookie” is an element of data that can be sent to your browser. Your browser may then store
			it on your system based on the preferences you have set on your browser. Cookies gather
			information about your operating system including, but not limited to, browser type, and
			Internet Protocol (IP) address. The Web Site uses this information to analyze the traffic on
			our web site, and better serve you when you return to our web site. It is not our intention to
			use such information to personally identify a user. You have the option to configure your
			Internet browser to notify you when you receive a cookie, giving you the chance to decide
			whether to accept it. Further, you have the option to block all cookies. Please note, however,
			that if you refuse or otherwise block cookies you may not be able to use all of the
			functionality available on the web site.

			<h2>Access and Correction</h2>

			If you wish to access or update the Personal Information you submit through our web site, or
			to make any inquiries about the processing of such information, please contact us as described
			below. We provide individuals with access to their Personal Information where we believe
			appropriate, including in situations where you are entitled to access and review your Personal
			Information under applicable data protection and privacy laws.

			<h2>Google ReCaptcha Spam Protection</h2>

			This site is protected by reCAPTCHA and the Google.<a
				href="https://policies.google.com/privacy">&nbspPrivacy Policy</a
			>
			and
			<a href="https://policies.google.com/terms">Terms of Service</a> apply.

			<h2>Revisions to this Privacy Statement</h2>

			Milvidskiy Law Group P.C. reserves the right to change this Privacy Policy from time to time.
			Please check the Privacy Statement frequently and particularly before you submit additional
			personal information via the Web Site. All revisions to this Privacy Statement will be posted
			on the web site via a link from the homepage. We also display the effective date of the
			Privacy Statement on the top of this page.
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

	h2 {
		font-weight: bold;
		margin-top: 15px;
		margin-bottom: 5px;
	}
</style>
