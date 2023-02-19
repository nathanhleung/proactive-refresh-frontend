import styles from '@styles/Home.module.css';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import SafeInfo from '@components/SafeInfo';
import { Container, Text, Input, Divider, Button } from '@chakra-ui/react';
import { Account } from '@components/Account';
import { useState } from 'react';
import useIsHydrated from '@hooks/useIsHydrated';
import { NextPage } from 'next';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'


const stringToBytes = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str)
}

const Safe: NextPage = () => {
  //const isHydrated = useIsHydrated()
  const [txSigs, setTxSigs] =  useState('')

  /*
  address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,bytes signatures
  */

  const { config } = usePrepareContractWrite({
    // redo this config
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'execTransaction',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          {
            to: '0000000000000000000000008a64e0b0506294ebb1ae2119d9f500dfb867033c',

            signatures: stringToBytes(txSigs),

          }
        ],
        outputs: [],
      },
    ],
    functionName: 'execTransaction',
  })

  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <>
      {<Account/>}
      <Head>
      <Container textAlign='center' py={10} px={10} maxW='1200px'>
        <Text>The Safe</Text>
        Safe with Accountable Threshold Signatures with Proactive Refresh
        
        <Divider></Divider>

        Add Signatures
        <Input
            placeholder="Add Signatures"
            value={txSigs}
            onChange={e => setTxSigs(e.target.value)}
            size='lg'
          />
        <Button
        disabled={!write}
        onClick={() => write?.()}>
          Verify Signatures
        </Button>

        <div>
          Successfully verified BLS signature!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      </Container>
      </Head>
    </>
  );
}
export default Safe;
