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


 
  // load json
  // show image and title
  let image;
  let name;

  let data;
  let attributes = [];
  let url;
  let view;
  let left = 0;
  let right = 0;

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


  async function getData() {
    console.log("Contract is" + process.env.CONTRACT_ADDRESS);
    url = BACKEND + "token";
    console.log("Id is "+ params.id);
    let response = await fetch(url, {
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
    router("/viewer/"+right+"+"+params.origin.trim());
    location.reload();
  }

  function navigateLeft() {
    params.id = left;
    router("/viewer/"+left+"+"+params.origin.trim());
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
    var response = await fetch(backend_dest);
    var result = await response.json();
    return Number(result.count);
  }

  function navigateUp() {
    if(params.origin.trim() == 'private') {
      router("/gallery/" + $app.account);
    } else {
      router("/gallery");
    } 
  }

  onMount(async () => {

    await getData();
    console.log(data);
    if (params.origin == null) {
      params.origin = 'public';
    }
    console.log("LOADED");
    const res = await fetch(data.tokenURI);
    const json = await res.json();
    
    token.json = json;
    token.id = data.id;
    
    image = json.image;
    name = json.name;

    data = json;
    console.log(json);
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
  section {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0px;
  }

 
  h2 {
    margin: 10px 0;
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
    flex-direction: row;
    flex: 1 1 0;
  }

  .render {
    width: 75%;
    flex: 0 0 auto;
  }

  .data {
    padding: 0 20px;
    text-align: left;
    flex: 1;
    height: 80%;
    color:white;
  }

  #navR {
    float:right;
    margin:20 px;
  }

  #navL {
    float:left;
    margin:20px;
  }
</style>
<section class="big">
    <div class="content">
      <h2>{name}</h2>
      <div class="output">
        <div class="render" bind:this={view} />
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
            {/if}
        </div>
      </div>
      <br>
      <div id="navR">
      <button class="btn btn-dark" on:click={navigateRight}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
      </svg></button>
    </div>
    <div id="navL">
      <button class="btn btn-dark" on:click={navigateLeft}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
      </svg></button>
    </div>
    <div id="navU">
      <button class="btn btn-dark" on:click={navigateUp}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
      </svg></button>
    </div>
    
    </div>

    
  </section>
  
  <div class="section-break section-break-final"></div>