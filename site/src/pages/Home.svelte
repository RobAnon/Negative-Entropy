<script>
  import { getContext } from 'svelte';
  import Token from '../components/Token.svelte';

  let tokens = [];
  let totalTokens = 0;
  let contract;
  const app = getContext('app');
  $: $app.contract && !contract && getTokens();

async function getTokens() {
    contract = $app.contract;

    // feels like the best way to do it in the browser when there are only few items
    const nombre = await contract.methods.name().call();
    console.log(nombre);
    const address = contract.address;

    /*
    let _totalTokens = totalTokens;
    for (const event of events) {
      const values = event.returnValues;
      const _from = values.from;
      const _to = values.to;
      const tokenId = values.tokenId;

      if (_from === '0x0000000000000000000000000000000000000000') {
        const tokenURI = await contract.methods.tokenURI(tokenId).call();
     */
}



</script>


<style>




</style>



<section>
    
<body>
Text Goes Here
</body>



</section>