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

    if (image !== "") {
      document.querySelector( '[src="' + image + '"]' ).parentElement.nextElementSibling.style.display = "none";
    } else {
      var els = document.getElementsByClassName('moon-container');
      for (let el of els) {
        el.style.display = 'block';
      }
    }
  })

</script>

<style>
  article {
    height: 385px;
    border: 1px solid black;
    border-radius: 4px;
    transition: all 0.4s;
  }

  @media only screen and (max-width: 550px) {
    article {
      display: block;
      margin: 50px auto;
    }
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
    top: -30px;
  }


  .preview strong {
    background-color: var(--xblack);
    display: block;
    height: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-top: 45px;
  }

  .preview > div {
    height: 100%;
    width: 100%;
  }
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
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