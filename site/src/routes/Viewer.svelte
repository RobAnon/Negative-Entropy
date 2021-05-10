<script>
  import { afterUpdate, onMount } from 'svelte';
  import { getContext } from 'svelte';
  import Sandbox from '@beyondnft/sandbox';
  import App from '../App.svelte';
  import { onDestroy } from 'svelte';
  export let token = {json:{description:""}};
  export let params;
  import router from "page";
  import page from 'page';
import SharePrompt from '../components/SharePrompt.svelte';
import { LogLuvEncoding } from 'three/build/three.module';

 
  // load json
  // show image and title
  let image;
  let name = "Loading Data...";
  let shareURL = "";

  let data;
  let attributes = [];
  let url;
  let view;
  let left = 0;
  let right = 0;
  let sharing = false;
  let maxPerPage = 6;
  var total = '';


  const app = getContext('app');
  const opensea_base = "https://opensea.io/assets/";
  let opensea = ""; 

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function renderSandbox() {

    new Sandbox({
      target: view,
      props: {
        data,
      },
    });
  }

  async function getShareURL() {
    if(shareURL != "") {
      //We already have a shareURL
      return shareURL;
    }
    const URL = "https://api.gfycat.com/v1/gfycats";
    var fetchUrl = image;
    var title = name;
    var payload = {
      fetchUrl,
      title
    }
    var rawResponse = await fetch(URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      mode: 'cors',
      body: JSON.stringify(payload)
    });
    var response = await rawResponse.json();
    if(response.hasOwnProperty('errorType')){
      return "Error in uploading to Gfycat!";
    }
    if(!response.isOk == "true") {
      return "Error in uploading to Gfycat!"
    }
    return "https://gfycat.com/" + response.gfyname.toLowerCase();
  }

  async function getData() {
    url = BACKEND + "token";
    let response = await fetch(url, {
      mode: 'cors',
    	method: 'POST',
    	headers: {
    		'Content-Type': 'application/json;charset=utf-8'
    	},
    	body: JSON.stringify({id:Number(params.id)})
    });
    let result = await response.json();
    data = result;
  }
  
  var canMove = true;

  var blind = document.createElement('div');
  blind.id = 'blind';
  var blindInner = '';


  function calculateScroller() {

    var scroller = document.getElementById('page-scroller');
    var scrollerWidth = window.getComputedStyle(scroller).getPropertyValue('width').split('px')[0];
    var difference = 350 - scrollerWidth;
    var scrollAmt = Number(params.id) * 50 + (difference/2);
    scroller.scroll({
      left: scrollAmt,
      behavior: 'smooth'
    })

    var numbers = document.getElementsByClassName('page-number');
      for (var i = 0; i<numbers.length; i++) {
        numbers[i].classList.remove('current-page');
        if (Number(params.id) === i) {
          numbers[i].classList.add('current-page');
        }
      }

  }


  //Clunky and inefficient, but they solve the problem
  async function navigateRight(amt = 1) {

    if (canMove) {
      
      canMove = false;
      var blind = document.getElementById('blind')
      blind.style.left = 'auto';
      blind.style.right = '0px';
      blind.style.width = '100%';

      if (Number(params.id) + 1 < total) {
        params.id = Number(params.id) + Number(amt);
      } else {
        params.id = 0;
      }
      calculateScroller();

      await timeout(400)

      var canv = document.getElementById('render');
      while (canv.firstChild) {
        canv.removeChild(canv.firstChild);
      }

      await getData();
      await parseData();
      router("/viewer/"+ params.id +"/"+params.origin.trim());

      await timeout(50);
      blind.style.left = '0px';
      blind.style.right = 'auto';
      blind.style.width = '0%';

      canMove = true;
    }

  }

  async function navigateLeft(amt = 1) {

    console.log(amt);

    if (canMove) {
      canMove = false;

      var blind = document.getElementById('blind')
      blind.style.left = '0px';
      blind.style.right = 'auto';
      blind.style.width = '100%';

      if (Number(params.id) - 1 >= 0) {
        params.id = Number(params.id) - Number(amt);
      } else {
        params.id = total - 1;
      }
      calculateScroller();

      await timeout(400)
      
      var canv = document.getElementById('render');
      while (canv.firstChild) {
        canv.removeChild(canv.firstChild);
      }

      await getData();
      await parseData();
      router("/viewer/"+params.id+"/"+params.origin.trim());


      await timeout(50);
      blind.style.left = 'auto';
      blind.style.right = '0px';
      blind.style.width = '0%';

      canMove = true;
    }

  }

  async function navRight() {
   
    var nextId = Number(token.id) + 1;
    var count = await getCount();
    if(nextId >= count) {
      //We've reached the end, loop the content
      right = 0;
    } else {
      right = nextId;
    }
  }
  
  async function navLeft() {
    var nextId = Number(token.id) - 1;
    var count = await getCount() - 1;
    if(nextId < 0) {
      left = count;
    } else {
      left = nextId;
    }
  }

  async function getCount() {
    var backend_dest = BACKEND + "tokenCount";
    var response = await fetch(backend_dest, {mode: 'cors'});
    var result = await response.json();
    return Number(result.count);
  }

  function navigateUp() {
    if(params.origin.trim() == 'private') {
      router("/personal-gallery/" + $app.account);
    } else {
      console.log('TOKEN:', Number.parseInt(token.id));
      console.log('MAX PER PAGE', maxPerPage);
      var page_origin = Math.floor(Number.parseInt(token.id)/maxPerPage);
      router("/gallery/" + page_origin);//TODO: Make this dynamic
    } 
  }

  async function goToPage() {

    var page = this.innerHTML;

    if (Number(page) === Number(params.id) + 1) {
      return;
    }

    if (Number(page) > Number(params.id) + 1) {
      navigateRight(Number(page) - Number(params.id) - 1);
    }

    if (Number(page) < Number(params.id) + 1) {
      navigateLeft(Number(params.id) - Number(page) + 1);
    }
  }

  function share() {
    shareURL = image;
    sharing = true;
  }

  function closeShare() {
    sharing = false;
  }
  async function parseData() {

      const res = await fetch(data.tokenURI, {mode: 'cors'});
      const json = await res.json();
      
      token.json = json;
      token.id = data.id;
      
      image = json.image;
      name = json.name;

      data = json;
      attributes = [];
      Object.keys(data.attributes).forEach((key) => {
        attributes.push({ key: data.attributes[key].trait_type, value: data.attributes[key].value });
      });
      opensea = opensea_base + String(process.env.CONTRACT_ADDRESS).toLowerCase() + "/" + token.id;
      renderSandbox();
    
  }

  const calculateShiny = () => {
    var shiny = document.querySelectorAll('.data ul li:nth-of-type(1)')[0];
    if (shiny) {
      if (shiny.innerHTML.includes('True')) {
        shiny.style.textShadow = "0px 0px 10px var(--xwhite)";
      } else {
        shiny.style.textShadow = "none";
      }
    }
  }

  afterUpdate(() => {
    calculateShiny();
  })

  onMount(async () => {

    total = await getCount();

    await getData();
    if (params.origin == null || params.origin == '') {
      params.origin = 'public';
    }
    parseData();

    await navRight();
    await navLeft();

    var pageNumberContainer = document.getElementsByClassName('page-scroller')[0];
    for (var i = 0; i < total; i++) {
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
    calculateShiny()

  });

  

</script>

<style>

  :global(.data ul li:nth-of-type(1)) {
    transition: text-shadow 0.6s;
  }

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
  .big {
    width: 100%;
    height: min-content;
    border: none;
    border-radius: 0px;
  }
  .big .output {
    min-height: 600px;
  }


 
  h2 {
    margin: 0px;
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 56px;
  }
 
  #open {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  #img {
    width:160px; 
    border-radius:5px; 
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  }

  .output {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    flex: 1 1 0;
  }

  .render-container {
    min-width: 75%;
    flex: 0 0 auto;
  }
  .render {
    min-height: 600px;
  }
  .data {
    padding: 0 20px;
    text-align: left;
    flex: 1;
    height: 80%;
    color:white;
    min-width: 270px;
  }

  .viewer-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
  }

  li {
    font-family: 'roboto mono';
    font-weight: 200;
  }

  #navU {
    cursor: pointer;
    margin-bottom: 15px;
    width: 250px;
  }
  #navU svg {
    fill: var(--xwhite);
    width: 25px;
    display: inline-block;
    position: relative;
    top: 6px;
    margin-right: 10px;
  }

  #navU p, #navU svg {
    display: inline-block;
  }

  #navU p {
    font-size: 16px;
    margin: 0;
    margin-bottom: 10px;
  }
  #viewer-page-counter {
    align-self: center;
    margin: 0;
  }

  @media only screen and (max-width: 600px) {
    .viewer-buttons button {
      width: 75px;
    }
  }
