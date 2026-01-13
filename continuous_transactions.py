#!/usr/bin/env python3
"""
Continuous Transaction Sender for Niche Network
Uses Luxbin AI to generate transaction data and send to the local testnet
"""

import subprocess
import time
import random
import sys
import os

# Add the project root to Python path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import AI components (adjust based on your actual AI modules)
try:
    from aurora_conversation import AuroraAI  # Emotional AI
    from atlas_ai import AtlasAI  # Strategic AI
except ImportError:
    print("AI modules not found. Please ensure aurora_conversation.py and atlas_ai.py exist.")
    AuroraAI = None
    AtlasAI = None

# Testnet configuration
RPC_URL = "http://localhost:8545"
PRIVATE_KEY = "0xd9fb56b9574ed61ab0478a607166eeb3a80b1b91ab1bf00f45932105d07b5e11"
FROM_ADDRESS = "0x5D284fe6D6AEb73857960a0D041CF394b1198392"

# Sample recipient addresses (you can add more)
RECIPIENTS = [
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
    "0x742d35Cc633FBc12d3f6b5a7b6b5b5b5b5b5b5b5",  # Example addresses
    "0x1234567890123456789012345678901234567890",
]

def generate_random_address():
    """Generate a random Ethereum address for testing"""
    return "0x" + "".join(random.choice("0123456789abcdef") for _ in range(40))

def get_ai_transaction_data():
    """Use Luxbin AI to generate transaction data"""
    if AuroraAI and AtlasAI:
        try:
            # Initialize AI agents
            aurora = AuroraAI()
            atlas = AtlasAI()

            # Get AI insights
            aurora_response = aurora.generate_response("Suggest a creative transaction message")
            atlas_response = atlas.analyze("What transaction should we send next?")

            # Combine AI responses for transaction data
            ai_data = f"Aurora: {aurora_response[:50]} | Atlas: {atlas_response[:50]}"
            return ai_data
        except Exception as e:
            print(f"AI error: {e}")
            return f"AI Transaction {random.randint(1, 1000)}"
    else:
        return f"AI Transaction {random.randint(1, 1000)}"

def send_transaction(to_address, value_wei, data=""):
    """Send a transaction using cast"""
    try:
        cmd = [
            "cast", "send",
            "--rpc-url", RPC_URL,
            "--private-key", PRIVATE_KEY,
            to_address,
            "--value", str(value_wei),
        ]

        if data:
            cmd.extend(["--data", data])

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        if result.returncode == 0:
            # Extract transaction hash from output
            lines = result.stdout.strip().split('\n')
            for line in lines:
                if 'transactionHash' in line:
                    tx_hash = line.split()[-1]
                    return True, tx_hash
            return True, "Transaction sent (hash not found in output)"
        else:
            return False, result.stderr.strip()

    except subprocess.TimeoutExpired:
        return False, "Transaction timed out"
    except Exception as e:
        return False, str(e)

def main():
    print("🚀 Starting Continuous Transaction Sender on Niche Network")
    print("Press Ctrl+C to stop\n")

    transaction_count = 0

    try:
        while True:
            # Generate AI data for transaction
            ai_data = get_ai_transaction_data()

            # Choose random recipient
            to_address = random.choice(RECIPIENTS + [generate_random_address()])

            # Random small value (1-10 wei)
            value = random.randint(1, 10)

            print(f"📤 Sending transaction #{transaction_count + 1}")
            print(f"   To: {to_address}")
            print(f"   Value: {value} wei")
            print(f"   AI Data: {ai_data}")

            # Send transaction
            success, result = send_transaction(to_address, value, ai_data)

            if success:
                print(f"   ✅ Success: {result}")
            else:
                print(f"   ❌ Failed: {result}")

            transaction_count += 1
            print()

            # Wait before next transaction (adjust as needed)
            time.sleep(5)  # 5 seconds between transactions

    except KeyboardInterrupt:
        print(f"\n🛑 Stopped after {transaction_count} transactions")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()