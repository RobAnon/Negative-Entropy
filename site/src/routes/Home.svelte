<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';
  import Sandbox from '@beyondnft/sandbox';
  import {quickJSON} from '../conf/quickview';
import routes from '../routes';
import router from "page";

  let tokens = [];
  let totalTokens = 0;
  let contract;
  const app = getContext('app');
  let count = 0;
  let data ={};
  let token = {json:{description:""},id:"0"};
  let view;
  let result;
  let seed = Date();
  let encodedSeed = encodeURIComponent(Date());

onMount(async () => {
  var seedResp = await fetch(BACKEND+"randomDuneLine");
  var respSeed = await seedResp.json();
  var seedLine = respSeed.line;
  
  var rand = Math.random()*256;
  var binary = (rand >>> 0).toString(2);

  seed = binary + " " + seedLine + " " + binary;
  encodedSeed = encodeURIComponent(seed);
  token.json = quickJSON;

  data = quickJSON;
  data.seed = seed;

  renderSandbox();

  console.log('mounted');

  window.scrollTo(window.scrollX, 0);
  window.scrollTo(window.scrollX, 2);

});

async function getCount() {
    var backend_dest = BACKEND + "tokenCount";
    var response = await fetch(backend_dest);
    var result = await response.json();
    return Number(result.count);
}

async function getData() {
  var count = await getCount();
  var id = Math.floor(Math.random()*count);//Will give us a random token
  data.id = id;
  var url = BACKEND + "token";
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({id})
  });
  result = await response.json();
  
}

function renderSandbox() {
  console.log(data);
    new Sandbox({
      target: view,
      props: {
        data,
      },
    });
  }

  function goToMint() {
    window.location = "/mint/"+encodedSeed;
  }


</script>




<section>	
  <div class="homepage-heading">	
    <div class="header-text">	

      <h1 class="fade-in fade-in-1">The <b>Spice</b> must flow.</h1>	
      <p class="fade-in fade-in-2">Negative Entropy presents: Subseries Rena</p>	
      <p class="fade-in fade-in-2">We make NFT's using Chaos Theory and the iNFT standard.</p>	
      <button class="button-main fade-in fade-in-2"><a href="/mint/{encodedSeed}">Mint</a></button>	
      <button class="button-secondary fade-in fade-in-2"><a href="/about">Learn more</a></button>	
      <p class="tokens-remaining fade-in fade-in-3">
        {#await getCount()} 
        ?
        {:then count}
        {100 - count}
        {/await}
        / 100 remaining.
      </p>
    </div>	
    <div class="homepage-graphic">	
      
      <div class="render fade-in fade-in-3" bind:this={view}/>
      <div class="graphic-shader">&nbsp;</div>
    </div>
    <div class="graphic-clickbox" on:click={goToMint}></div>
  </div>	
</section>

<div class="section-break"></div>

<section>
  <div class="homepage-info">
    <h2 class="fade-in fade-in-1">What is <b>Negative Entropy</b>?</h2>
    <div class="homepage-info-img">
      <img class="fade-in fade-in-2"src='/logo-main.png' alt='entropy-info'>
    </div>
    <div class="homepage-info-text">
      <p class="fade-in fade-in-1">Negative Entropy is a first-of-its-kind digital collection of kinetic sculptures based on the concept of chaotic attractors, equations that describe the complex and infinite motion of dynamic systems that exhibit ”chaos”. Chaotic attractors are some of the most striking examples of mathematical beauty to be found in Chaos Theory. Negative Entropy allows its holders to project their words into that beauty, forming the synthesis of chaos and thought that we call “art”.</p>
      <p class="fade-in fade-in-1">Each sculpture is generated based on a seed you choose as you explore the space that our sandbox encompasses – no two are exactly alike. Sculptures vary in speed, shape, color, rotation, and a variety of other ways we will leave to you to figure out. When you find one that strikes you, mint it, and your discovery of it will be recorded, immutably, on the blockchain.</p>
      <button class="button-main fade-in fade-in-1"><a href="/mint/{encodedSeed}">Decrease the total amount of entropy in the universe (Create your own).</a></button>
    </div>
  </div>
</section>




<div class="section-break section-break-final"></div>