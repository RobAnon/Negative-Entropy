<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import {web3Loaded} from './store.js';  
  

  import { initProvider } from './utils';
  import {isEthAddress} from './utils';
  import router from "page";
  import routes from "./routes";
  import List from './routes/List.svelte';
  import Create from './routes/Create.svelte';
  import About from './routes/About.svelte';
  import Home from './routes/Home.svelte';
  import PersonalGallery from './routes/PersonalGallery.svelte';
  import { DataUtils } from 'three';
  
  let page = null;
  let params = {};
  let user = false;
  let buttonDisplay = "Connect Web-Wallet";
  let mode = 'Home';
  let LIMIT = 1000;
  web3Loaded.useSessionStorage();

    //Allows us to force a reconnection to web3
  //This is a really clunky solution, but it should work
  let isWeb3;
  const subscriber = web3Loaded.subscribe(value => {
		isWeb3 = value;
	});


  const app = writable({});
  export const innerHeight = writable(1000)
  export const innerWidth = writable(1000)
  setContext('app', app);

  if(isWeb3 == 1) {
    //reinitializes web3 on a reload
    connectEthProvider();
    console.log("called");
  }

  routes.forEach(route => {
	// Loop around all of the routes and create a new instance of
  // router for reach one with some rudimentary checks.
    router(
      route.path,
			// Set the params variable to the context.
      // We use this on the component initialisation
      (ctx, next) => {
        params = { ...ctx.params };
        next();
      },
			// Check if auth is valid. If so, set the page to the component
      // otherwise redirect to login.
      () => {
        if (route.auth && !user) {
          router.redirect("/");
        } else {
          if(route.dynamic ) {
            if(params.id != null) {
              var value = params.id;
              if (Number.isInteger(Number(value)) && value < LIMIT ){
                page= route.component;
                console.log("shoudl load new");
              } else {
                if(isEthAddress(params.id)) { 
                  page = route.component;
                } else {
                  router.redirect("/");
                }
              }
            }
          } else {
            page = route.component;
          }
        }
      }
    );
  });

	router.start();

  //I THINK we can fix this with a promise
  async function connectEthProvider() {
    if(!app.contract) {
      await initProvider(app);
      buttonDisplay = $app.account;
      console.log($app.account);
    }
    //TODO: Else we will want it to show THEIR NFT's
  }

  function route(dest) {
    //Route to that page – workaround for broken links 
    //James pls fix the href tags, not working for whatever reason, this is a cheap way of fixing on my end
    router(dest);
  }
</script>

<style>
  

  .selected {
    text-decoration: underline;
  }

  

</style>

<header>	
  <span id="logo" href="#">	
    <img src="/logo-main.png" alt="main logo">	
  </span>	
  <div class="navbar-links">	
    <div>	
      <div class="navbar-link" class:selected={mode === 'Home'} on:click={() => (mode = 'Home')} href="/">Home</div>    	
      <div class="navbar-link" class:selected={mode === 'Mint'} on:click={() => (mode = 'Mint')} href='/mint'>Mint</div>  	
      <div class="navbar-link" id="gallery" class:selected={mode === 'publicgallery' || mode == 'mysculptures'}>	
        Gallery	
        <div class="navbar-dropdown" id="navbar-dropdown-1" on:click={() => (mode = 'publicgallery')} href="/gallery">Public Gallery</div>	
        <div class="navbar-dropdown" id="navbar-dropdown-2" on:click={() => (mode = 'mysculptures')} hfef="/gallery/{$app.account}">My NFTs</div>	
      </div>	
      <div class="navbar-link" class:selected={mode === 'About'} on:click={() => (mode = 'About')} href='/about'>About</div>	
      <div class="navbar-link" on:click={() => (mode = 'publicgallery')} href="/gallery">Public Gallery</div>	
      <div class="navbar-link" on:click={() => (mode = 'mysculptures')} hfef="/gallery/{$app.account}">My NFTs</div>	
    </div>	
  </div>	
  <div class="navbar-right">	
    <button class="button-secondary" on:click={connectEthProvider}>{buttonDisplay}</button>	
    <button class="hamburger hamburger--slider" type="button">	
      <span class="hamburger-box">	
        <span class="hamburger-inner"></span>	
      </span>	
    </button>	
  </div>	
</header>
<main>
  <svelte:component this={page} {params} />

  {#if mode === 'publicgallery'}
    {route('gallery')}
  {:else if mode === 'Mint'}
    <Create on:minted={() => (mode = 'publicgallery')} innerHeight={$innerHeight/2} innerWidth={$innerWidth/2} />
<!--- I will be modifying the above function later to route to the personal viewr –shoudnt affect yrou work-->
  {:else if mode === 'Home'}
  {route('/')}
  {:else if mode === 'About'}
  {route('about')}
  {:else if mode = 'mysculptures'}
  {route("/gallery/"+$app.account)}
  {/if}
  
</main>
<svelte:window bind:innerWidth={$innerWidth} bind:innerHeight={$innerHeight}/>
