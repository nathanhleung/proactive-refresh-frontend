import styles from "@styles/Home.module.css";
import { Heading, Text, Container, Divider, Link, Box, VStack, HStack } from '@chakra-ui/react'

export default function Home() {

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Box minH="60vh" justifyContent="space-between">
          <Box fontSize={60} width="100%">
            proactive refresh
            <Divider py={2} />
            Enterprise-grade custody and authentication.
            <Text fontSize={24} fontWeight={300} pt={2}>
              The safest and most secure way to transfer funds, sign messages,
              and protect what&apos;s most important to your organization.
            </Text>
          </Box>
          <Box
            pt={10}
          >
            <Text
              fontWeight={600}
              fontSize={24}>
              Enabled by <></>Accountable Threshold Signatures with Proactive Refresh.
            </Text>
            <Text fontSize={20}>
              Accountable Threshold Signatures with Proactive Refresh were first
              described by Dan Boneh, cryptography researcher and professor at
              Stanford University. It is a way for a quorum of members of an
              organization to securely sign messages. Unlike previous secret
              sharing schemes, the scheme we implement refreshes signers&apos;
              secrets once every 30 seconds, ensuring that an adversary must
              compromise all signers&apos; keys within a 30-second window in order to
              mount a successful attack. This is significantly more secure than
              previous signature schemes.
            </Text>
          </Box>
          <HStack gap={3} fontSize={20}>
            <Text>
              Read the paper <Link href='https://eprint.iacr.org/2022/1656.pdf'>here</Link>.
            </Text>
            <Text>
              Library source <Link href='https://github.com/lyronctk/ats-pr-bls'>code</Link>.
            </Text>
            <Text>
              Frontend source <Link href='https://github.com/nathanhleung/ats-pr-bls-frontend'>code</Link>.
            </Text>
          </HStack>
        </Box>
        <Box
          pt={15}
          borderRadius={10}
          backgroundColor='#237597'
          width={200}
          height={80}
          textAlign='center'
        >
          {`Our safe ->`}
        </Box>
      </main>
    </div >
  )
}
