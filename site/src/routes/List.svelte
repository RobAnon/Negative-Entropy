<script>
  //TODO: Improve link population via pre-calculation of what each article should link to
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';
  import { LogLuvEncoding } from 'three/build/three.module';
  import { beforeUpdate, afterUpdate } from 'svelte';
  import router from "page";
  import {replObj} from "../utils.js";
  import * as animateScroll from 'svelte-scrollto';
  import jQuery from 'jQuery';
import { each } from 'svelte/internal';


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

  async function navRight(x = 1) {

    if (Number(params.id) + 1 < Math.ceil(tokenCount/maxPerPage)) {

      params.id = Number(params.id) + x;

      calculateScroller();

      var numbers = document.getElementsByClassName('page-number');
      for (var i = 0; i<numbers.length; i++) {
        numbers[i].classList.remove('current-page');
        if (Number(params.id) === i) {
          numbers[i].classList.add('current-page');
        }
      }
  
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


  async function navLeft(x = 1) {

    if (Number(params.id) > 0) {
      
      params.id = Number(params.id) - x;

      calculateScroller();

      var numbers = document.getElementsByClassName('page-number');
      for (var i = 0; i<numbers.length; i++) {
        numbers[i].classList.remove('current-page');
        if (Number(params.id) === i) {
          numbers[i].classList.add('current-page');
        }
      }
    
  
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


  async function goToPage() {
    var page = this.innerHTML;

    if (Number(page) === Number(params.id) + 1) {
      return;
    }

    if (Number(page) > Number(params.id) + 1) {
      navRight(Number(page) - Number(params.id) - 1);
    }

    if (Number(page) < Number(params.id) + 1) {
      navLeft(Number(params.id) - Number(page) + 1);
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

  function calculateScroller() {

    var scroller = document.getElementById('page-scroller');
    var scrollerWidth = window.getComputedStyle(scroller).getPropertyValue('width').split('px')[0];
    var difference = 350 - scrollerWidth;
    var scrollAmt = Number(params.id) * 50 + (difference/2);
    scroller.scroll({
      left: scrollAmt,
      behavior: 'smooth'
    })

  }

  //CONSIDER Await blocks
	onMount(async function() {

    fadeIn();
		window.scrollTo(window.scrollX, window.scrollY + 1);

    if (params.id == null || params.id == '' || Number(params.id) < 0 ) {
      params.id = 0;
      router("/gallery/0");
      location.reload();
    }


    try{ 
      var countRes = await fetch(BACKEND+"tokenCount", {mode: 'cors'});
      var count = await countRes.json();
    } catch(e) {
      console.log(e);
      alert("Failed to load token list. Please reload your page");
    }
    tokenCount = Number(count.count);

    var pageNumberContainer = document.getElementsByClassName('page-scroller')[0];

    for (var i = 0; i < Math.ceil(tokenCount/maxPerPage); i++) {
      var el = document.createElement('p');
      el.classList.add('page-number');
      el.innerHTML = i + 1;
      el.onclick = goToPage;
      if (Number(params.id) === i) {
        el.classList.add('current-page');
      }
      pageNumberContainer.appendChild(el); 
    } 

    calculateScroller();

    setTimeout(function() {
      document.getElementsByClassName('gallery-container')[0].style.overflow = 'visible';
    }, 800)


    // scroll horizontally on vertical scroll when hovered over page numbers
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.getElementById('page-scroller').scrollLeft -= (delta * 7);
        e.preventDefault();
    }
    document.getElementById('page-scroller').addEventListener('mousewheel', scrollHorizontally, false);
    document.getElementById('page-scroller').addEventListener('DOMMouseScroll', scrollHorizontally, false);

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

  .page-scroller::-webkit-scrollbar {
    height: 10px;
  }
  .page-scroller:hover::-webkit-scrollbar-thumb {
    background: rgba(5, 5, 5, 1);
    transition: background 3s;
  }
  .page-scroller::-webkit-scrollbar-track {
    background-color: var(--xblack);
  }
  .page-scroller::-webkit-scrollbar-thumb {
    background: rgba(5, 5, 5, 0);
    border-radius: 10px;
    transition: background 3s;
  }

  .page-scroller {
    display: inline-block;
    width: 100%;
    overflow: auto;
    white-space: nowrap;
    position: relative;
    top: 6px;
  }
  .page-scroller-container {
    position: relative;
    max-width: 350px;
    min-width: 0;
    flex-shrink: 2;
  }
  .page-scroller-container:after, .page-scroller-container:before {
    content: '';
    display: block;
    width: 100px;
    height: 100%;
    position: absolute;
    pointer-events: none;
  }
  .page-scroller-container:after {
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(17, 17, 17, 1));
    right: 0;
    top: 0;
    z-index: 2;
  }
  .page-scroller-container:before {
    background: linear-gradient(to right, rgba(17, 17, 17, 1), rgba(0, 0, 0, 0));
    left: 0;
    z-index: 2;
  }
  :global(.page-number) {
    margin: 0;
    display: inline-block;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    transition: margin-left 0.3s;
    position: relative;
    cursor: pointer;
    box-sizing: content-box;
    transition: all 0.4s;
  }
  :global(.page-number:nth-child(1)) {
    padding-left: 150px;
  }
  :global(.page-number:nth-last-child(1)) {
    padding-right: 150px;
  }
  :global(.current-page) {
     text-shadow: 0px 0px 8px var(--xgreen);
     color: var(--xgreen);
  }

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
  }
  @media only screen and (max-width: 600px) {
    .viewer-buttons .button-secondary {
      width: 55px !important;
    }
  }
  .viewer-buttons .button-secondary {
    width: 100px;
    height: 40px;
    border-width: 1px;
    padding: 0;
  }
  .viewer-buttons .button-secondary h3 {
    margin: 0;
    width: 100%;
    height: 100%;
    line-height: 34px;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
    pointer-events: none;
    transform: scaleX(0.4);
  }

  #navL, #navR {
    transition: opacity 0.4s;
  }
  .gallery-container {
    position: relative;
    overflow: hidden;
    transition: all 1s;
    margin-top: 50px;
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
      padding: 0px;
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
      <button class="button-secondary" on:click={() => navLeft(1) }>
        <h3>&lt;</h3>
      </button>
    </div>
    <div class="page-scroller-container">
      <div class="page-scroller" id="page-scroller">    </div>
    </div>
    <div id="navR">
      <button class="button-secondary" on:click={() => navRight(1) }>
        <h3>&gt;</h3>
      </button>
    </div>

  </div>


</section>


<div class="section-break section-break-final"></div>