<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  let origin = 'private';
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
  .no-tokens-container, .no-wallet-container {
    min-height: calc(100vh - 450px);
  }
  .no-tokens-container h1, .no-wallet-container h1 {
    margin-bottom: 20px;
  }
  .no-tokens-container p {
    margin-bottom: 50px;
  }
  .no-wallet-title {
    display: flex;
    flex-wrap: nowrap;
  }
  .no-wallet-title h1 {
    margin-right: 20px;
  }
  .no-wallet-container svg {
    fill: var(--xwhite);
    margin: -200px 0px;
    transform: rotate(-130deg);
    margin-right: 20px;
    width: 75px;
    position: relative;
    top: 70px;
    flex-shrink: 0;
  }
  @media only screen and (min-width: 1050px) {
    .no-wallet-container svg {
      transform: rotate(-75deg);
      top: 90px;
    }
    .no-wallet-container h1 {
      margin-right: 40px;
    }
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

    {#if $app.contract}
    
      {#if totalTokens === 0}
        <div class="no-tokens-container">
          <h1 class="fade-in fade-in-1">You have no <b>tokens</b>!</h1>
          <p class="fade-in fade-in-2">Click below to mint.</p>
          <button class="button-main fade-in fade-in-3"><a href="/mint">Mint</a></button>
        </div>
        {:else}
        <strong>{totalTokens} Token(s)</strong>
      {/if}
      <div class="list-container">
        <div class="list">
          {#each tokens as token}
            <Token {token}{origin} />
          {/each}
        </div>
      </div>
    {:else}
    <div class="no-wallet-container">
      <div class="no-wallet-title">
        <h1 class="fade-in fade-in-1">Please <b>connect</b> your wallet.</h1>
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="415.262px" height="415.261px" viewBox="0 0 415.262 415.261" style="enable-background:new 0 0 415.262 415.261;" xml:space="preserve">
          <g>
            <path d="M414.937,374.984c-7.956-24.479-20.196-47.736-30.601-70.992c-1.224-3.06-6.12-3.06-7.956-1.224
              c-10.403,11.016-22.031,22.032-28.764,35.496h-0.612c-74.664,5.508-146.88-58.141-198.288-104.652
              c-59.364-53.244-113.22-118.116-134.64-195.84c-1.224-9.792-2.448-20.196-2.448-30.6c0-4.896-6.732-4.896-7.344,0
              c0,1.836,0,3.672,0,5.508C1.836,12.68,0,14.516,0,17.576c0.612,6.732,2.448,13.464,3.672,20.196
              C8.568,203.624,173.808,363.356,335.376,373.76c-5.508,9.792-10.403,20.195-16.523,29.988c-3.061,4.283,1.836,8.567,6.12,7.955
              c30.6-4.283,58.14-18.972,86.292-29.987C413.712,381.104,416.16,378.656,414.937,374.984z M332.928,399.464
              c3.673-7.956,6.12-15.912,10.404-23.868c1.225-3.061-0.612-5.508-2.448-6.12c0-1.836-1.224-3.061-3.06-3.672
              c-146.268-24.48-264.996-124.236-309.06-259.489c28.764,53.244,72.828,99.756,116.28,138.924
              c31.824,28.765,65.484,54.468,102.204,75.888c28.764,16.524,64.872,31.824,97.92,21.421l0,0c-1.836,4.896,5.508,7.344,7.956,3.672
              c7.956-10.404,15.912-20.196,24.48-29.376c8.567,18.972,17.748,37.943,24.479,57.527
              C379.44,382.94,356.796,393.956,332.928,399.464z"/>
          </g>  
        </svg>
      </div>
      

    </div>
    {/if}


</section>


<div class="section-break section-break-final"></div>
