<script>
  import { onMount } from 'svelte';
  import Sandbox from '@beyondnft/sandbox';
  import App from '../App.svelte';

  export let token = {json:{description:""}};
  export let params;

 
  // load json
  // show image and title
  let image;
  let name;

  let data;
  let attributes = [];
  let url;
  let view;

  const opensea_base = "https://opensea.io/";
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
    url = BACKEND + "token";
    let response = await fetch(url, {
    	method: 'POST',
    	headers: {
    		'Content-Type': 'application/json;charset=utf-8'
    	},
    	body: JSON.stringify({id:params.id})
    });
    let result = await response.json();
    console.log(result.tokenURI);
    data = result;
  }

  onMount(async () => {
    await getData();
    console.log(data);
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
    opensea = opensea_base + process.env.CONTRACT_ADDRESS + "/" + token.id;
    renderSandbox();
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
      
    </div>

    
  </section>
