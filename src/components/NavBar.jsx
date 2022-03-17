import React from "react";
import Connected from "./Connected";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  const connectAccount = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  };

  return (
    <div>
      <div>Facebook</div>
      <div>Twitter</div>
      <div>Email</div>

      <div>About</div>
      <div>Mint</div>
      <div>Team</div>

      {isConnected ? (
        <Connected />
      ) : (
        <button onClick={connectAccount}>Connect Wallet</button>
      )}
    </div>
  );
};

export default NavBar;
