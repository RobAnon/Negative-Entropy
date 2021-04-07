<script> 
    export let shareURL = "Loading...";
    export let close = () => {};
</script>

<style>
	article {
		position: fixed;
        top: 40%;
        left: 35%;
        bottom: 40%;
        right: 35%;
        border: 1px solid black;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        background: #111;
        z-index:1000;
        text-align: center;
	}

    #gclogo {
        display: block;
        max-width:230px;
        max-height:36px;
        width: auto;
        height: auto;

    }
</style>

<article>
    <div>GFYCat URL</div>
    <textarea readonly bind:value={shareURL}></textarea>
    <a href="https://gfycat.com/upload/">
    <img id="gclogo" src="/gfycat-logo.svg" alt="Upload to GfyCat" />
    </a>
    Copy and Paste this text to Gfycat, then share whereever! 

    <button on:click={close}>Click to open Window</button>
</article>
