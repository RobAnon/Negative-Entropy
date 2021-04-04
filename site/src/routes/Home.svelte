<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  const app = getContext('app');
  $: $app.contract && !contract && getUserTokens(); //TODO: remove these lines, they just call test methods
  let count = 0;

//Function to get a user's tokens. For frontend people
async function getUserTokens() {
    var destination = BACKEND + 'token';
    var payload ={
      id: 0
    };
    let response = await fetch(destination, {
    	method: 'POST',
    	headers: {
    		'Content-Type': 'application/json;charset=utf-8'
    	},
    	body: JSON.stringify(payload)
    });
    let testjson = await response.json();
    console.log(testjson);

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
//DEPRECATED
async function getTokenCount() {
  var count = await $app.contract.methods.getTokenCount().call();
  console.log(count);
  return count;
}

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
    
<body>
Text Goes Here: total tokens are 
{#await getCount()} 
0
{:then count}
{count}
{/await}
</body>



</section>