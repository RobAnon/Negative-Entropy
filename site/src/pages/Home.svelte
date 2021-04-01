<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  const app = getContext('app');
  $: $app.contract && !contract && getTokens();

  //Testing function
  async function getTokens() {
      contract = $app.contract;
  }



</script>


<style>




</style>



<section>
    
<body>
Text Goes Here
</body>



</section>