const { createWalletClient, http } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');

// The message you need to sign for OP Atlas verification
const message = "I verify that my contracts are for Project 0x647deb523381917ea613c4a9e4f35c516402793a0bba4826f59eb6c5efb27a73 and I'm an optimist.";

async function signAtlasVerification() {
  // You'll need to provide your private key here
  // IMPORTANT: Never share your private key - this is just for local signing
  const privateKey = process.env.PRIVATE_KEY; // Set this environment variable

  if (!privateKey) {
    console.error('Please set your PRIVATE_KEY environment variable');
    console.error('Example: export PRIVATE_KEY=0x...');
    return;
  }

  try {
    // Create account from private key
    const account = privateKeyToAccount(privateKey);

    // Create wallet client
    const walletClient = createWalletClient({
      account,
      transport: http()
    });

    // Sign the message
    const signature = await walletClient.signMessage({ message });

    console.log('Message to sign:', message);
    console.log('Signer address:', account.address);
    console.log('Signature:', signature);

    // The signature hash is just the signature itself
    console.log('\n=== COPY THIS SIGNATURE FOR OP ATLAS VERIFICATION ===');
    console.log(signature);
    console.log('=============================================================');

  } catch (error) {
    console.error('Error signing message:', error);
  }
}

signAtlasVerification();