<script>
import { onMount } from 'svelte';


	import { web3Loaded } from '../store.js';

	//console.log(web3Loaded);


	let isWeb3;

	const subscriber = web3Loaded.subscribe(value => {
		isWeb3 = value;
	});

	onMount(function() {
		window.scrollTo(window.scrollX, window.scrollY + 1);
	});

</script>


<section>
	<div class="about-container">
		<h1 class="fade-in fade-in-1">What is <b>Negative Entropy</b>?</h1>
		<p class="fade-in fade-in-2">Negative Entropy was founded in early 2021 based on work originally conceived for a Minecraft mod. It bounced around between three programming languages before finally discovering its home in Javascript, where it came to life in an afternoon on ThreeJS. </p>
		<p class="fade-in fade-in-2">Negative Entropy is the first independent, large-scale project to run on the iNFT (interactive NFT) standard designed by BeyondNFT, allowing any site running the iNFT viewer to render all NFTs conforming to this standard (including Negative Entropy’s). We believe that interactive art created in this manner offers far more value to our customers than animated gifs or webm’s ever could. We believe that this standard is the future of NFT’s and encourage our customers to join us in encouraging OpenSea to adopt this revolutionary standard (our NFTs still work there without it, just not to their full potential).</p>
		<p class="fade-in fade-in-2">Negative Entropy’s name is in reference to the classical Isaac Asimov story, ”The Last Question,” wherein mankind challenges its greatest computer to answer the eponymous last question – how can the total amount of entropy in the universe be decreased? How can life and existence be stayed from winding down to a cold infinite dark? We won’t spoil the plot, but the answer turns out to be exactly what this project is about – creation.</p>
	</div>
</section>

<div class="section-break section-break-final"></div>