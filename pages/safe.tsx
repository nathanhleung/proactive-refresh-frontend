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
import { BigNumber } from 'ethers';
import gnosisSafeJson from 'data/abis/GnosisSafe.json';

const stringToBytes = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

const Safe: NextPage = () => {
  const router = useRouter();
  //const isHydrated = useIsHydrated()
  const [txSig, setTxSig] = useState<string>('');

  /*
  address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,bytes signatures
  */

  const { config } = usePrepareContractWrite({
    // redo this config
    address: '0x8a64e0b0506294ebb1ae2119d9f500dfb867033c',
    abi: gnosisSafeJson.abi,
    functionName: 'execTransaction',
    args: [
      '0x8a64e0b0506294ebb1ae2119d9f500dfb867033c',
      BigNumber.from(10000000),
      '0x00',
      0,
      BigNumber.from(0),
      BigNumber.from(20000000),
      BigNumber.from(60000000000),
      "0x0000000000000000000000000000000000000000",
      '0x8a64E0b0506294EbB1Ae2119d9F500dfb867033c',
      '0x000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002600000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
      // signatures: stringToBytes(txSig),
    ],
  });

  const { data, write  } = useContractWrite(config);

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
            disabled={!write || isLoading}
            onClick={() => write?.()}
            colorScheme='teal'
            background='teal.800'
          >
            {isLoading ? "Loading..." : "Verify Signatures"}
          </Button>
          {isLoading && (
            <Box>
              Verifying BLS signature!
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
        </VStack>
      </Container>
    </>
  );
};
export default Safe;
