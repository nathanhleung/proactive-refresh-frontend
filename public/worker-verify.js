importScripts('./snarkjs.min.js');
self.addEventListener('message', async (evt) => {
  console.log('web worker recieved message');
  const [vkey, proof, publicSignals] = evt.data;
  const proofVerified = await snarkjs.groth16.verify(
    vkey,
    publicSignals,
    proof
  );
  console.log('🚀 ~ proofVerified', proofVerified);
  postMessage(proofVerified);
});
