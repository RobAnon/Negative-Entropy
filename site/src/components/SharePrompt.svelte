<script> 
    export let shareURL = "Loading...";
    export let close = () => {};

    var copyText = function() {
        var text = document.getElementById('gfycat-url');
        text.select();
        text.setSelectionRange(0, 99999);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();

        var copyMessage = document.getElementById('copy-message');
        copyMessage.style.display = "block";

        setTimeout(function() {
            copyMessage.style.display = "none";
        }, 2000);
    }
</script>

<style>
	.gfycat-popup {
		position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        border-radius: 4px;
        background: var(--xgrey);
        z-index: 1000;
        text-align: center;
        padding: 0px 20px 20px;
	}

    .gfycat-inner {
        position: relative;
    }
    .gfycat-inner button {
        position: absolute;
        top: 15px;
        right: 0px;
        background: none;
        color: white;
        outline: none;
        border: none;
        font-size: 22px;
    }

    .gfycat-popup-header {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .gfycat-popup-header button:hover {
        color: var(--xgreen);
    }

    .gfycat-popup img {
        margin: 0 auto;
    }

    #gclogo {
        display: block;
        max-width: 230px;
        max-height: 36px;
        width: auto;
        height: auto;
    }

    .url {
        position: relative;
        display: flex;
        align-items: center;
        position: relative;
    }

    .url textarea {
        flex-grow: 1;
        outline: none;
        background-color: var(--xgrey);
        color: var(--xwhite);
        padding: 10px;
        font-family: 'roboto mono';
        font-weight: 200;
    }
    .url svg {
        fill: white;
        height: 25px;
        width: 25px;
        margin-left: 15px;
        cursor: pointer;
    }
    .url svg:hover {
        fill: var(--xgreen);
    }
    
    .url #copy-message {
        position: absolute;
        right: 15px;
        top: 25px;
        background-color: var(--xblack);
        border: 1px solid var(--xwhite);
        display: none;
        z-index: 99999;
    }
    .url #copy-message p {
        font-size: 16px;
    }
    
</style>

<div class="gfycat-popup">
    <div class="gfycat-inner">
        <div class="gfycat-popup-header">
            <p>GFYCat URL</p>
            <button on:click={close}>x</button>
        </div>
        <div class="url">
            <textarea id="gfycat-url" readonly bind:value={shareURL}></textarea>
            <svg on:click={copyText} id="Layer_2" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="m16.5 24h-13c-1.378 0-2.5-1.122-2.5-2.5v-14c0-1.378 1.122-2.5 2.5-2.5h1c.276 0 .5.224.5.5s-.224.5-.5.5h-1c-.827 0-1.5.673-1.5 1.5v14c0 .827.673 1.5 1.5 1.5h13c.827 0 1.5-.673 1.5-1.5v-1c0-.276.224-.5.5-.5s.5.224.5.5v1c0 1.378-1.122 2.5-2.5 2.5z"/></g><g><path d="m20.5 18h-11c-1.378 0-2.5-1.122-2.5-2.5v-13c0-1.378 1.122-2.5 2.5-2.5h11c1.378 0 2.5 1.122 2.5 2.5v13c0 1.378-1.122 2.5-2.5 2.5zm-11-17c-.827 0-1.5.673-1.5 1.5v13c0 .827.673 1.5 1.5 1.5h11c.827 0 1.5-.673 1.5-1.5v-13c0-.827-.673-1.5-1.5-1.5z"/>
                </g>
            </svg>
        <div id="copy-message"><p style="margin: 5px">Copied!</p></div>
        </div>
        <p>Copy and Paste this text to Gfycat, then share whereever!</p>
        <a href="https://gfycat.com/upload/" target="_blank">
            <img id="gclogo" src="/gfycat-logo.svg" alt="Upload to GfyCat" />
        </a>
    </div>
</div>
