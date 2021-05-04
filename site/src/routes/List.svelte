<script>
  //TODO: Improve link population via pre-calculation of what each article should link to
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

  let maxPerPage = 6;
  let lower = 0;
  let rebuild = 0;
  let startIndex = 0;
  let endIndex = maxPerPage;
  let baseWebm = '';

  let globalNonce;

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


  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function navRight() {

    if (Number(params.id) + 1 < Math.ceil(tokenCount/maxPerPage)) {

      params.id = Number(params.id) + 1;
  
      document.getElementById('blind').style.left = 'auto';
      document.getElementById('blind').style.right = '0px';
      document.getElementById('blind').style.width = '100%';
      
      buildLists();
  
      router("/gallery/"+Number(params.id));
  
      await timeout(750);
  
      document.getElementById('blind').style.left = '0px';
      document.getElementById('blind').style.right = 'auto';
      document.getElementById('blind').style.width = '0%';
    }


  }


  async function navLeft() {

    if (Number(params.id) > 0) {
      
      params.id = Number(params.id) - 1;
  
      document.getElementById('blind').style.left = '0px';
      document.getElementById('blind').style.right = 'auto';
      document.getElementById('blind').style.width = '100%';
  
      buildLists();
  
      router("/gallery/"+Number(params.id));
  
      await timeout(750);
  
      document.getElementById('blind').style.left = 'auto';
      document.getElementById('blind').style.right = '0px';
      document.getElementById('blind').style.width = '0%';

    }

  }


  async function buildLists() {

      const localNonce = globalNonce = new Object();

      var mult = Number(params.id)+1;
      startIndex = Number(params.id)*maxPerPage;
      endIndex = maxPerPage * mult;
      let countRes;
      var count;
      try{ 
        countRes = await fetch(BACKEND+"tokenCount", {mode: 'cors'});
        count = await countRes.json();
      } catch(e) {
        console.log(e);
        alert("Failed to load token list. Please reload your page");
      }
      tokenCount = Number(count.count);

      /* grey out button if you're at start/end */
      if((Number(params.id) + 1)*maxPerPage>tokenCount) {
        document.getElementById('navR').style.opacity="0";
        document.getElementById('navR').style.pointerEvents="none";
      } else {
        document.getElementById('navR').style.opacity="1";
        document.getElementById('navR').style.pointerEvents="auto";
      }

      if((Number(params.id) - 1) < 0) {
        document.getElementById('navL').style.opacity="0";
        document.getElementById('navL').style.pointerEvents="none";
      } else {
        document.getElementById('navL').style.opacity="1";
        document.getElementById('navL').style.pointerEvents="auto";
      }
      /* page count at bottom */
      document.getElementById('page-counter').innerHTML = (Number(params.id) + 1) + ' | ' + Math.ceil(tokenCount/maxPerPage);

      
      if(endIndex > tokenCount) {
        endIndex = tokenCount;
      }
      var amount = endIndex-startIndex;
      webms = fillArray(baseWebm, amount);
      names = fillArray("Loading...", amount);

      ids = [];
      for (var i = 0; i<amount; i++) {
        ids.push(startIndex + i);
      }

      let response
      let tokenArrayResponse;
      try{
        response = await fetch(token_Dest, {
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
      tokenArrayResponse = await response.json();    

      } catch (e) {
        console.log(e);
      }

      if (localNonce === globalNonce) {

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

      }

      //Dev stuff
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

    setTimeout(function() {
      document.getElementsByClassName('gallery-container')[0].style.overflow = 'visible';
    }, 800)

    window.scrollTo(window.scrollX, 0);
    window.scrollTo(window.scrollX, 2);
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

  @keyframes loading {
    0% {width: 0%;}
    50% {width: 50%;}
    100% {width: 0%;}
  }
  #blind-strip.animate-width {
    animation: loading 1s;
  }
  .viewer-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
  }

  #navL, #navR {
    transition: opacity 0.4s;
  }
  #page-counter {
    align-self: center;
  }
  .gallery-container {
    position: relative;
    overflow: hidden;
    max-height: 0px;
    transition: all 1s;
    margin-top: 50px;
    min-height: 910px;
  }
  .list-container {
    max-height: 0px;
  }
  .list {
    display: grid;
    margin: 0 auto;
    align-content: center;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));
    grid-gap: 50px;
    padding: 10px 0 30px;
    position: relative;
    color:white;
  }

  @media only screen and (max-width: 550px) {
    .list {
      display: block;
      padding: 0px 25px;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    }
    article {
      margin-bottom: 20px;
    }
  }

  @media only screen and (max-width: 750px) {
    .list {
      grid-gap: 25px;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }

  @media only screen and (max-width: 600px) {
    .viewer-buttons button {
      width: 75px;
    }
  }

  #blind {
    position: absolute;
    top: 0;
    right: 0;
    width: 0%;
    height: 100%;
    transition: width 0.6s;
    background-color: var(--xblack);
  }
  .blind-banner {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .blind-banner div {
    position: absolute;
    top: 50%;
    left: 3%;
    transform: translateY(-50%);
    height: 1px;
    width: 94%;
    background: var(--xgreen);
  }

</style>

<section>
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
  <div id="blind">
    <div class="blind-banner"><div id="blind-strip" class="animate-width"></div></div>
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
    <p id="page-counter"></p>
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