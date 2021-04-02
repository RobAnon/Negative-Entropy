<script>

  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { initProvider } from './utils';

  import List from './pages/List.svelte';
  import Create from './pages/Create.svelte';
  import About from './pages/About.svelte';
  import Home from './pages/Home.svelte';
import PersonalGallery from './pages/PersonalGallery.svelte';
  
  
  let buttonDisplay = "Connect Web-Wallet";
  let mode = 'Mint';

  const app = writable({});
  export const innerHeight = writable(1000)
  export const innerWidth = writable(1000)
  setContext('app', app);


  // export let getAccounts = async () => {
  //   await $app.provider.send('eth_requestAccounts').then((res)=>{
  //       console.log(res); 
  //     $app.accounts = res.result[0]})
  // }

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
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Gallery
            </a>
            <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
              <span class="dropdown-item text-white " href="#" on:click={() => (mode = 'publicgallery')}>Public Gallery</span>
              <span class="dropdown-item text-white" href="#" on:click={() => (mode = 'mysculptures')}>My NFTs</span>
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
<svelte:window bind:innerWidth={$innerWidth} bind:innerHeight={$innerHeight}/>
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
    
</main>
