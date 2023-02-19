import styles from '@styles/Home.module.css';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import SafeInfo from '@components/SafeInfo';
import { Container, Text, Input, Divider, Button } from '@chakra-ui/react';
import { Account } from '@components/Account';
import { useState } from 'react';
import useIsHydrated from '@hooks/useIsHydrated';
import { NextPage } from 'next';

const stringToBytes = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str)
}

const callContract = (signatures: string) => {
  const sigs = stringToBytes(signatures)
  
}

const Safe: NextPage = () => {
  //const isHydrated = useIsHydrated()
  const [txValue, setTxValue] =  useState('')

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
            value={txValue}
            onChange={e => setTxValue(e.target.value)}
            size='lg'
          />
        <Button>
          Verify Signatures
        </Button>
      </Container>

      
      </Head>
      
    </>
  );
}
export default Safe;
