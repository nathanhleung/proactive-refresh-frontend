import { useBalance, useContractRead } from 'wagmi';
import gnosisSafeJson from '../data/abis/GnosisSafe.json';

function useSafeAddress() {
  return process.env.NEXT_PUBLIC_SAFE_ADDRESS;
}

function useSafeBalance(token?: string) {
  const address = useSafeAddress();

  return useBalance({
    // @ts-ignore
    address,
    ...(token
      ? {
          token,
        }
      : {}),
    chainId: 7001,
  });
}

function useSafeRead(functionName: string, args?: unknown[]) {
  const address = useSafeAddress();

  return useContractRead({
    // @ts-ignore
    address,
    abi: gnosisSafeJson.abi,
    functionName,
    args,
    chainId: 7001,
  });
}

export { useSafeAddress, useSafeRead, useSafeBalance };
