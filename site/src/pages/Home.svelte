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


    const testResponse = '{"v":"0x1b","r":"0x45bca04d36dc4f55ac454c5747b18f514201edfd4598cc060edf53d537c97211","s":"0x0120af74b23d647467c52f10662d8d8360ae8d7b06bc8471272d1793ef781545","URI":"https://gateway.ipfs.io/ipfs/QmcZHzGkvUkrksj3voHP8Y3AwL1FkQspAGRh3fpCsAJj7e","hash":"0xa2caa15cc8e152bb7a5b0b001c070a1b61b5121bca0fce55f4fba508da4b1de1"}';    

    var test = JSON.parse(testResponse);

    const PRICE = await contract.methods.PRICE().call();
    const price_act = $app.web3.utils.fromWei(PRICE);
    console.log("price is: " +price_act);

    const payment = await contract.methods.mint($app.account, test.v, test.r, test.s, test.URI, test.seed, test.hash).send({from: $app.account, value: PRICE})
    dispatch('minted');
    console.log(payment);



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