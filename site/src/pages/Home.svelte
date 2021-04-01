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


    const testResponse = '{"v":"0x1c","r":"0x41187cde767afa7c2704c772ad52772475ce29c237c6309ee7a5a9227534c1d7","s":"0x47660c21af2a6c05545db5e39a7f64715341a316033978cb28fe72550e13f79b","URI":"https://gateway.ipfs.io/ipfs/QmcZHzGkvUkrksj3voHP8Y3AwL1FkQspAGRh3fpCsAJj7e","seed":"Negative Entropy","hash":"0x0a2386488a9470bfccf52266286726936a5da24636d9bcd330dfe1810ab46d50"}';    

    var test = JSON.parse(testResponse);
    console.log(test);

    const PRICE = await contract.methods.PRICE().call({from: $app.account});
    console.log("contract follows");
    console.log(contract);
    const price_act = $app.web3.utils.fromWei(PRICE);
    console.log("price is: " +price_act);

    //const payment = await contract.methods.mint($app.account, test.v, test.r, test.s, test.URI, test.seed, test.hash).send({from: $app.account, value: PRICE})
    //dispatch('minted');
  //  console.log(payment);


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