import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('\n🔐 CipherSage CoFHE Contract Deployment');
  console.log('═══════════════════════════════════════');
  console.log('Deployer :', deployer.address);
  console.log('Network  :', (await ethers.provider.getNetwork()).name);
  console.log('Chain ID :', (await ethers.provider.getNetwork()).chainId);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Balance  :', ethers.formatEther(balance), 'ETH');
  console.log('');

  if (balance === 0n) {
    console.error('❌ No ETH in deployer wallet. Get Arbitrum Sepolia ETH from:');
    console.error('   https://faucet.quicknode.com/arbitrum/sepolia');
    console.error('   https://www.alchemy.com/faucets/arbitrum-sepolia');
    process.exit(1);
  }

  console.log('⏳ Deploying CipherSageCoFHE...');
  const Factory = await ethers.getContractFactory('CipherSageCoFHE');
  const contract = await Factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log('');
  console.log('✅ CONTRACT DEPLOYED SUCCESSFULLY!');
  console.log('═══════════════════════════════════════');
  console.log('Contract Address:', address);
  console.log('Explorer        :', `https://sepolia.arbiscan.io/address/${address}`);
  console.log('');
  console.log('📋 NEXT STEP — paste this into src/lib/contract.ts:');
  console.log('');
  console.log(`export const TRACKER_ADDRESS = '${address}' as \`0x\${string}\`;`);
  console.log('');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
