<script> 
    export let shareURL = "Loading...";
</script>

<style>
	section {
		width: 200px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 16px;
		box-shadow: 2px 2px 4px #dedede;
		border: 1px solid #888;
		margin-bottom: 16px;
	}
</style>

<article>
    <div>GFYCat URL</div>
    <textarea readonly bind:value={shareURL}></textarea>
    <a href="https://gfycat.com/upload/">
    <img src="/gfycat-logo.svg" alt="Upload to GfyCat" />
    </a>
    Copy and Paste this text to Gfycat, then share whereever! 
</article>
