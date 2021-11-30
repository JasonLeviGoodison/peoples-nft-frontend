import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletCard = () => {
  const [userMessage, setUserMessage] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const connectWalletHandler = () => {
    if (typeof window.ethereum !== 'undefined') {
       // user has metamask
       window.ethereum.request({method: 'eth_requestAccounts'})
       .then(request => {
         accountChangeHandler(request[0]);
       })

    } else {
      setErrorMessage("Please install metamask first");
    }

  }

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  }

  const getUserBalance = (address) => {
    window.ethereum.request({method: "eth_getBalance", params: [address, 'latest']})
    .then(balance => {
      setUserBalance(ethers.utils.formatEther(balance));
    });
  }

  window.ethereum.on('accountsChanged', accountChangeHandler);

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });

  if (window.ethereum && window.ethereum.networkVersion !== '1') {
    // TODO: Uncomment: return <div>Please change to Mainnet</div>
  }

  return (
    <div className="walletCard">
      <h1>Connect to MetaMask</h1>
      <button onClick={connectWalletHandler}>Connect</button>
      <div className="accountDisplay">
        <h3> Address: {defaultAccount}</h3>
      </div> 
      <div className="balanceDisplay">
        <h3> Balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
}

export default WalletCard;