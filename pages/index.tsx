import styles from "@/styles/Home.module.css";
import { Heading, Text, Container, Divider, Link, Box } from '@chakra-ui/react'

export default function Home() {
  
  return (
    <>
    <Container
      padding={80}>

      <Heading fontSize={40}>
      [INSERT NAME]
        <Divider/>
      
        Enterprise-grade custody and authentication.
        <Text fontSize={18} fontWeight={300}>
            The safest and most secure way to transfer funds, sign messages,
            and protect what&apos;s most important to your organization.
            </Text>
        </Heading>
        <Container
          gap={10}
          display='flex'
          flexDirection='column'
          paddingTop={30}>

            <Text 
              fontWeight={600}
              fontSize={20}>Enabled by <></>Accountable Threshold Signatures with Proactive Refresh.</Text>
            
            <Text>
            Accountable Threshold Signatures with Proactive Refresh were first
            described by Dan Boneh, cryptography researcher and professor at
            Stanford University. It is a way for a quorum of members of an
            organization to securely sign messages. Unlike previous secret
            sharing schemes, the scheme we implement refreshes signers&apos;
            secrets once every 30 seconds, ensuring that an adversary must
            compromise all signers&apos; keys within a 30-second window in order to
            mount a successful attack. This is significantly more secure than
            previous signature schemes.

            Read the paper <Link href='https://eprint.iacr.org/2022/1656.pdf'>here</Link>.
            </Text>
        </Container>
        
        <Box>

        </Box> 
        
    </Container>
      
      
    </>
  )
}
