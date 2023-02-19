import { Container, Text } from '@chakra-ui/react';
import { NextPage } from 'next';

const Vault: NextPage = () => {
  return (
    <>
      <Container textAlign='center' py={10} px={10} maxW='1200px'>
        <Text as='h1'>The Vault</Text>
      </Container>
    </>
  );
};
export default Vault;
