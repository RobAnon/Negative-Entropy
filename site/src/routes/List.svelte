<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';
import { LogLuvEncoding } from 'three/build/three.module';

  let tokens = [];
  export let tokenSlice = [];
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
    //Currently gets all tokens
    let countRes = await fetch(BACKEND+"tokenCount", {mode: 'cors'});
    let count = await countRes.json();
    count = Number(count.count);

    let response = await fetch(destination, {
    	method: 'POST',
      mode: 'cors',
    	headers: {
    		'Content-Type': 'application/json;charset=utf-8'
    	},
    	body: JSON.stringify({
        start:0,
        end:count
      })
    });
    let result = await response.json();
    totalTokens = result.length;
    tokens = result;
    //Temporarily disabled
    tokenSlice = tokens.slice(lower,lower+maxPerPage);
    tokenSlice = tokens;
  }

  function navRight() {
    lower +=maxPerPage;
    if(lower+maxPerPage >= totalTokens) {
      lower -= maxPerPage;
    }
    tokenSlice = tokens.slice(lower,lower+maxPerPage);
    tokenSlice = tokenSlice;
  }

  function navLeft() {
    lower -= maxPerPage;
    if(lower < 0) {
      lower = 0;
    }
    tokenSlice = tokens.slice(lower,lower+maxPerPage);
    tokenSlice = tokenSlice;

  }

	onMount(function() {
    fadeIn();
		window.scrollTo(window.scrollX, window.scrollY + 1);
	});
</script>




<style>
  .gallery-container {
    max-height: 0px;
    overflow: hidden;
    transition: all 1s;
    margin-top: 50px;
  }
  .list-container {
    max-height: 0px;
  }
  .list {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 230px);
    grid-gap: 20px;
    padding: 10px 0 30px;
    position: relative;
    color:white;
  }
  video {
  height: 230px;
  width: 100%;
  }

  #gallery-loading {
    text-align: center;
    overflow: hidden;
    height: 100px;
    transition: all 0.4s;
    font-size: 30px;
  }

</style>

<section>
  <div id="gallery-loading"><h2>Loading...</h2></div>
  <div class="gallery-container">
    <strong>{totalTokens} Token(s)</strong>
    <br>
    <br>
    <br>
    <div class="list-container">
      <div class="list">
        {#each tokenSlice as token}
          <Token {token}{origin} />
        {/each}
      </div>
    </div>
  </div>
  <!--- REENABLE LATER WITH BETTER SOLUTION
  <button id="right" on:click={navRight}>RIGHT</button>
  <button id="left" on:click={navLeft}>LEFT</button>-->
</section>


<div class="section-break section-break-final"></div>