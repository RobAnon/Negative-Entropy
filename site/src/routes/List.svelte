<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';
import { LogLuvEncoding } from 'three/build/three.module';

  let tokens = [];
  let totalTokens = 0;
  let contract;

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

	onMount(function() {
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
  <br>
  <br>
  <br>
  <strong>{totalTokens} Token(s)</strong>
  <div class="gallery-container">
    <div class="list-container">
      <div class="list">
        {#each tokens as token}
          <Token {token} />
        {/each}
      </div>
    </div>
  </div>
</section>
