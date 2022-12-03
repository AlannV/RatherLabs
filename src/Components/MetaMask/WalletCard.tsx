import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "antd";

import { Card } from "antd";
import { networkName } from "../../Redux/Actions/index";

declare let window: any;
declare let accountChangedHandler: any;
declare let getUserBalance: any;

function WalletCard() {
  const [errorMsg, setErrorMsg] = useState("");
  const [defaultAcc, setDefaultAcc] = useState("");
  const [connBtnText, setConnBtnText] = useState("Connect To MetaMask");
  const [network, setNetwork] = useState("");
  const [balance, setBalance] = useState("");

  // const balance = useSelector((state: any) => state.userBalance);

  const connectionWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res: any) => {
          accountChangedHandler(res[0]);
        });
      setNetwork(networkName(window.ethereum.chainId));
    } else {
      setErrorMsg("Please install MetaMask");
    }
  };

  const networkSwitchHandler = () => {
    (async () => {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
        setNetwork("Goerli Test Network");
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x5",
                  chainName: "Goerli Test Network",
                  nativeCurrency: {
                    name: "Goerli ETH",
                    symbol: "goETH",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc.slock.it/goerli"],
                  blockExplorerUrls: ["https://goerli.etherscan.io"],
                },
              ],
            });
          } catch (addError) {
            setErrorMsg("Error adding network to MetaMask");
          }
        }
      }
    })();
  };

  const accountChangedHandler = (acc: any) => {
    setDefaultAcc(acc);
    getUserBalance(acc);
  };

  const getUserBalance = (address: any) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((res: any) => {
        setBalance(ethers.utils.formatEther(res));
      });
  };

  useEffect(() => {}, [balance]);

  return (
    <Card hoverable style={{ width: 480 }}>
      {defaultAcc === "" ? (
        <Button onClick={connectionWalletHandler}>{connBtnText}</Button>
      ) : (
        <div className="wallet-container">
          <h2>Connected to metamask wallet</h2>
          <p>
            <b>Address : </b>
            {defaultAcc}
          </p>
          <p>
            <b>Balance : </b>
            {balance}
            <b> ETH</b>
          </p>
          <b>Network : </b>
          {network}
          {network !== "Goerli Test Network" ? (
            <Button onClick={networkSwitchHandler}>Switch to Goerli</Button>
          ) : null}
        </div>
      )}
    </Card>
  );
}

export default WalletCard;
