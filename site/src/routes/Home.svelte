<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  const app = getContext('app');
  $: $app.contract && !contract && getUserTokens() && getTokenCount(); //TODO: remove these lines, they just call test methods

//Function to get a user's tokens. For frontend people
async function getUserTokens() {
    contract = $app.contract;
    const balance = await contract.methods.balanceOf($app.account).call();
    for(var i = 0; i < balance; i++) {
      var tokenId = await contract.methods.tokenOfOwnerByIndex($app.account, i).call();
      var tokenURI = await contract.methods.tokenURI(tokenId).call();
      tokens.push({
          tokenURI,
          id: tokenId,
          creator: $app.account,
          contract: $app.address,
        });
    }
    tokens = tokens; //See List.svelte for further example of this
    console.log(JSON.stringify(tokens));
}

//Function to get the total amount of tokens created, including burned tokens – for frontend people
async function getTokenCount() {
  var count = await $app.contract.methods.getTokenCount().call();
  console.log(count);
  return count;
}


</script>


<style>




</style>



<section>
    
<body>
Text Goes Here
</body>



</section>