<script>
  import { onMount } from 'svelte';
  import Sandbox from '@beyondnft/sandbox';
  import App from '../App.svelte';
  import routes from '../routes';
  import router from "page";

  export let token;
  export let origin;

  let big = false;

  // load json
  // show image and title
  let image;
  let name;

  let data;
  let attributes;

  let view;
  const opensea_base = "https://opensea.io/assets/";
  let opensea = ""; 

  $: view && renderSandbox();

  function renderSandbox() {
    new Sandbox({
      target: view,
      props: {
        data,
      },
    });
  }

  onMount(async () => {
    console.log(token.contract);
    const res = await fetch(token.tokenURI);
    const json = await res.json();

    token.json = json;

    image = json.image;
    name = json.name;

    data = json;
    attributes = [];
    Object.keys(data.attributes).forEach((key) => {
      attributes.push({ key: data.attributes[key].trait_type, value: data.attributes[key].value });
    });

    var height = document.getElementsByClassName('list')[0].offsetHeight;
    document.getElementsByClassName('gallery-container')[0].style.maxHeight = height + 50 + "px";
    document.getElementsByClassName('list-container')[0].style.maxHeight = height + 50 + "px";

    document.getElementById('gallery-loading').style.height = "0px";


    opensea = opensea_base + String(token.contract).toLowerCase() + "/" + token.id;
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

  .preview img {
    width: 100%;
    height: auto;
  }

  .preview strong {
    flex: 0 0 auto;
    padding: 15px 10px;
    display: block;
  }

  article.big:hover {
    transform: none;
  }

  article.big .content {
    position: fixed;
    top: 50px;
    left: 50px;
    bottom: 50px;
    right: 50px;
    border: 1px solid black;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    background: white;
  }

  h2 {
    margin: 20px 0;
    color: black;
  }

  .close {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
  }

  .output {
    display: flex;
    flex-direction: row;
    flex: 1 1 0;
  }

  .render {
    width: 50%;
    flex: 0 0 auto;
  }

  .data {
    padding: 0 20px;
    text-align: left;
    flex: 1;
    color:black;
  }
  video {
  height: 230px;
  width: 100%;
  }
</style>
<article class:big>
    <div class="preview" on:click={() => router("/viewer/" + token.id + "/" + origin)}>
      <div><video autoplay muted loop src={image} alt={name} type='video/webm'></video></div>
      <strong>{name}</strong>
    </div>
</article>