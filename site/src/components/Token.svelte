<script>
  import { onMount } from 'svelte';
  import Sandbox from '@beyondnft/sandbox';
  import App from '../App.svelte';
  import routes from '../routes';
  import router from "page";
  import {quickJSON} from '../conf/quickview';

  export let origin;
  export let id;

  export let image = "https://gateway.ipfs.io/ipfs/QmULnqLrTuG9fAxCwctH89sjb7YRL4ig77JJ2Fn78X541j";
  export let name;


  $:image;
  $:name;

  onMount(() => {
    console.log("mounted a token");
    
    var height = document.getElementsByClassName('list')[0].offsetHeight;
    document.getElementsByClassName('gallery-container')[0].style.maxHeight = height + 50 + "px";
    document.getElementsByClassName('list-container')[0].style.maxHeight = height + 50 + "px";

    document.getElementById('gallery-loading').style.height = "0px";
    
  });
</script>

<style>
  article {
    width: 230px;
    height: 300px;
    border: 1px solid black;
    border-radius: 4px;
    transition: all 0.4s;
  }

  article:hover {
    box-shadow: 0px 0px 6px 3px rgb(0, 0, 0, 0.4);
    transform: scale(1.02);
  }

  .preview {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .preview div {
    flex: 1 1 0;
    width: 100%;
    overflow: hidden;
  }

 

  .preview strong {
    flex: 0 0 auto;
    padding: 15px 10px;
    display: block;
  }

  
  video {
  height: 230px;
  width: 100%;
  }
</style>
<article>
    <div class="preview" on:click={() => router("/viewer/" + id + "/" + origin)}>
      <div><video autoplay muted loop src={image} alt={name} type='video/webm'></video></div>
      <strong>{name}</strong>
      <h1>HELLO</h1>
    </div>
</article>