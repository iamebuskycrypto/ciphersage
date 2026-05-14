import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY ?? '';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.25',
    settings: {
      evmVersion: 'cancun',   // required for CoFHE transient storage
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    'arb-sepolia': {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: 421614,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  paths: {
    sources:   './contracts',
    artifacts: './artifacts',
    cache:     './cache',
  },
};

export default config;
