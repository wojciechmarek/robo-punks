import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import roboPunksNFT from "../RoboPunksNTF.json";

const roboPunksNFTAddress = "sefser";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log(
          "🚀 ~ file: MainMint.jsx ~ line 23 ~ handleMint ~ response",
          response
        );
      } catch (error) {
        console.log(
          "🚀 ~ file: MainMint.jsx ~ line 30 ~ handleMint ~ error",
          error
        );
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div>
      <h1>RoboPunks</h1>
      <p>It's 2077. Can the RoboPunks save humans from aliens? </p>
      {isConnected ? (
        <>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint Now</button>
        </>
      ) : (
        <p>You must be connected to Mint.</p>
      )}
    </div>
  );
};

export default MainMint;
