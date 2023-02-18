import { configureChains, createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [
    {
      id: 7001,
      name: "Zetachain Athens 2",
      nativeCurrency: {
        name: "Zeta",
        symbol: "ZETA",
        decimals: 18,
      },
      network: "",
      rpcUrls: {
        public: { http: ["https://api.athens2.zetachain.com/evm"] },
        default: { http: ["https://api.athens2.zetachain.com/evm"] },
      },
    },
  ],
  [publicProvider()]
);

const client = createClient({
  // https://ethereum.stackexchange.com/questions/133612/error-hydration-failed-because-the-initial-ui-does-not-match-what-was-rendered
  autoConnect: false,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

export { client as wagmiClient };
