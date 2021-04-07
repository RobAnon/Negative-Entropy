<script>
  import { onMount } from 'svelte';
  import { getContext } from 'svelte';
  import Sandbox from '@beyondnft/sandbox';
  import App from '../App.svelte';
  import { onDestroy } from 'svelte';
  export let token = {json:{description:""}};
  export let params;
  import router from "page";
  import page from 'page';
import SharePrompt from '../components/SharePrompt.svelte';


 
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

  const app = getContext('app');
  const opensea_base = "https://opensea.io/assets/";
  let opensea = ""; 



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
  
  //Clunky and inefficient, but they solve the problem
  function navigateRight() {
    params.id = right;
    router("/viewer/"+right+"/"+params.origin.trim());
    location.reload();
  }

  function navigateLeft() {
    params.id = left;
    router("/viewer/"+left+"/"+params.origin.trim());
    location.reload();
  }

  async function navRight() {
   
    var nextId = Number(token.id) + 1;
    var count = await getCount();
    if(nextId >= count) {
      //We've reached the end, loop the content
      right = token.id;
    } else {
      right = nextId;
    }
  }
  
  async function navLeft() {
    var nextId = Number(token.id) - 1;
    if(nextId < 0) {
      left = token.id;
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
      router("/gallery/0");//TODO: Make this dynamic
    } 
  }

  function share() {
    shareURL = image;
    sharing = true;
  }

  onMount(async () => {

    await getData();
    if (params.origin == null || params.origin == '') {
      params.origin = 'public';
    }
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
    await navRight();
    await navLeft();

    window.scrollTo(window.scrollX, window.scrollY + 1);
  });

  

</script>

<style>
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

@media only screen and (max-width: 1200px) {
  .output {
    display: block;
  }
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
        <div class="render" bind:this={view}></div>

        <div class="viewer-buttons">

          <div id="navL">
            <button class="button-main" on:click={navigateLeft}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
              </svg>
            </button>
          </div>

          <div id="navR">
            <button class="button-main" on:click={navigateRight}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
              </svg>
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
          <a href={opensea} id="os" title="Buy on OpenSea" target="_blank"><img id="img" src="https://storage.googleapis.com/opensea-static/opensea-brand/listed-button-white.png" alt="Buy on OpenSea badge" /></a>
          </div>
          <div id="share">
          <button on:click={()=>share()}>Click to open Window</button>
          </div>
          {/if}
      </div>

      <div id="share-prompt">
        {#if sharing}
        {#await shareURL}
          <SharePrompt shareURL={"Loading..."} />
        {:then url}
          <SharePrompt shareURL={url} />
        {/await}
        {/if}
      </div>
    </div>

    
  
  </div>

    
  </section>
  <div class="section-break section-break-final"></div>