import styles from '@styles/Home.module.css';
import {
  Heading,
  Text,
  Container,
  Divider,
  Link as ExternalLink,
  Box,
  VStack,
  HStack,
  Center,
  Button,
  keyframes
} from '@chakra-ui/react';
import Link from 'next/link';
import { Inter } from '@next/font/google'

const font = Inter({ subsets: ['latin'], weight: '400'})
const headerFont = Inter({ subsets: ['latin'], weight: '600'})

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Box minH='100vh' justifyContent='space-between'>
          <Box fontSize={60} width='100%'>
            <Text className={headerFont.className} color={'#aebdfa'}>proactive refresh</Text>
            <Divider py={2}/>
            <Text fontSize={40}>Enterprise-grade custody and authentication.</Text>
            <Text fontSize={20} fontWeight={300} pt={2}>
              The safest and most secure way to transfer funds, sign messages,
              and protect what&apos;s most important to your organization.{' '}
              Enabled by <></>Accountable Threshold Signatures with Proactive
              Refresh.
            </Text>
          </Box>
          <HStack gap={3} fontSize={20} justifyContent='center' py={8}>
            <Text className={font.className}>
              Read the paper{' '}
              <ExternalLink
                href='https://eprint.iacr.org/2022/1656.pdf'
                target='_blank'
                color={'#ced7fc'}
              >
                here
              </ExternalLink>
              .
            </Text>
            <Text>
              Library source{' '}
              <ExternalLink
                href='https://github.com/lyronctk/ats-pr-bls'
                target='_blank'
                color={'#ced7fc'}
              >
                code
              </ExternalLink>
              .
            </Text>
            <Text>
              Frontend source{' '}
              <ExternalLink 
              href='https://github.com/nathanhleung/ats-pr-bls-frontend'
              color={'#ced7fc'}>
                code
              </ExternalLink>
              .
            </Text>
          </HStack>
          <Center>
            <Button padding= '0.6em 1.2em'
              border-radius= '0.375em'
              cursor='pointer'
              color= 'white'
              background= 'linear-gradient(-45deg, #647DEE,#7F53AC)'
              background-size='400% 400%'
              transition= '0.3s'
              onClick={() => location.href ='/vault'}
              _hover={{opacity: '0.9'}}
              >
              <Text fontSize={19} fontWeight='500'>
                {`Enter the vault`}
              </Text>
            </Button>
          </Center>
        </Box>
        <Box pt={4}>
          <Text fontSize={24} 
          fontWeight={600}
          paddingBottom={2}
          color={'#bfcbfb'}>About the Cryptography</Text>
          <Text fontSize={18} color='lightgrays'>
            Accountable Threshold Signatures with Proactive Refresh were first
            described by Dan Boneh, cryptography researcher and professor at
            Stanford University. It is a way for a quorum of members of an
            organization to securely sign messages. Unlike previous secret
            sharing schemes, the scheme we implement refreshes signers&apos;
            secrets once every 30 seconds, ensuring that an adversary must
            compromise all signers&apos; keys within a 30-second window in order
            to mount a successful attack. This is significantly more secure than
            previous signature schemes.
          </Text>
        </Box>
      </main>
    </div>
  );
}
