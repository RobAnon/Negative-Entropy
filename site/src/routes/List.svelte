<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';

  let tokens = [];
  let tokenSlice = [];
  let totalTokens = 0;
  let contract;
  let origin = 'public';

  let lower = 0;
  let maxPerPage = 3;

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
    console.log(result);
    totalTokens = result.length;
    tokens = result;
    tokenSlice = tokens.slice(lower,lower+maxPerPage);
    tokenSlice = tokenSlice;
  }

  function navRight() {
    console.log("right");
    lower +=maxPerPage;
    if(lower+maxPerPage >= totalTokens) {
      lower -= maxPerPage;
    }
    tokenSlice = tokens.slice(lower,lower+maxPerPage);
    tokenSlice = tokenSlice;
  }

  function navLeft() {
    console.log("left")
    lower -= maxPerPage;
    if(lower < 0) {
      lower = 0;
    }
    tokenSlice = tokens.slice(lower,lower+maxPerPage);
    tokenSlice = tokenSlice;

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
    {#each tokenSlice as token}
      <Token {token}{origin}/>
    {/each}
  </div>
  <button id="right" on:click={navRight}>RIGHT</button>
  <button id="left" on:click={navLeft}>LEFT</button>
</section>
