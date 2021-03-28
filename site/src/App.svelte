<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { initProvider } from './utils';

  import List from './pages/List.svelte';
  import Create from './pages/Create.svelte';
  import About from './pages/About.svelte';
  import Home from './pages/Home.svelte';
  
  

  let mode = 'Mint';

  const app = writable({});
  export const innerHeight = writable(1000)
  export const innerWidth = writable(1000)
  setContext('app', app);

  initProvider(app);

  // export let getAccounts = async () => {
  //   await $app.provider.send('eth_requestAccounts').then((res)=>{
  //       console.log(res); 
  //     $app.accounts = res.result[0]})
  // }
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
    background-color: #f8f9fa !important
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
            <a class="nav-link active" aria-current="page" href="#" on:click={() => (mode = 'Home')}>Home</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#" on:click={() => (mode = 'Gallery')}>Gallery</a>
          </li> -->
          <li class="nav-item" class:selected={mode === 'Mint'}>
            <span class="nav-link" on:click={() => (mode = 'Mint')}>Mint</span>
          </li>
          <li class="nav-item" class:selected={mode === 'About'}>
            <span class="nav-link" on:click={() => (mode = 'About')}>About</span>
          </li>
          <li class="nav-item dropdown" class:selected={mode === 'Gallery'}>
            <span class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Gallery
            </span>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">Public Gallery</a></li>
              <li><a class="dropdown-item" href="#" on:click={() => (mode = 'Gallery')}>My Sculptures</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div style="float: right;">
        <button class="btn btn-dark">{$app.account}</button>
      </div>

    </div>
  </nav>
  <!-- <h1></h1>
  <nav>
    <ul>
      <li class:selected={mode === 'Home'} on:click={() => (mode = 'Home')}>
        Home
      </li>
      <li class:selected={mode === 'Gallery'} on:click={() => (mode = 'List')}>
        Gallery
      </li>
      <li class:selected={mode === 'Mint'} on:click={() => (mode = 'Mint')}>
        Mint
      </li>
      <li class:selected={mode === 'About'} on:click={() => (mode = 'About')}>
        About
      </li>
    </ul>
  </nav> -->
</header>
<svelte:window bind:innerWidth={$innerWidth} bind:innerHeight={$innerHeight}/>
<main>
  
  {#if $app.contract}
    {#if mode === 'list'}
      <List />
    {:else if mode === 'Mint'}
      <Create on:minted={() => (mode = 'list')} innerHeight={$innerHeight/2} innerWidth={$innerWidth/2} />
    {:else if mode === 'Home'}
      <Home />
    {:else if mode === 'Home'}
      <About />
    {/if}
    
  {:else}Connecting to ethereum provider ...{/if}
</main>
