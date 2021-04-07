
<script>
    export let webmURL = "https://gateway.ipfs.io/ipfs/QmULnqLrTuG9fAxCwctH89sjb7YRL4ig77JJ2Fn78X541j";
    export let prompt = true;
    export let accepted = () => {};
    export let rejected = () => {};

$: webmURL
</script>

<style>

    article.prompt:hover {
        transform: none;
    }

    article.prompt .content {
        position: fixed;
        top: 7%;
        left: 20%;
        bottom: 7%;
        right: 20%;
        border: 1px solid black;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        background: #111;
        z-index:1000;
        text-align: center;
    }

    #confirm-header{
        margin: 10px;
        font-size:24px;
    }

    .output {
    display: inline-block;
    }

    #confirm-text {
        margin-top: 20px;
        margin-right: 10px;
        margin-left:10px;
        font-size: 14px;
        text-align: center;
    }

    #preview-vid {
        height:50%;
        width:auto;
    }
  

</style>

<article class:prompt>
	{#if !prompt}
    <span></span>
    {:else}
    <div class="content">
        <h3><p id="confirm-header">Accept or Reject your NFT Preview Image</p></h3>
        <div class="output">
            <video id="preview-vid" autoplay muted loop src={webmURL} alt="a vidya" type='video/webm'></video>
            <br> <p id="confirm-text">Please confirm the look of your webm preview. This will appear on OpenSea and in our gallery as the preview image for your NFT – if it is not to your liking, press reject, and you can record again.</p>  
            <br>
            <div class="mint-buttons" >
            <button class="button-secondary" id="accept" on:click={accepted}>Accept</button>
            <button class="button-secondary" id="reject" on:click={rejected}>Reject</button>    
        </div>
        </div>
    </div>
    {/if}
</article>