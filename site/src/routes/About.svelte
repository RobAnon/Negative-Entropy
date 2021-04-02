<script>

	import { web3Loaded } from '../store.js';

	//console.log(web3Loaded);


	let isWeb3;

	const subscriber = web3Loaded.subscribe(value => {
		isWeb3 = value;
	});


</script>

<style>
body {
    text-align: center;
    color: white;
    background-color: #505050 !important;
}
</style>

<section>
	<body>
		<p>Negative Entropy was founded in early 2021 based on work originally conceived for a 
		Minecraft mod. It bounced around between three programming languages before finally 
		discovering its home in Javascript, where it came to life in an afternoon on ThreeJS.</p>

		<p>Negative Entropy is the first independent, large-scale project to run on the iNFT 
		(interactive NFT) standard designed by BeyondNFT, allowing any site running the iNFT 
		viewer to render all NFTs conforming to this standard (including Negative Entropy’s). 
		We believe that interactive art created in this manner offers far more value to our 
		customers than animated gifs or webm’s ever could. We believe that this standard is 
		the future of NFT’s and encourage our customers to join us in encouraging OpenSea to 
		adopt this revolutionary standard (our NFTs still work there without it, just not to 
		their full potential).</p>

		<p>Negative Entropy’s name is in reference to the classical Isaac Asimov story, ”The 
		Last Question,” wherein mankind challenges its greatest computer to answer the eponymous 
		last question – how can the total amount of entropy in the universe be decreased? How 
		can life and existence be stayed from winding down to a cold infinite dark? We won’t 
		spoil the plot, but the answer turns out to be exactly what this project is about – creation.</p>
	</body>

  
	{isWeb3}



</section>

