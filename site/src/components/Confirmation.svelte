
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        border-radius: 4px;
        background: #111;
        z-index:1000;
        padding: 20px;
        width: 950px;
        max-width: calc(100% - 40px);
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
        height:300px;
        width:auto;
    }

    .accept-reject-buttons {
        width: max-content;
        margin: 0 auto;
    }
  
    .accept-reject-buttons button:nth-of-type(1) {
        margin-right: 20px;
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
            <br> <p id="confirm-text">Please confirm the look of your webm preview. This will appear on OpenSea and in our gallery as the preview video for your NFT – if it is not to your liking, press reject, and you can record again. It should be animated.</p>  
            <br>
            <div class="accept-reject-buttons">
                <button class="button-secondary" id="reject" on:click={rejected}>Reject</button>    
                <button class="button-main" id="accept" on:click={accepted}>Accept</button>
            </div>
        </div>
    </div>
    {/if}
</article>