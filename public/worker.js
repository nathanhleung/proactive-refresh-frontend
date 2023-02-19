importScripts('./snarkjs.min.js');
self.addEventListener('message', async (evt) => {
  const [zkeyDb] = evt.data;
  const zkeyRawData = new Uint8Array(zkeyDb);
  console.log(zkeyRawData);
  const zkeyFastFile = { type: 'mem', data: zkeyRawData };
  const result = await snarkjs.groth16.fullProve(
    {
      x1: '13',
      x2: '7',
      x3: '4',
      x4: '2',
    },
    '/dummy.wasm',
    zkeyFastFile
  );
  console.log(result);
  postMessage(result);
});
