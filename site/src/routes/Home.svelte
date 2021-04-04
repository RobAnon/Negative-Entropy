<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';
  import { onMount } from 'svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  const app = getContext('app');
  let count = 0;
  let data;
  let token = {json:{description:""},id:"0"};
  let view;
  let result;

onMount(async () => {

  await getData();
  console.log(result.tokenURI);

  const res = await fetch(result.tokenURI);
  const json = await res.json();
    
  token.json = json;
  token.id = data.id;
  data = json;
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


<style>
.render {
    width: 50px;
    height:50px;
}
</style>



<section>	
  <div class="homepage-heading">	
    <div class="header-text">	
      <h1>How can the net amount of <b>entropy</b> in the universe be decreased?</h1>	
      <p>We make NFT's using Chaos Theory and the iNFT standard.</p>	
      <button class="button-main">Mint</button>	
      <button class="button-secondary">Learn more</button>	
    </div>	
    <div class="orb">	
      <div class='wrap'>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
        <div class='c'></div>	
      </div>	
    </div>	
  </div>	
  <div class="render" bind:this={view}/>
  <body>
    This method is how you get total tokens: total tokens are 
    {#await getCount()} 
    Displays this text while loading
    {:then count}
    {count}
    {/await}
  </body>
    
</section>