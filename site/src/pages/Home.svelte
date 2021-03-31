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


    const testResponse = '{"v":"0x1b","r":"0x2843d691021037dfd6f04f5da2f70f67fc7580463396e6c22c429b92ee6d09e8","s":"0x7b74f24654e985cd546ab15db8658f0cc506006d479ea03a6754d25cd8054b2b","seed":"Negative Entropy","customer":"0x4cFA5768Ca9567B922052A61FcFbd31f8d828FA1","URI":"https://gateway.ipfs.io/ipfs/QmcZHzGkvUkrksj3voHP8Y3AwL1FkQspAGRh3fpCsAJj7e"}';
    const test = JSON.parse(testResponse);    

    const PRICE = await contract.methods.PRICE().call();
    const price_act = $app.web3.utils.fromWei(PRICE);
    console.log("price is: " +price_act);

    const payment = await contract.methods.mint($app.account, test.v, test.r, test.s, test.URI, test.seed).send({from: $app.account, value: PRICE})
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