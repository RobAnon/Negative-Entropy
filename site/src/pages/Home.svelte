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


    const testResponse = '{"v":"0x1c","r":"0x04e06e017b9a9abc8af23fb6ff61f465a39f18d2409069e2f64d6b8f41036fc1","s":"0x4070df082c1d88d78d83478ca5ef41a5bf8bc4db94ec67232e799462d458e5d3","URI":"https://gateway.ipfs.io/ipfs/QmXWUg1FsnQkibsEysEzYYZ8LWXESyvZ2QL3V3bADE9ALK","seed":"Ganggang","hash":"0x1be559b4490f456930c734a2ac5f57fda20355ec8768d9f1b6047a1b71a96751","signature":{"message":"0xa8cf0372ad346bd30a053d6e429caa521ee8daf61fac05c03e166cd7fe9a9303","messageHash":"0x1be559b4490f456930c734a2ac5f57fda20355ec8768d9f1b6047a1b71a96751","v":"0x1c","r":"0x04e06e017b9a9abc8af23fb6ff61f465a39f18d2409069e2f64d6b8f41036fc1","s":"0x4070df082c1d88d78d83478ca5ef41a5bf8bc4db94ec67232e799462d458e5d3","signature":"0x04e06e017b9a9abc8af23fb6ff61f465a39f18d2409069e2f64d6b8f41036fc14070df082c1d88d78d83478ca5ef41a5bf8bc4db94ec67232e799462d458e5d31c"}}';    

    var test = JSON.parse(testResponse);
    console.log(test);

    const PRICE = await contract.methods.PRICE().call({from: $app.account});
    console.log("contract follows");
    console.log(contract);
    const price_act = $app.web3.utils.fromWei(PRICE);
    console.log("price is: " +price_act);

    const payment = await contract.methods.mint($app.account, test.v, test.r, test.s, test.URI, test.seed).send({from: $app.account, value: PRICE})
    dispatch('minted');
    console.log(payment);
    const uri = await contract.methods.tokenURI(0).call();
    console.log(uri);


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