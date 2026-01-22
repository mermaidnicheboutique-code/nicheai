#!/usr/bin/env python3
"""
Simple IBM Cloud Deployment for NicheAI Next.js App
Non-interactive deployment script
"""

import os
import subprocess
import sys

def run_cmd(command, description):
    print(f"🔧 {description}...")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        print("✅ Success!")
        return True, result.stdout
    else:
        print("❌ Failed!")
        print(f"Error: {result.stderr}")
        return False, result.stderr

def main():
    # Check IBM Cloud API key
    ibm_cloud_key = os.environ.get('IBM_CLOUD_API_KEY')
    if not ibm_cloud_key:
        print("❌ IBM_CLOUD_API_KEY environment variable not set.")
        return

    print("✅ IBM Cloud API key found")

    # Check IBM Cloud CLI
    success, _ = run_cmd("ibmcloud --version", "Checking IBM Cloud CLI")
    if not success:
        print("❌ IBM Cloud CLI not found. Please install it first.")
        return

    print("✅ IBM Cloud CLI found")

    # Login to IBM Cloud
    success, _ = run_cmd(f"ibmcloud login --apikey {ibm_cloud_key} -r us-south", "Logging into IBM Cloud")
    if not success:
        print("❌ IBM Cloud login failed. Check your API key.")
        return

    print("✅ Logged into IBM Cloud")

    # Target region and resource group for Code Engine
    success, _ = run_cmd("ibmcloud target -r us-south -g Default", "Targeting region and resource group")
    if not success:
        print("❌ Failed to target region and resource group")
        return

    # Target Code Engine project
    success, _ = run_cmd("ibmcloud ce project target --name quantum-ai-project", "Targeting Code Engine project")
    if not success:
        print("❌ Failed to target Code Engine project")
        return

    print("📄 Preparing Code Engine deployment")

    # Deploy
    print("\n🚀 Deploying to IBM Cloud...")
    print("This may take 5-10 minutes...")

    success, output = run_cmd("ibmcloud ce application create --name nicheai-final --source . --port 3000 --cpu 0.125 --memory 0.25G --env NODE_ENV=production --min-scale 1 --max-scale 1", "Deploying NicheAI")

    if not success:
        print("❌ Deployment failed!")
        return

    # Get URL
    success, app_info = run_cmd("ibmcloud ce application get --name nicheai-final --output url", "Getting app URL")

    app_url = app_info.strip() if success else "https://nicheai-final.<project-id>.us-south.codeengine.appdomain.cloud"  # fallback

    # Success!
    print("\n" + "="*60)
    print("🎊 NICHEAI DEPLOYMENT COMPLETE!")
    print("="*60)
    print(f"🌐 URL: {app_url}")
    print()
    print("⚛️ Your NicheAI app is LIVE on IBM Cloud!")
    print("🤖 Advanced AI ecosystem integration active")
    print()
    print("💬 Test endpoints:")
    print("• '/' - Main application")
    print("• '/api/*' - API routes")
    print()
    print("📊 Monitor: ibmcloud ce application logs --name nicheai-final")
    print("="*60)

if __name__ == "__main__":
    main()