<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;

  // app is a store, reading its value using $app will
  // create a subscriber to the store changes
  const app = getContext('app');
  // so now when $app change,
  // if contract is now set in it
  // we can request things from Blockchain
  $: $app.contract && !contract && getUserTokens();

//Function to get a user's tokens. For frontend people
async function getUserTokens() {
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
    console.log(JSON.stringify(tokens));
}

  
</script>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(auto-fill, 230px);
    grid-gap: 20px;
    padding: 10px 0;
    position: relative;
  }
  video {
  height: 230px;
  width: 100%;
  }

</style>

<section>
  <strong>{totalTokens} Token(s)</strong>
  <div class="list">
    {#each tokens as token}
      <Token {token} />
    {/each}
  </div>
</section>
