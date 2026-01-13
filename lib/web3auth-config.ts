import { WEB3AUTH_NETWORK } from "@web3auth/auth";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "BMaurjDP5MB6_7k7Cg9O8a7OpuAYfPov7EKZ1HEXwFIkLZXgsmrnpDMnZLk5Fk0MTjzyERvyTmB6egpSyPv_qhU"; // get from https://dashboard.web3auth.io

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  }
};

export default web3AuthContextConfig;