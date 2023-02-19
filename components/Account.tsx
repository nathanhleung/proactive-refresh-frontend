import {
    useAccount,
    useConnect,
    useDisconnect,
    useNetwork,
   } from 'wagmi'
import {Button, Card, Text } from '@chakra-ui/react'
   
   export function Account() {
    const { address, connector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()
    const { chain } = useNetwork()
   
    if (isConnected) {
        return (
            <Card
            alignContent={'center'}
            alignItems={'center'}
            padding='2'
            width={80}>
            {connector ? `Connected to ${connector.name}` : 'Not connected'}
            <Text>
                Account: {`${address?.slice(0,5)}...${address?.slice(-3)}`} | 
                Network ID: {`${chain?.id}`}
            </Text>
            <Button 
            onClick={() => disconnect()}>Disconnect</Button>
            </Card>
        )
    }
   
    return (
    <div color ='white'>
            {connectors.map((connector) => (
            <Button
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
   
    {error && <div>{error.message}</div>}
    </div>
    )
   }
   