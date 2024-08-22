export default async function NetworkDetails() {
  let accountsArray;
  let accounts;

  const chainNames = {
    1: "Ethereum Mainnet",
    3: "Ropsten Testnet",
    4: "Rinkeby Testnet",
    5: "Goerli Testnet",
    42: "Kovan Testnet",
    56: "Binance Smart Chain Mainnet",
    97: "Binance Smart Chain Testnet",
    137: "Polygon Mainnet",
    80001: "Mumbai Testnet",
    43114: "Avalanche Mainnet",
    43113: "Avalanche Fuji Testnet",
    10268: "SurbhiSubnet",
    128123: "EtherLink ",
  };
  if (window.ethereum) {
    console.log("Metamask is installed");
    // setEthWindow(window.ethereum);
  }

  if (window.ethereum) {
    accountsArray = await window.ethereum.request({
      method: "eth_accounts",
    });
    // setAcc(accountsArray[0]);
    console.log(accountsArray[0]);
  }

  if (window.ethereum) {
    accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // setAcc(accounts[0]);
  }
  try {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.BrowserProvider(window.ethereum);

    // // Get the signer
    // const signer = await provider.getSigner();
    // console.log(tokenAbi);

    let blockchainID = parseInt(
      await window.ethereum.request({ method: "eth_chainId" })
    );
    console.table(parseInt(blockchainID));

    let blockchainName = chainNames[blockchainID];

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.

    console.log("The blockchain id is : " + parseInt(blockchainID));
    // console.log(blockchainName);

    return { blockchainID, blockchainName };
  } catch (error) {
    console.error("User rejected the request:", error);
  }
}
