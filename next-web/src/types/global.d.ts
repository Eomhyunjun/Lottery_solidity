import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
    lottery_con: any;
    local_web3: Web3;
    local_lottery_con: any;
  }
}
