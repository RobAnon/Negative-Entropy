<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';
  import Sandbox from '@beyondnft/sandbox';
  import {quickJSON} from '../conf/quickview';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  const app = getContext('app');
  let count = 0;
  let data ={};
  let token = {json:{description:""},id:"0"};
  let view;
  let result;

onMount(async () => {
    
  token.json = quickJSON;

  data = quickJSON;
  renderSandbox();
})

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


</script>




<section>	
  <div class="homepage-heading">	
    <div class="header-text">	
      <h1 class="fade-in fade-in-1">How can the net amount of <b>entropy</b> in the universe be decreased?</h1>	
      <p class="fade-in fade-in-2">We make NFT's using Chaos Theory and the iNFT standard.</p>	
      <button class="button-main fade-in fade-in-3">Mint</button>	
      <button class="button-secondary fade-in fade-in-3">Learn more</button>	
    </div>	
    <div class="homepage-graphic">	
      <div class="render fade-in fade-in-3" bind:this={view}/>
      <div class="graphic-shader">&nbsp;</div>
    </div>	
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
      <p class="fade-in fade-in-2">Negative Entropy is a first-of-its-kind digital collection of kinetic sculptures based on the concept of chaotic attractors, equations that describe the complex and infinite motion of dynamic systems that exhibit ”chaos”. Chaotic attractors are some of the most striking examples of mathematical beauty to be found in Chaos Theory. Negative Entropy allows its holders to project their words into that beauty, forming the synthesis of chaos and thought that we call “art”.</p>
      <p class="fade-in fade-in-1">Each sculpture is generated based on a seed you choose as you explore the space that our sandbox encompasses – no two are exactly alike! Sculptures can vary in speed, shape, color, rotation, and a variety of other ways we will leave to you to figure out. When you find one that strikes you, mint it, and it will be yours forever, immutably preserved by the power of the blockchain.</p>
      <button class="button-main fade-in fade-in-1">Decrease the total amount of entropy in the universe (Create your own).</button>
    </div>
  </div>
</section>


<section>
  This method is how you get total tokens: total tokens are 
  {#await getCount()} 
  Displays this text while loading
  {:then count}
  {count}
  {/await}
</section>