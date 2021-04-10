<script>
  import { afterUpdate, onMount } from 'svelte';
  import Sandbox from '@beyondnft/sandbox';
  import App from '../App.svelte';
  import routes from '../routes';
  import router from "page";
  import {quickJSON} from '../conf/quickview';
  import { Moon } from 'svelte-loading-spinners';

  export let origin;
  export let id;

  export let image;
  export let name;


  $:image;
  $:name; 

  afterUpdate(() => {
    console.log(image);
    if (image !== "") {
      console.log(document.querySelector( '[src="' + image + '"]' ).parentElement.nextElementSibling.style.display = "none");
    }
  })

  onMount(() => {
    
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
    position: relative;
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
    position: relative;
  }

  .preview .moon-container {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: var(--xgrey);
  }
  .preview .moon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--xgrey);
    overflow: hidden;
    height: 100%;
    position: relative;
    top: -20px;
  }


  .preview strong {
    background-color: var(--xblack);
  }

  
  video {
  height: 230px;
  width: 100%;
  }
</style>
<article>
    <div class="preview" on:click={() => router("/viewer/" + id + "/" + origin)}>
      <div><video autoplay muted loop src={image} alt={name} type='video/webm'></video></div>
      <div class="moon-container">
        <div class="moon">
          <Moon size="75" color="#FFFFFF" unit="px" duration="3s"></Moon>
        </div>
      </div>
      <strong>{name}</strong>
    </div>
</article>