<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  let origin = 'public';

  // app is a store, reading its value using $app will
  // create a subscriber to the store changes
  const app = getContext('app');
  // so now when $app change,
  // if contract is now set in it
  // we can request things from Blockchain
  $: getTokens();

  async function getTokens() {

    //TODO: Should really be done with GET
    let _totalTokens = totalTokens;
    var destination = BACKEND+"allTokens";
    let response = await fetch(destination, {
    	method: 'POST',
    	headers: {
    		'Content-Type': 'application/json;charset=utf-8'
    	},
    	body: ""
    });
    let result = await response.json();

    totalTokens = result.length;
    tokens = result;
  }
</script>



<style>
  div {
    display: grid;
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
  <strong>{totalTokens} Token(s)</strong>
  <div class="list">
    {#each tokens as token}
      <Token {token}{origin}/>
    {/each}
  </div>
</section>
