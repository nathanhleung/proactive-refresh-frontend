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
} from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Box minH='100vh' justifyContent='space-between'>
          <Box fontSize={60} width='100%'>
            proactive refresh
            <Divider py={2} />
            Enterprise-grade custody and authentication.
            <Text fontSize={24} fontWeight={300} pt={2}>
              The safest and most secure way to transfer funds, sign messages,
              and protect what&apos;s most important to your organization.{' '}
              Enabled by <></>Accountable Threshold Signatures with Proactive
              Refresh.
            </Text>
          </Box>
          <HStack gap={3} fontSize={20} justifyContent='center' py={8}>
            <Text>
              Read the paper{' '}
              <ExternalLink
                href='https://eprint.iacr.org/2022/1656.pdf'
                target='_blank'
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
              >
                code
              </ExternalLink>
              .
            </Text>
            <Text>
              Frontend source{' '}
              <ExternalLink href='https://github.com/nathanhleung/ats-pr-bls-frontend'>
                code
              </ExternalLink>
              .
            </Text>
          </HStack>
          <Center>
            <Link href='/vault'>
              <Box
                borderRadius={10}
                backgroundColor='rgb(2,0,36)'
                background='radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,121,91,1) 35%, rgba(9,124,118,1) 66%, rgba(0,212,255,1) 100%)'
                width={'60%'}
                height={80}
              >
                <Center height='100%'>
                  <Text fontSize={40} fontWeight='extrabold'>
                    {`Enter the vault ->`}
                  </Text>
                </Center>
              </Box>
            </Link>
          </Center>
        </Box>
        <Box pt={10}>
          <Text fontSize={20}>
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
