import { Card } from '@chakra-ui/react';
import { useSafeAddress, useSafeBalance, useSafeRead } from '@config/safe';
import useIsHydrated from '@hooks/useIsHydrated';
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import { useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function SafeInfo(props: any) {
  const isHydrated = useIsHydrated();

  const { sdk, connected, safe } = useSafeAppsSDK();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const safeAddress = useSafeAddress();
  const { data: balanceData, isLoading, isError } = useSafeBalance();
  const { data: thresholdData, isLoading: thresholdIsLoading } =
    useSafeRead('getThreshold');

  useEffect(() => {
    console.log({ balanceData, thresholdData, isLoading, isError });
  }, [balanceData, isError, isLoading, thresholdData]);

  if (!isHydrated) {
    return null;
  }

  return (
    <Card {...props}>
      Address: {safeAddress} Balance: {balanceData?.formatted}{' '}
      {balanceData?.symbol}, Threshold:{' '}
      {thresholdIsLoading ? 'Loading...' : thresholdData?.toString()}
    </Card>
  );
}
