<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import {web3Loaded} from './store.js';  

  import { initProvider } from './utils';
  import {isEthAddress} from './utils';
  import {initGfy} from './utils';

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
  let buttonDisplay = "Connect Wallet";
  let mode = 'Home';
  let LIMIT = 1000;
  web3Loaded.useSessionStorage();
  //gfyToken.useSessionStorage();

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
  
  //initGfy(); We don't need this yet
  
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
          if(route.dynamic) {
            if(params.id != null) {
              var value = params.id;
              if (Number.isInteger(Number(value)) && value < LIMIT ){
                page= route.component;
              } else {
                page = route.component;
              }
            } 
          } else {
            page = route.component;
          }
        }
      });
  });

	router.start();

  //I THINK we can fix this with a promise
  async function connectEthProvider() {
    if(!app.contract) {
      await initProvider(app);
      buttonDisplay = String($app.account).slice(0,10)+"...";
      console.log($app.account);
    }
    //TODO: Else we will want it to show THEIR NFT's
  }

  function route(dest) {
    //Route to that page – workaround for broken links 
    router(dest);
  }


  function getGallery() {
    if($app.account) {
      return $app.account;
    } else {
      return "personal";
    }
  }
</script>

<style>

</style>

<header>	
  <a id="logo" href="/" onclick="window.scrollTo(window.scrollX, window.scrollY + 1)">
    <img src="/logo-main.png" alt="main logo">	
  </a>	
  <div class="navbar-links">	
    <div>	
      <a class="navbar-link" href="/">Home</a>    	
      <a class="navbar-link" href='/mint'>Mint</a> 

      <div class="navbar-link" id="gallery">	
        Gallery	
        <div class="navbar-dropdown-container">
          <a class="navbar-dropdown" id="navbar-dropdown-1" href="/gallery/0">Public Gallery</a>	
          <a class="navbar-dropdown" id="navbar-dropdown-2" href="/personal-gallery/{$app.account}">My NFTs</a>	
        </div>
      </div>	
      
      <a class="navbar-link" href='/about'>About</a>	
      <a class="navbar-link" href="/gallery/0">Public Gallery</a>	
      <a class="navbar-link" href="/personal-gallery/{$app.account}">My NFTs</a>	
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
</main>



<svelte:window bind:innerWidth={$innerWidth} bind:innerHeight={$innerHeight}/>

