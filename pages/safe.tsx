import styles from '@styles/Home.module.css';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import SafeInfo from '@components/SafeInfo';
import {
  Container,
  Text,
  Input,
  Divider,
  Button,
  VStack,
  Box,
  Link,
  Spinner,
} from '@chakra-ui/react';
import { Account } from '@components/Account';
import { useState } from 'react';
import { NextPage } from 'next';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useRouter } from 'next/router';

const stringToBytes = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

const proof = {
  pi_a: [
    '19874825383077812647631125174537581566554964417654758313953584834934798584200',
    '16107705209059983429796318756906081557596541682921753104246819074489594511970',
    '1',
  ],
  pi_b: [
    [
      '10952414661221643317794879946203147371491338419175746640982633263107865008348',
      '7772579186305555243866162058768391171273003668203897330489404094087170223590',
    ],
    [
      '11040879804053659874883366974251681797452007060461988261985700931843709633990',
      '7809636291358348888951380297099512908559903452956515045568385758710223247837',
    ],
    ['1', '0'],
  ],
  pi_c: [
    '12618272967566520018121761429605157061820783755081505365479193031723609000051',
    '16050655015181911308240735863972019124333894887220094541695998884041609015649',
    '1',
  ],
  protocol: 'groth16',
  curve: 'bn128',
};

const vkey = {
  protocol: 'groth16',
  curve: 'bn128',
  nPublic: 2,
  vk_alpha_1: [
    '20491192805390485299153009773594534940189261866228447918068658471970481763042',
    '9383485363053290200918347156157836566562967994039712273449902621266178545958',
    '1',
  ],
  vk_beta_2: [
    [
      '6375614351688725206403948262868962793625744043794305715222011528459656738731',
      '4252822878758300859123897981450591353533073413197771768651442665752259397132',
    ],
    [
      '10505242626370262277552901082094356697409835680220590971873171140371331206856',
      '21847035105528745403288232691147584728191162732299865338377159692350059136679',
    ],
    ['1', '0'],
  ],
  vk_gamma_2: [
    [
      '10857046999023057135944570762232829481370756359578518086990519993285655852781',
      '11559732032986387107991004021392285783925812861821192530917403151452391805634',
    ],
    [
      '8495653923123431417604973247489272438418190587263600148770280649306958101930',
      '4082367875863433681332203403145435568316851327593401208105741076214120093531',
    ],
    ['1', '0'],
  ],
  vk_delta_2: [
    [
      '10857046999023057135944570762232829481370756359578518086990519993285655852781',
      '11559732032986387107991004021392285783925812861821192530917403151452391805634',
    ],
    [
      '8495653923123431417604973247489272438418190587263600148770280649306958101930',
      '4082367875863433681332203403145435568316851327593401208105741076214120093531',
    ],
    ['1', '0'],
  ],
  vk_alphabeta_12: [
    [
      [
        '2029413683389138792403550203267699914886160938906632433982220835551125967885',
        '21072700047562757817161031222997517981543347628379360635925549008442030252106',
      ],
      [
        '5940354580057074848093997050200682056184807770593307860589430076672439820312',
        '12156638873931618554171829126792193045421052652279363021382169897324752428276',
      ],
      [
        '7898200236362823042373859371574133993780991612861777490112507062703164551277',
        '7074218545237549455313236346927434013100842096812539264420499035217050630853',
      ],
    ],
    [
      [
        '7077479683546002997211712695946002074877511277312570035766170199895071832130',
        '10093483419865920389913245021038182291233451549023025229112148274109565435465',
      ],
      [
        '4595479056700221319381530156280926371456704509942304414423590385166031118820',
        '19831328484489333784475432780421641293929726139240675179672856274388269393268',
      ],
      [
        '11934129596455521040620786944827826205713621633706285934057045369193958244500',
        '8037395052364110730298837004334506829870972346962140206007064471173334027475',
      ],
    ],
  ],
  IC: [
    [
      '6819801395408938350212900248749732364821477541620635511814266536599629892365',
      '9092252330033992554755034971584864587974280972948086568597554018278609861372',
      '1',
    ],
    [
      '2494923446058214646639418591712156421366388762181821637289531085843728324281',
      '5725178132428480568821403146496952551332721127066178100464798546821141271312',
      '1',
    ],
    [
      '2949088342211450078770029559615904525423143982944239450257777566971809628121',
      '14382936099891824927341970188446629554258856083543365916396703111259580806134',
      '1',
    ],
  ],
};

const publicSignals = ['3', '7'];

const Safe: NextPage = () => {
  const router = useRouter();
  //const isHydrated = useIsHydrated()
  const [txSig, setTxSig] = useState<string>('');
  const [verified, setVerified] = useState<Boolean>(false);

  /*
  address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,bytes signatures
  */
  const handleProof = async () => {
    const worker_v = new Worker('./worker-verify.js');
    worker_v.postMessage([vkey, proof, publicSignals]);
    worker_v.onmessage = async function (e) {
      setVerified(e.data);
    };
  };

  const { config } = usePrepareContractWrite({
    // redo this config
    address: '0xf2d48C7F6ff69b487f277BC011D853577c3880eb',
    abi: [
      {
        name: 'execTransaction',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          {
            to: '0000000000000000000000008a64e0b0506294ebb1ae2119d9f500dfb867033c',
            signatures: stringToBytes(txSig),
          },
        ],
        outputs: [],
      },
    ],
    functionName: 'execTransaction',
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      <Button variant='ghost' onClick={() => router.push('/')}>
        Go back
      </Button>
      <Container textAlign='center' py={10} px={10} maxW='1200px'>
        <Text as='h1'>The Safe</Text>
        <Text>
          Safe with Accountable Threshold Signatures with Proactive Refresh
        </Text>
        <Account />
        <Divider m={4} />
        <VStack gap={4}>
          <Text as='h3'>Provide collective signature</Text>
          <Input
            placeholder='Collective signature'
            value={txSig}
            onChange={(e) => setTxSig(e.target.value)}
            size='lg'
          />
          <Button
            disabled={!write}
            onClick={() => write?.()}
            colorScheme='teal'
            background='teal.800'
          >
            Verify Signatures
          </Button>
          {isLoading && (
            <Box>
              Verifying BLS signature on chain!
              <Spinner />
              See on{' '}
              <Link href={`https://etherscan.io/tx/${data?.hash}`}>
                Etherscan
              </Link>
            </Box>
          )}
          {isSuccess && (
            <Box>
              Successfully verified BLS signature!
              <br />
              See on{' '}
              <Link href={`https://etherscan.io/tx/${data?.hash}`}>
                Etherscan
              </Link>
            </Box>
          )}

          <Button onClick={() => handleProof()}>
            Prove BLS signature using ZK
          </Button>

          <Box width={650}>
            <>
              <Text fontWeight={500} color={'#aebdfa'}>
                Status: {verified ? 'Verified!' : 'Not yet verified'}
              </Text>
              {verified ?? (
                <Text>
                  Verified means that the BLS signature could not be faked using
                  the magical power of ZK!
                </Text>
              )}
              <Text fontSize={10} color='lightgray'>
                Pre-generated Proof: {JSON.stringify(proof)}
              </Text>
            </>
          </Box>
        </VStack>
      </Container>
    </>
  );
};
export default Safe;
