import React from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants";

declare let window: any;

export function installComprobation() {
  const { ethereum } = window;
  return ethereum && ethereum.isMetaMask;
}

export function convertAnswersToIds(userAnswers: string[]) {
  let answersId: number[] = [];
  userAnswers.forEach((answer) => {
    if (answer === "Opt1") answersId.push(1);
    if (answer === "Opt2") answersId.push(2);
    if (answer === "Opt3") answersId.push(3);
  });
  return answersId;
}

export async function submitSurvey(userAnswers) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    let answersId = convertAnswersToIds(userAnswers);
    const tx = await contract.submit(1, answersId);
    tx.wait();
  } catch (error: any) {
    if (error.message.includes("Cooldown period not finished")) {
      alert("You have to wait 24 hours to submit another survey");
    }
  }
}

export function networkName(chainId) {
  switch (chainId) {
    case "0x1":
      return "Mainnet";
    case "0x3":
      return "Ropsten";
    case "0x4":
      return "Rinkeby";
    case "0x5":
      return "Goerli Test Network";
    case "0x42":
      return "Kovan";
    case "0x56":
      return "Binance Smart Chain";
    case "0x97":
      return "Binance Smart Chain Testnet";
    case "0x137":
      return "Matic";
    case "0x80001":
      return "Matic Testnet";
    default:
      return "Unknown";
  }
}

export function isConnected() {
  return window.ethereum.isConnected();
}
