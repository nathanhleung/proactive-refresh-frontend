import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import { Button, Card, Center, HStack, Text } from '@chakra-ui/react';
import { abridgeKey } from '@config/demo';

export function Account() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  if (isConnected) {
    return (
      <Card
        alignContent={'center'}
        alignItems={'center'}
        padding='2'
        width={80}
      >
        {connector ? `Connected to ${connector.name}` : 'Not connected'}
        <Text>
          Account: {abridgeKey(address)} | Network ID: {`${chain?.id}`}
        </Text>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </Card>
    );
  }

  return (
    <>
      <Center>
        <HStack gap={2}>
          {connectors.map((connector) => (
            <Button
              colorScheme='teal'
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
