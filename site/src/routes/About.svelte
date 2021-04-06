<script>
import { onMount } from 'svelte';


	import { web3Loaded } from '../store.js';


	let isWeb3;

	const subscriber = web3Loaded.subscribe(value => {
		isWeb3 = value;
	});

	onMount(function() {
		window.scrollTo(window.scrollX, window.scrollY + 1);
		openCloseFaq();
	});

</script>


<style>

.faq-title {
	display: flex;
	align-items: center;
	cursor: pointer;
}
.faq-title h3 {
	margin-right: 20px;
	cursor: pointer;
}
.faq-title svg {
	margin-left: auto;
	fill: var(--xwhite);
	cursor: pointer;
}
.faq li {
	overflow: hidden;
	height: 0px;
	transition: all 0.4s;
	font-family: 'roboto mono';
	font-weight: 200;
}

</style>



<section>
	<div class="about-container">
		<h1 class="fade-in fade-in-1">What is <b>Negative Entropy</b>?</h1>
		<p class="fade-in fade-in-2">Negative Entropy was founded in early 2021 based on work originally conceived for a Minecraft mod. It bounced around between three programming languages before finally discovering its home in Javascript, where it came to life in an afternoon on ThreeJS. </p>
		<p class="fade-in fade-in-2">Negative Entropy is the first independent, large-scale project to run on the <b><a href="https://github.com/BeyondNFT/sandbox#beyondnft---interactive-nft-sandbox">iNFT</a></b> (interactive NFT) standard designed by <b><a href="https://beyondnft.io/">BeyondNFT</a></b>, allowing any site running the iNFT viewer to render all NFTs conforming to this standard (including Negative Entropy’s). We believe that interactive art created in this manner offers far more value to our customers than animated gifs or webm’s ever could. We believe that this standard is the future of NFT’s and encourage our customers to join us in encouraging OpenSea to adopt this revolutionary standard (our NFTs still work there without it, just not to their full potential).</p>
		<p class="fade-in fade-in-2">Negative Entropy’s name is in reference to the classical Isaac Asimov story, <a id="lq" href="https://templatetraining.princeton.edu/sites/training/files/the_last_question_-_issac_asimov.pdf"><b>”The Last Question,”</b></a> wherein mankind challenges its greatest computer to answer the eponymous last question – how can the total amount of entropy in the universe be decreased? How can life and existence be stayed from winding down to a cold infinite dark? We won’t spoil the plot, but the answer turns out to be exactly what this project is about – creation.</p>
		<br>

		<br>
		<h2 class="fade-in fade-in-3"><b>FAQ's</b></h2>
		<div class="fade-in fade-in-3">
			<div class="faq">
				<div class="faq-title">
					<h3>Is there a way to improve the performance of my computer in rendering the ThreeJS sculptures?</h3>
					<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
				</div>
				<li>We recommend that all of our users <b><a href="https://www.lifewire.com/hardware-acceleration-in-chrome-4125122">enable hardware acceleration</a></b> in Chrome, our recommended browswer</li>
			</div>

			<div class="faq">
				<div class="faq-title">
					<h3>Is each seed unique? Can someone copy my seed?</h3>
					<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
				</div>
				<li>Each unique seed is stored immutably on the blockchain, and while seeds are case-sensitive, your seed (and therefore, your sculpture) cannot be duplicated by anyone.</li>
			</div>

			<div class="faq">
				<div class="faq-title">
					<h3>Will reloading the page during the rendering break my NFT? Does that mean my seed is claimed and I can't get it back?</h3>
					<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
				</div>
				<li>Your seed remains unclaimed and unowned until you've sent the MetaMask transaction, at which point you should remain on the minting page until you are automatically redirected</li>
			</div>

			<div class="faq">
				<div class="faq-title">
					<h3>Why is the recording process choppy? Will my NFT look like this in its preview?</h3>
					<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
				</div>
				<li>The recording process captures a webm of your NFT (for use on OpenSea previews and gallery previews). To get smooth FPS in the produced webm, it slows down the NFT, and captures it frame-by-frame.</li>
			</div>

			<div class="faq">
				<div class="faq-title">
					<h3>What is the actual NFT? Is it the webm?</h3>
					<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
				</div>
				<li>The NFT that you are claiming when you mint is the seed itself – it can be dynamically regenerated as many times as you want through the code that comes packaged with the NFT. Once the iNFT standard gains widespread adoption, your NFT will be viewable on any site that has the viewer enabled. The webm is a preview image used by OpenSea and others to display what the NFT looks like. OpenSea is reportedly in talks to adopt the iNFT standard, so hopefully soon the webm will be entirely vestigal.</li>
			</div>

			<div class="faq">
				<div class="faq-title">
					<h3>Why the gas cost? ~(0.07-0.1 ETH)</h3>
					<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
				</div>
				<li>Unfortunately, storing data on the blockchain doesn't come cheap. We've worked with Solidity experts to optimize our contract to get this as low as we can for our customers. Unlike other generative art, where the NFT references an existing address to serve as the seed (already on the chain), or claims purely generative numbers to act as the seed (also already on chain), we are directly placing data onto the chain itself – for better or worse, this costs gas.</li>
			</div>
		</div>

	</div>
</section>

<div class="section-break section-break-final"></div>
