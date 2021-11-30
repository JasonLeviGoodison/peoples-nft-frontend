import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from 'react-bootstrap';

const WalletCard = ({setConnectedWallet}) => {
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
    setConnectedWallet(newAccount);
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
    <div>
      {defaultAccount == null && 
        <div className="walletCard">
          <h1>Connect to MetaMask</h1>
          <Button onClick={connectWalletHandler}>Connect</Button>
          {errorMessage}
        </div>
      }
    </div>
  );
}

export default WalletCard;