const snarkjs = require('snarkjs');
const fs = require('fs');

async function run() {
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    {
      x1: '13',
      x2: '7',
      x3: '4',
      x4: '2',
    },
    'dummy.wasm',
    'dummy.zkey'
  );

  console.log(publicSignals);
  console.log(JSON.stringify(publicSignals));

  const vKey = JSON.parse(fs.readFileSync('verification_key.json'));

  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

  if (res === true) {
    console.log('Verification OK');
  } else {
    console.log('Invalid proof');
  }
}

run().then(() => {
  process.exit(0);
});
