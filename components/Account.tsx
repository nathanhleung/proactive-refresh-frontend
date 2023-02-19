import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import { Button, Card, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { abridgeKey } from '@config/demo';

export function Account() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  if (isConnected) {
    return (
      <Center my={2}>
        <Card
          alignContent={'center'}
          alignItems={'center'}
          padding='2'
          width={80}
          background='gray.800'
          style={{ color: 'white' }}
          variant='outline'
        >
          <VStack gap={1}>
            <Text fontWeight='bold'>
              {connector ? `Connected to ${connector.name}` : 'Not connected'}
            </Text>
            <Text>Account: {abridgeKey(address)}</Text>
            <Text>Network ID: {`${chain?.id}`}</Text>
            <Button
              onClick={() => disconnect()}
              colorScheme='teal'
              background='teal.800'
            >
              Disconnect
            </Button>
          </VStack>
        </Card>
      </Center>
    );
  }

  return (
    <>
      <Center>
        <HStack gap={2}>
          {connectors.map((connector) => (
            <Button
              colorScheme='teal'
              background='teal.800'
              my={4}
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </Button>
          ))}
        </HStack>
      </Center>
      {error && <div>{error.message}</div>}
    </>
  );
}