@media only screen and (max-width: 1200px) {
  .output {
    display: block;
  }
  .data {
    margin-top: 50px;
  }
}


.gfycat-button {
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  width: max-content;
}

.gfycat-button svg {
  fill: white;
  height: 15px;
  position: relative;
  top: 2px;
  margin-right: 4px;
}

.big strong {
  text-transform: capitalize;
}

.viewer-buttons {
  height: 45px;
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
    font-weight: 500;
    pointer-events: none;
    transform: scaleX(0.6);
  }
.render-container > div:nth-of-type(1) {
  position: relative;
  width: 100%;
  height: min-content;
}


#blind {
    position: absolute;
    top: 0;
    right: 0;
    width: 0%;
    height: 100%;
    transition: width 0.4s;
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
<section class="big">
  <br>
  <br>
  <div class="content">
    <h2>{name}</h2>
    
    <div id="navU">
      <div class="navigate-up" on:click={navigateUp}>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
          <g>
            <g>
              <path d="M384.834,180.699c-0.698,0-348.733,0-348.733,0l73.326-82.187c4.755-5.33,4.289-13.505-1.041-18.26
              c-5.328-4.754-13.505-4.29-18.26,1.041l-82.582,92.56c-10.059,11.278-10.058,28.282,0.001,39.557l82.582,92.561
              c2.556,2.865,6.097,4.323,9.654,4.323c3.064,0,6.139-1.083,8.606-3.282c5.33-4.755,5.795-12.93,1.041-18.26l-73.326-82.188
              c0,0,348.034,0,348.733,0c55.858,0,101.3,45.444,101.3,101.3s-45.443,101.3-101.3,101.3h-61.58
              c-7.143,0-12.933,5.791-12.933,12.933c0,7.142,5.79,12.933,12.933,12.933h61.58c70.12,0,127.166-57.046,127.166-127.166
              C512,237.745,454.954,180.699,384.834,180.699z"/>
            </g>
          </g>
          
        </svg>
        <p>Back to Gallery.</p>
      </div>
    </div>

    <div class="output">

      <div class="render-container">
        <div>
            <div class="render" id="render" bind:this={view}></div>
            <div id="blind">
              <div class="blind-banner">
                <div id="blind-strip" class="animate-width"></div>
              </div>
            </div>
        </div>

        <div class="viewer-buttons">

          <div id="viewer-navL">
            <button class="button-secondary" on:click={() => navigateLeft()}>
              <h3>&lt;</h3>
            </button>
          </div>
          
        <div class="page-scroller-container">
          <div class="page-scroller" id="page-scroller">    </div>
        </div>

          <div id="viewer-navR">
            <button class="button-secondary" on:click={() => navigateRight()}>
              <h3>&gt;</h3>
            </button>
          </div>
    
        </div>
      </div>

      <div class="data">
        <h3>Description</h3>
        <p>{token.json.description}</p>
        {#if attributes.length}
          <h3>Attributes</h3>
          <ul>
            {#each attributes as attribute}
              <li><strong>{attribute.key}</strong>: {attribute.value}</li>
            {/each}
          </ul>
          <br>
          <div id="open">
            <a href={opensea} title="Buy on OpenSea" target="_blank"><img style="width:160px; border-radius:5px; box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);" src="https://storage.googleapis.com/opensea-static/opensea-brand/buy-button-white.png" alt="Buy on OpenSea badge" /></a>
          </div>
          <div id="share">
            <button class="button-main gfycat-button" on:click={()=>share()}>
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 88.1 88.1" style="enable-background:new 0 0 88.1 88.1;" xml:space="preserve">
                <g id="_x37_7_Essential_Icons_58_">
                  <path id="Share" d="M69.05,58.1c-4.8,0-9.1,2.3-11.8,5.8l-24.3-14.1c1.5-3.7,1.5-7.8,0-11.5l24.3-14.1c2.7,3.5,7,5.8,11.8,5.8
                    c8.3,0,15-6.7,15-15s-6.7-15-15-15s-15,6.7-15,15c0,2,0.4,4,1.1,5.7l-24.3,14.2c-2.8-3.5-7-5.8-11.8-5.8c-8.3,0-15,6.7-15,15
                    s6.7,15,15,15c4.8,0,9.1-2.3,11.8-5.8l24.3,14.1c-0.7,1.7-1.1,3.7-1.1,5.7c0,8.3,6.7,15,15,15s15-6.7,15-15S77.35,58.1,69.05,58.1z
                    M69.05,4.1c6.1,0,11,4.9,11,11s-4.9,11-11,11c-6.1,0-11-4.9-11-11S62.95,4.1,69.05,4.1z M19.05,55.1c-6.1,0-11-4.9-11-11
                    s4.9-11,11-11s11,4.9,11,11S25.15,55.1,19.05,55.1z M69.05,84.1c-6.1,0-11-4.9-11-11s4.9-11,11-11c6.1,0,11,4.9,11,11
                    S75.15,84.1,69.05,84.1z"/>
                </g>
              </svg>
              Share to Gfycat
            </button>
          </div>
          {/if}
      </div>

      <div id="share-prompt">
        {#if sharing}
        {#await shareURL}
          <SharePrompt close={closeShare} shareURL={"Loading..."} />
        {:then url}
          <SharePrompt close={closeShare} shareURL={url} />
        {/await}
        {/if}
      </div>
    </div>    
  
  </div>

    
  </section>
  <div class="section-break section-break-final"></div>