<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';
  import { LogLuvEncoding } from 'three/build/three.module';
  import { beforeUpdate, afterUpdate } from 'svelte';
  import router from "page";
  import {replObj} from "../utils.js";

  let tokens = [];
  export let tokenSlice = [];
  let tokenCount = 0;
  let origin = 'public';

  let maxPerPage = 8;
  let lower = 0;
  let rebuild = 0;
  let startIndex = 0;
  let endIndex = maxPerPage;
  let baseWebm = 'https://gateway.ipfs.io/ipfs/QmULnqLrTuG9fAxCwctH89sjb7YRL4ig77JJ2Fn78X541j';

  export let params;
  $: params; 

  let webms;
  $: webms = fillArray(baseWebm, maxPerPage);
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
  buildLists();


  function navRight() {
    var nextParam = Number(params.id)+1;
    if(nextParam*maxPerPage>=tokenCount) {
      nextParam = Number(params.id);
    }
    router("/gallery/"+nextParam);
    //Quick and dirty, but effective
    location.reload();
  }

  function navLeft() {
    var nextParam = Number(params.id)-1;
    if(nextParam < 0) {
      nextParam = 0;
    }
    router("/gallery/"+nextParam);
    //Improve this method later
    location.reload();
  }

  async function buildLists() {
      var mult = Number(params.id)+1;
      startIndex = Number(params.id)*maxPerPage;
      endIndex = maxPerPage * mult;
      let countRes = await fetch(BACKEND+"tokenCount", {mode: 'cors'});
      var count = await countRes.json();
      tokenCount = Number(count.count);
      
      if(endIndex > tokenCount) {
        endIndex = tokenCount;
      }
      var amount = endIndex-startIndex;
      webms = fillArray(baseWebm, amount);
      names = fillArray("Loading...", amount);
      ids = fillArray(1, amount);

      console.log("Count is " + count)
      console.log("Starting at:" + startIndex);
      console.log("Ending at: " + endIndex);
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

      for(let i = 0; i < tokenArrayResponse.length; i++) {
        ids[i] =tokenArrayResponse[i].id
        const res = await fetch(tokenArrayResponse[i].tokenURI);
        const json = await res.json();
        if(replObj.hasOwnProperty(ids[i])) {
          webms[i]=Object.getOwnPropertyDescriptor(replObj,ids[i]).value;
        } else {
          webms[i]=json.image;
        }
        names[i]=json.name;
      }

      //Dev stuff
      console.log("Built list!");
      rebuild++;
  }

  //CONSIDER Await blocks
	onMount(function() {
    fadeIn();
		window.scrollTo(window.scrollX, window.scrollY + 1);

    if (params.id == null || params.id == '' || Number(params.id) < 0 ) {
      params.id = 0;
      router("/gallery/0");
      location.reload();
    }
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
  .viewer-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }
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
        {#key rebuild}
          <Token origin={origin} id={ident} image={webms[i]} name={names[i]} />
        {/key}
        {/each} 
      </div>
    </div>
  </div>
  <div class="viewer-buttons">

    <div id="navL">
      <button class="button-main" on:click={navLeft}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
      </button>
    </div>

    <div id="navR">
      <button class="button-main" on:click={navRight}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
        </svg>
      </button>
    </div>

  </div>

</section>


<div class="section-break section-break-final"></div>