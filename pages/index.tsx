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
  keyframes,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';

const font = Inter({ subsets: ['latin'], weight: '400' });
const headerFont = Inter({ subsets: ['latin'], weight: '600' });

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Box minH='100vh' justifyContent='space-between' maxW='1000px'>
          <Box minH='60vh' justifyContent='space-between'>
            <Box fontSize={60} width='100%'>
              <Text className={headerFont.className} color={'#aebdfa'}>
                proactive refresh
              </Text>
              <Divider py={2} />
              <Text fontSize={40}>
                Enterprise-grade custody and authentication.
              </Text>
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
            </HStack>
            <Center>
              <HStack gap={2}>
                <Button
                  padding='1em 1.2em'
                  height='70px'
                  border-radius='0.375em'
                  cursor='pointer'
                  color='white'
                  background='linear-gradient(-40deg, rgba(2,0,36,1), rgba(9,121,91,1), rgba(9,124,118,1), rgba(0,212,255,1))'
                  background-size='400% 400%'
                  transition='0.3s'
                  onClick={() => router.push('/vault')}
                  _hover={{ opacity: '0.9' }}
                >
                  <Text fontSize={20} fontWeight='bold'>
                    {`Enter the vault`}
                  </Text>
                </Button>
                <Button
                  padding='1em 1.2em'
                  height='70px'
                  border-radius='0.375em'
                  cursor='pointer'
                  color='white'
                  background='linear-gradient(-40deg, orange, red, magenta, yellow)'
                  background-size='400% 400%'
                  transition='0.3s'
                  onClick={() => router.push('/safe')}
                  _hover={{ opacity: '0.9' }}
                >
                  <Text fontSize={20} fontWeight='bold'>
                    {`Enter the safe`}
                  </Text>
                </Button>
              </HStack>
            </Center>
          </Box>
          <Box pt={4}>
            <Text
              fontSize={24}
              fontWeight={600}
              paddingBottom={2}
              color={'#bfcbfb'}
            >
              About the Cryptography
            </Text>
            <Text fontSize={18} color='lightgrays'>
              Accountable Threshold Signatures with Proactive Refresh were first
              described by Dan Boneh, cryptography researcher and professor at
              Stanford University. It is a way for a quorum of members of an
              organization to securely sign messages. Unlike previous secret
              sharing schemes, the scheme we implement refreshes signers&apos;
              secrets once every 30 seconds, ensuring that an adversary must
              compromise all signers&apos; keys within a 30-second window in
              order to mount a successful attack. This is significantly more
              secure than previous signature schemes.
            </Text>
          </Box>
        </Box>
      </main>
    </div>
  );
}
