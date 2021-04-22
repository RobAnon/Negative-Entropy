<script>

import { exits } from "page";
import {onMount} from 'svelte';

onMount(function() {
    window.scrollTo(window.scrollX, 0);
	window.scrollTo(window.scrollX, 2);
});

</script>
<section>
    <div class="fade-in fade-in-1 error-404-container">
        <h1>Error <b>404</b>. Page doesn't exist...</h1>
    </div>
</section>


<div class="section-break section-break-final"></div>