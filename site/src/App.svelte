<script>

  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { initProvider } from './utils';
  import router from "page";
  import routes from "./routes";
  import List from './routes/List.svelte';
  import Create from './routes/Create.svelte';
  import About from './routes/About.svelte';
  import Home from './routes/Home.svelte';
import PersonalGallery from './routes/PersonalGallery.svelte';
  
  let page = null;
  let params = {};
  let user = false;
  let buttonDisplay = "Connect Web-Wallet";
  let mode = 'Home';

  const app = writable({});
  export const innerHeight = writable(1000)
  export const innerWidth = writable(1000)
  setContext('app', app);

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
          page = route.component;
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
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin: 0 10px;
  }

  li {
    display: inline;
    margin: 0 10px;
    cursor: pointer;
  }

  .selected {
    text-decoration: underline;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .bg-light {
    background-color: #f8f9fa 
  }

</style>

<header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Negative Entropy</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/mint">Mint</a>
          </li>
          
          <li class="nav-item" class:selected={mode === 'About'}>
            <a class="nav-link" href='/about'>About</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Gallery
            </a>
            <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item text-white " href="/gallery">Public Gallery</a>
              <a class="dropdown-item text-white" href="/gallery/{$app.account}">My NFTs</a>
            </div>
          </li>
        </ul>
      </div>
      <div style="float: right;">
        <button class="btn btn-dark" on:click={connectEthProvider}>{buttonDisplay}</button>
      </div>

    </div>
  </nav>
</header>
<main>
  <svelte:component this={page} {params} />
</main>
<svelte:window bind:innerWidth={$innerWidth} bind:innerHeight={$innerHeight}/>
<!---
<main>
  
    {#if mode === 'list'}
      <List />
    {:else if mode === 'Mint'}
      <Create on:minted={() => (mode = 'list')} innerHeight={$innerHeight/2} innerWidth={$innerWidth/2} />
    {:else if mode === 'Home'}
      <Home />
    {:else if mode === 'About'}
      <About />
    {:else if mode === 'publicgallery'}
      <List />
    {:else if mode = 'mysculptures'}
      <PersonalGallery />
    {/if}
    
</main>-->
