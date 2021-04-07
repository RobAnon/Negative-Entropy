<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';
  import { LogLuvEncoding } from 'three/build/three.module';
  import { beforeUpdate, afterUpdate } from 'svelte';
  import router from "page";

  let tokens = [];
  export let tokenSlice = [];
  let tokenCount = 0;
  let origin = 'public';

  let maxPerPage = 8;
  let lower = 0;

  export let params;

  let webms;
  $: webms = fillArray('https://gateway.ipfs.io/ipfs/QmULnqLrTuG9fAxCwctH89sjb7YRL4ig77JJ2Fn78X541j', maxPerPage);
  let names; 
  $: names = fillArray('Loading...', maxPerPage);
  let ids; 
  $: ids = fillArray(0, maxPerPage);


  const token_Dest = BACKEND+"allTokens";

  // app is a store, reading its value using $app will
  // create a subscriber to the store changes
  const app = getContext('app');
  // so now when $app change,
  // if contract is now set in it
  // we can request things from Blockchain
  $: tokenSlice && params;


  afterUpdate(() => {
    console.log(params.id);
  });

  function navRight() {
    lower +=maxPerPage;
    if(lower+maxPerPage >= totalTokens) {
      lower -= maxPerPage;
    }
    tokenSlice = tokens.slice(lower,lower+maxPerPage);
    tokenSlice = tokenSlice;
    router("/gallery/"+(Number(params.id)+1));
  }

  function navLeft() {
    lower -= maxPerPage;
    if(lower < 0) {
      lower = 0;
    }
    tokenSlice = tokens.slice(lower,lower+maxPerPage);
    tokenSlice = tokenSlice;
  }

  async function buildLists() {
      var mult = Number(params.id)+1;
      var startIndex = Number(params.id)*maxPerPage;
      var endIndex = maxPerPage * mult;
      let countRes = await fetch(BACKEND+"tokenCount", {mode: 'cors'});
      var count = await countRes.json();
      tokenCount = Number(count.count);
      
      if(endIndex > count) {
        endIndex = count;
      }

      let response = await fetch(token_Dest, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          start:startIndex,
          end:endIndex
        })
      });

      let tokenArrayResponse = await response.json();

      for(let i = 0; i < maxPerPage; i++) {
        ids.push(tokenArrayResponse[i].id)
        const res = await fetch(tokenArrayResponse[i].tokenURI);
        const json = await res.json();
        webms.push(json.image);
        names.push(json.name);
      }

      //Dev stuff
      console.log("Built list!");
      
  }

  //CONSIDER Await blocks
	onMount(function() {
    fadeIn();
		window.scrollTo(window.scrollX, window.scrollY + 1);

    if (params.id == null || params.id == '' || Number(params.id) < 0 ) {
      params.id = 0;
    }
    buildLists();
  });

  function fillArray(value, len) {
    if (len == 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  }

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
    <strong>{tokenCount} Token(s)</strong>
    <br>
    <br>
    <br>
    <div class="list-container">
      <div class="list">
        {#each ids as ident, i}
          <Token origin={origin} id={ident} image={webms[i]} name={names[i]} />
        {/each}
      </div>
    </div>
  </div>
  <button id="left" on:click={navLeft}>LEFT</button>
  <button id="right" on:click={navRight}>RIGHT</button>

</section>


<div class="section-break section-break-final"></div>