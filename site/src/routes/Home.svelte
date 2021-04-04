<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  const app = getContext('app');
  let count = 0;

async function getCount() {
    var backend_dest = BACKEND + "tokenCount";
    var response = await fetch(backend_dest);
    var result = await response.json();
    return Number(result.count);
}

</script>


<style>

</style>



<section>	
  <div class="homepage-heading">	
    <div class="header-text">	
      <h1>How can the net amount of <b>entropy</b> in the universe be decreased?</h1>	
      <p>We make NFT's using Chaos Theory and the iNFT standard.</p>	
      <button class="button-main">Mint</button>	
      <button class="button-secondary">Learn more</button>	
    </div>	
    <div class="orb">	
      <div class='wrap'>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
      </div>	
    </div>	
  </div>	

  <body>
    This method is how you get total tokens: total tokens are 
    {#await getCount()} 
    Displays this text while loading
    {:then count}
    {count}
    {/await}
  </body>
    
</section>