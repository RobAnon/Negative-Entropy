<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  export let params;
  console.log("Loaded");
  // app is a store, reading its value using $app will
  // create a subscriber to the store changes
  const app = getContext('app');
  // so now when $app change,
  // if contract is now set in it
  // we can request things from Blockchain
  $: $app.contract && !contract && getUserTokens();

//Function to get a user's tokens. For frontend people
async function getUserTokens() {
    console.log("init");
    contract = $app.contract;
    const balance = await contract.methods.balanceOf($app.account).call();
    let _totalTokens = totalTokens;
    for(var i = 0; i < balance; i++) {
      var tokenId = await contract.methods.tokenOfOwnerByIndex($app.account, i).call();
      var tokenURI = await contract.methods.tokenURI(tokenId).call();
      tokens.push({
          tokenURI,
          id: tokenId,
          owner: $app.account,
          contract: $app.address,
        });
        _totalTokens++;
    }
    tokens = tokens; //See List.svelte for further example of this
    totalTokens = _totalTokens;
}



onMount(function() {
  window.scrollTo(window.scrollX, window.scrollY + 1);
});

  
</script>

<style>
  .no-tokens-container {
    min-height: calc(100vh - 450px);
  }
  .no-tokens-container h1 {
    margin-bottom: 20px;
  }
  .no-tokens-container p {
    margin-bottom: 50px;
  }
  .gallery-container {
    margin-top: 50px;
  }
  .list-container {
    max-height: 0px;
    overflow: hidden;
    transition: all 1s;
  }
  .list {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 230px);
    grid-gap: 20px;
    padding: 10px 0;
    position: relative;
    color:white;
  }
  video {
  height: 230px;
  width: 100%;
  }

</style>

<section>
  <div class="gallery-container">
    
    {#if totalTokens === 0}
      <div class="no-tokens-container">
        <h1>You have no <b>tokens</b>!</h1>
        <p>Click below to mint.</p>
        <button class="button-main"><a href="/mint">Mint</a></button>
      </div>
      {:else}
      <strong>{totalTokens} Token(s)</strong>
    {/if}
    <div class="list-container">
      <div class="list">
        {#each tokens as token}
          <Token {token} />
        {/each}
      </div>
    </div>
  </div>
</section>


<div class="section-break section-break-final"></div>
