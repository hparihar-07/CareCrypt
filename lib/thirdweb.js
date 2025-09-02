import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain, sepolia } from "thirdweb/chains";
import { inAppWallet, createWallet } from "thirdweb/wallets";

// ✅ Define your updated custom chain (chainId: 409)
export const carecryptChain = defineChain({
  id: 409,
  name: "CareCrypt",
  nativeCurrency: {
    name: "carecrypt",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://virtual.sepolia.eu.rpc.tenderly.co/62997854-6974-433f-8f14-c169acbffadc",
      ],
    }, // <-- Replace with your actual RPC URL
  },
});

// ✅ Thirdweb client using your project’s client ID
export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

// ✅ Get contract instance
export const contract = getContract({
  client,
  chain: sepolia,
  address: import.meta.env.VITE_CONTRACT_ADDRESS, // Replace with your deployed contract address
});

export const wallets = [inAppWallet({
  auth: {
    options: ["email", "google", "guest"],
  },
}),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),  
]