<footer>

  <div class="footer-icons-container">

    <a href="https://twitter.com/Negativ3Entropy" target="_blank">
      <xml version="1.0" encoding="iso-8859-1"></xml>
      <svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.271 511.271" style="enable-background:new 0 0 511.271 511.271;" xml:space="preserve">
      <g>
        <g>
          <path d="M508.342,94.243c-2.603-2.603-6.942-3.471-10.414-2.603l-17.356,6.075c10.414-12.149,17.356-25.166,21.695-37.315
            c1.736-4.339,0.868-7.81-1.736-10.414c-2.603-2.603-6.942-3.471-10.414-1.736c-24.298,10.414-45.125,19.092-62.481,24.298
            c0,0.868-0.868,0-1.736,0c-13.885-7.81-47.729-25.166-72.027-25.166c-61.614,0.868-111.078,52.936-111.078,116.285v3.471
            c-90.251-17.356-139.715-43.39-193.519-99.797L40.6,58.663l-5.207,10.414c-29.505,56.407-8.678,107.607,25.166,142.319
            c-15.62-2.603-26.034-7.81-35.58-15.62c-3.471-2.603-7.81-3.471-12.149-0.868c-3.471,1.736-5.207,6.942-4.339,11.281
            c12.149,40.786,42.522,73.763,75.498,93.722c-15.62,0-28.637-1.736-41.654-10.414c-3.471-1.736-8.678-1.736-12.149,0.868
            s-5.207,6.942-3.471,11.281c15.62,44.258,45.993,67.688,94.59,73.763c-25.166,14.753-58.142,26.902-109.342,27.77
            c-5.207,0-9.546,3.471-11.281,7.81c-1.736,5.207,0,9.546,3.471,13.017c31.241,25.166,100.664,39.919,186.576,39.919
            c152.732,0,277.695-136.244,277.695-303.729v-2.603c19.092-9.546,34.712-27.77,42.522-52.936
            C511.813,101.185,510.945,96.846,508.342,94.243z M456.274,143.707l-5.207,1.736v14.753
            c0,157.939-117.153,286.373-260.339,286.373c-78.97,0-131.905-13.017-160.542-26.902c59.878-4.339,94.59-23.431,121.492-44.258
            l21.695-15.62h-26.034c-49.464,0-79.837-13.885-97.193-46.861c15.62,5.207,32.108,5.207,50.332,4.339
            c6.942-0.868,13.885-0.868,20.827-0.868l2.603-17.356c-32.976-9.546-72.027-39.051-91.119-78.969
            c17.356,7.81,36.447,9.546,53.803,9.546h26.902L91.8,213.999c-18.224-13.017-72.027-59.01-45.993-124.963
            c55.539,54.671,108.475,79.837,203.932,97.193l10.414,1.736v-24.298c0-53.803,41.654-98.061,93.722-98.929
            c19.959-0.868,52.936,17.356,62.481,22.563c5.207,2.603,10.414,3.471,15.62,1.736c13.017-4.339,28.637-10.414,45.993-17.356
            c-7.81,13.017-18.224,25.166-32.108,36.448c-3.471,2.603-4.339,7.81-2.603,12.149c1.736,4.339,6.942,6.075,11.281,4.339
            l33.844-11.281C482.308,124.616,472.762,137.633,456.274,143.707z"/>
        </g>
      </g>
    </svg>
    </a>

    <a href="https://github.com/RobAnon/Negative-Entropy" target="_blank">
      <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
        <g>
          <g>
            <path d="M255.968,5.329C114.624,5.329,0,120.401,0,262.353c0,113.536,73.344,209.856,175.104,243.872
              c12.8,2.368,17.472-5.568,17.472-12.384c0-6.112-0.224-22.272-0.352-43.712c-71.2,15.52-86.24-34.464-86.24-34.464
              c-11.616-29.696-28.416-37.6-28.416-37.6c-23.264-15.936,1.728-15.616,1.728-15.616c25.696,1.824,39.2,26.496,39.2,26.496
              c22.848,39.264,59.936,27.936,74.528,21.344c2.304-16.608,8.928-27.936,16.256-34.368
              c-56.832-6.496-116.608-28.544-116.608-127.008c0-28.064,9.984-51.008,26.368-68.992c-2.656-6.496-11.424-32.64,2.496-68
              c0,0,21.504-6.912,70.4,26.336c20.416-5.696,42.304-8.544,64.096-8.64c21.728,0.128,43.648,2.944,64.096,8.672
              c48.864-33.248,70.336-26.336,70.336-26.336c13.952,35.392,5.184,61.504,2.56,68c16.416,17.984,26.304,40.928,26.304,68.992
              c0,98.72-59.84,120.448-116.864,126.816c9.184,7.936,17.376,23.616,17.376,47.584c0,34.368-0.32,62.08-0.32,70.496
              c0,6.88,4.608,14.88,17.6,12.352C438.72,472.145,512,375.857,512,262.353C512,120.401,397.376,5.329,255.968,5.329z"/>
          </g>
        </g>
      </svg>
    </a>

    <a href="https://discord.gg/KEm7URsrcN" target="_blank">
      <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 18.90625 7 C 18.90625 7 12.539063 7.4375 8.375 10.78125 C 8.355469 10.789063 8.332031 10.800781 8.3125 10.8125 C 7.589844 11.480469 7.046875 12.515625 6.375 14 C 5.703125 15.484375 4.992188 17.394531 4.34375 19.53125 C 3.050781 23.808594 2 29.058594 2 34 C 1.996094 34.175781 2.039063 34.347656 2.125 34.5 C 3.585938 37.066406 6.273438 38.617188 8.78125 39.59375 C 11.289063 40.570313 13.605469 40.960938 14.78125 41 C 15.113281 41.011719 15.429688 40.859375 15.625 40.59375 L 18.0625 37.21875 C 20.027344 37.683594 22.332031 38 25 38 C 27.667969 38 29.972656 37.683594 31.9375 37.21875 L 34.375 40.59375 C 34.570313 40.859375 34.886719 41.011719 35.21875 41 C 36.394531 40.960938 38.710938 40.570313 41.21875 39.59375 C 43.726563 38.617188 46.414063 37.066406 47.875 34.5 C 47.960938 34.347656 48.003906 34.175781 48 34 C 48 29.058594 46.949219 23.808594 45.65625 19.53125 C 45.007813 17.394531 44.296875 15.484375 43.625 14 C 42.953125 12.515625 42.410156 11.480469 41.6875 10.8125 C 41.667969 10.800781 41.644531 10.789063 41.625 10.78125 C 37.460938 7.4375 31.09375 7 31.09375 7 C 31.019531 6.992188 30.949219 6.992188 30.875 7 C 30.527344 7.046875 30.234375 7.273438 30.09375 7.59375 C 30.09375 7.59375 29.753906 8.339844 29.53125 9.40625 C 27.582031 9.09375 25.941406 9 25 9 C 24.058594 9 22.417969 9.09375 20.46875 9.40625 C 20.246094 8.339844 19.90625 7.59375 19.90625 7.59375 C 19.734375 7.203125 19.332031 6.964844 18.90625 7 Z M 18.28125 9.15625 C 18.355469 9.359375 18.40625 9.550781 18.46875 9.78125 C 16.214844 10.304688 13.746094 11.160156 11.4375 12.59375 C 11.074219 12.746094 10.835938 13.097656 10.824219 13.492188 C 10.816406 13.882813 11.039063 14.246094 11.390625 14.417969 C 11.746094 14.585938 12.167969 14.535156 12.46875 14.28125 C 17.101563 11.410156 22.996094 11 25 11 C 27.003906 11 32.898438 11.410156 37.53125 14.28125 C 37.832031 14.535156 38.253906 14.585938 38.609375 14.417969 C 38.960938 14.246094 39.183594 13.882813 39.175781 13.492188 C 39.164063 13.097656 38.925781 12.746094 38.5625 12.59375 C 36.253906 11.160156 33.785156 10.304688 31.53125 9.78125 C 31.59375 9.550781 31.644531 9.359375 31.71875 9.15625 C 32.859375 9.296875 37.292969 9.894531 40.3125 12.28125 C 40.507813 12.460938 41.1875 13.460938 41.8125 14.84375 C 42.4375 16.226563 43.09375 18.027344 43.71875 20.09375 C 44.9375 24.125 45.921875 29.097656 45.96875 33.65625 C 44.832031 35.496094 42.699219 36.863281 40.5 37.71875 C 38.5 38.496094 36.632813 38.84375 35.65625 38.9375 L 33.96875 36.65625 C 34.828125 36.378906 35.601563 36.078125 36.28125 35.78125 C 38.804688 34.671875 40.15625 33.5 40.15625 33.5 C 40.570313 33.128906 40.605469 32.492188 40.234375 32.078125 C 39.863281 31.664063 39.226563 31.628906 38.8125 32 C 38.8125 32 37.765625 32.957031 35.46875 33.96875 C 34.625 34.339844 33.601563 34.707031 32.4375 35.03125 C 32.167969 35 31.898438 35.078125 31.6875 35.25 C 29.824219 35.703125 27.609375 36 25 36 C 22.371094 36 20.152344 35.675781 18.28125 35.21875 C 18.070313 35.078125 17.8125 35.019531 17.5625 35.0625 C 16.394531 34.738281 15.378906 34.339844 14.53125 33.96875 C 12.234375 32.957031 11.1875 32 11.1875 32 C 10.960938 31.789063 10.648438 31.699219 10.34375 31.75 C 9.957031 31.808594 9.636719 32.085938 9.53125 32.464844 C 9.421875 32.839844 9.546875 33.246094 9.84375 33.5 C 9.84375 33.5 11.195313 34.671875 13.71875 35.78125 C 14.398438 36.078125 15.171875 36.378906 16.03125 36.65625 L 14.34375 38.9375 C 13.367188 38.84375 11.5 38.496094 9.5 37.71875 C 7.300781 36.863281 5.167969 35.496094 4.03125 33.65625 C 4.078125 29.097656 5.0625 24.125 6.28125 20.09375 C 6.90625 18.027344 7.5625 16.226563 8.1875 14.84375 C 8.8125 13.460938 9.492188 12.460938 9.6875 12.28125 C 12.707031 9.894531 17.140625 9.296875 18.28125 9.15625 Z M 18.5 21 C 15.949219 21 14 23.316406 14 26 C 14 28.683594 15.949219 31 18.5 31 C 21.050781 31 23 28.683594 23 26 C 23 23.316406 21.050781 21 18.5 21 Z M 31.5 21 C 28.949219 21 27 23.316406 27 26 C 27 28.683594 28.949219 31 31.5 31 C 34.050781 31 36 28.683594 36 26 C 36 23.316406 34.050781 21 31.5 21 Z M 18.5 23 C 19.816406 23 21 24.265625 21 26 C 21 27.734375 19.816406 29 18.5 29 C 17.183594 29 16 27.734375 16 26 C 16 24.265625 17.183594 23 18.5 23 Z M 31.5 23 C 32.816406 23 34 24.265625 34 26 C 34 27.734375 32.816406 29 31.5 29 C 30.183594 29 29 27.734375 29 26 C 29 24.265625 30.183594 23 31.5 23 Z"/></svg>
    </a>

  </div>

  <p>2021 Negative Entropy &copy;</p>

  <p><a href='/privacy'>Privacy</a></p>

</footer>
