"use client";

import Image from "next/image";
import { CgGames } from "react-icons/cg";
import { SiRiotgames, SiAmazongames } from "react-icons/si";
import { GiWantedReward } from "react-icons/gi";
import { useState, useEffect } from "react";
import AuctionCard from "@/Components/AuctionCard";
import Betting from "@/Components/Betting";
import HighestBidder from "@/Components/HighestBidder";
import BoughtCard from "@/Components/BoughtCard";
import SellCard from "@/Components/SellCard";

//contract instance & Network Details

import DefiContractConnection from "./Functionality/ContractConnection";
import NetworkDetails from "./Functionality/NetworkDetails";

//Stone, Paper & Scissor
import { FaHandRock } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaHandScissors } from "react-icons/fa";

//robot
import { FaRobot } from "react-icons/fa";

//start
import { MdOutlineStart } from "react-icons/md";

//IPFS fetch from contract to get the data.

import ContractIPFSFetch from "./Functionality/contractIPFSFetch";

export default function Home() {
  //!show boolean states for auction
  //******************* Auction ********************** */
  const [showAuction, setShowAuction] = useState(false);

  //!showBetYourOwn
  const [showBetYourOwn, setShowBetYourOwn] = useState(false);

  //!show betting option
  const [showInput, setShowInput] = useState(false);

  //!sell your asset option
  const [showSellAsset, setShowSellAsset] = useState(false);

  //! play rock, paper and scissor

  const [showPlayGame, setShowPlayGame] = useState(false);

  //playerchoide

  const [playerChoice, setPlayerChoice] = useState();
  const [computerChoice, setComputerChoice] = useState(1);

  //contract data.

  const [tokenBalance, setTokenBalance] = useState();
  const [chainID, setChainID] = useState();
  const [chainName, setChainName] = useState();
  const [chainAccount, setChainAccount] = useState();

  // to get the current ongoing data.

  const [fetch, setFetch] = useState();
  const [seller, setSeller] = useState();
  const [tokenID, setTokenID] = useState();

  const [currentAucData, setCurrentAucData] = useState();

  //Functions of the contract.

  const getUserTokenBalance = async () => {
    try {
      const contractInstance = await DefiContractConnection();
      const tokenBal = await contractInstance.getMybalance();
      setTokenBalance(parseInt(tokenBal));
    } catch (error) {
      console.log("Something wrong" + error);
    }
  };

  //get Network details from window.etherem.request method
  const getNetworkDetails = async () => {
    const { blockchainID, blockchainName, accounts } = await NetworkDetails();
    setChainID(blockchainID);
    setChainName(blockchainName);
    setChainAccount(accounts[0]);

    console.log(blockchainID, blockchainName);
    console.log("The accounts is : " + accounts[0]);
  };

  //to know about current ongoing auction

  const ongoingAuction = async () => {
    console.log("this is working");
    const contractInstance = await DefiContractConnection();
    const auction = await contractInstance.currentAuction();

    console.log("current auction : " + auction);
    setFetch([auction.URI]);
    setSeller(auction.seller);
    setTokenID(auction.NFTID);
  };

  const getIPFSData = async () => {
    // res is an array having only one element
    const res = await ContractIPFSFetch(fetch);
    setCurrentAucData(res[0]);
    console.log("The result from ipfs is : " + res[0]);
  };

  //converting image ipfs://hash to ipfs.io/ipfs/hash

  const getImage = (ipfsURL) => {
    const hash = ipfsURL.split("ipfs://")[1];
    return `https://ipfs.io/ipfs/${hash}`;
  };

  if (fetch !== undefined) {
    getIPFSData();
  }

  useEffect(() => {
    getUserTokenBalance();
    getNetworkDetails();
    ongoingAuction();
  }, []);

  return (
    <div className="bg-black mt-2">
      <div className="flex justify-center">
        <h1 className="text-4xl">Defi Kingdon Game</h1>
      </div>
      <div className="m-5 ">
        <div className="">
          <p className="text-2xl">
            Your Account <span className="text-yellow-400">{chainAccount}</span>
          </p>
          <div className="text-2xl ">
            {" "}
            <p>
              Your Balance :{" "}
              <span className="text-yellow-400">
                {tokenBalance ? tokenBalance : 0}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-2xl">
            Network Name:
            <span className="text-2xl text-yellow-400">
              {" "}
              {chainName ? chainName : 0}
            </span>
          </p>
        </div>
        <div>
          <p className="text-2xl">
            Network Chain ID:
            <span className="text-2xl text-yellow-400">
              {" "}
              {chainID ? chainID : 0}
            </span>
          </p>
        </div>
        <div className="justify-end flex">
          <button className="px-5 py-2 bg-gradient-to-r from-cyan-300 to-indigo-600 rounded-md text-black hover:scale-90 transition-all duration-300">
            Collect Your Reward
            <GiWantedReward className="inline-block text-4xl" />
          </button>
        </div>
      </div>

      <div className="m-5 flex gap-6 justify-center">
        <button
          className="px-5 py-2 bg-yellow-400 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setShowAuction(!showAuction)}
        >
          Play Auction Game
          <CgGames className="text-4xl inline-block m-2" />
        </button>
        <button
          className="px-5 py-2 bg-yellow-400 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setShowBetYourOwn(!showBetYourOwn)}
        >
          Bet Your Game Asset
          <SiRiotgames className="inline-block m-2 text-4xl" />
        </button>
        <button
          className="px-5 py-2 bg-yellow-400 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setShowSellAsset(!showSellAsset)}
        >
          Sell Your Asset
          <SiAmazongames className="inline-block m-2 text-4xl" />
        </button>
        <button
          className="px-5 py-2 bg-yellow-400 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setShowPlayGame(!showPlayGame)}
        >
          Play Stone Paper Scissor
          <FaRobot className="inline-block m-2 text-4xl" />
        </button>
      </div>

      {showAuction && (
        <div className="grid grid-cols-4 mt-24">
          <div className="col-span-3 m-5">
            <div>
              <p>
                Your Address :{" "}
                <span className="text-lg text-yellow-400"> {chainAccount}</span>
              </p>
            </div>
            <div>
              <p>Your Balance : {tokenBalance}</p>
            </div>
            {!showInput && (
              <div className="flex justify-center gap-x-5">
                <button
                  className="px-6 py-4 bg-yellow-400 rounded-xl text-black"
                  onClick={() => setShowInput(!showInput)}
                >
                  Enter Betting...
                </button>
                <button
                  className="px-6 py-4 bg-yellow-400 rounded-xl text-black"
                  onClick={() => setShowInput(!showInput)}
                >
                  Show Highest Bidder
                </button>
              </div>
            )}
            {showInput && (
              <div>
                <Betting />
              </div>
            )}
          </div>
          <div className="cols-start-4 cols-end-4">
            <div className="m-5">
              <p className="text-2xl flex justify-center text-yellow-400">
                Currently OnGoing Auction
              </p>
            </div>
            <div className="flex justify-center">
              {" "}
              <AuctionCard
                itemName={currentAucData.name}
                itemSrc={getImage(currentAucData.image)}
                itemDescription={currentAucData.description}
                itemPrice={currentAucData.price}
              />
            </div>
            <div>
              <HighestBidder itemSeller={seller} itemTokenID={tokenID} />
            </div>
          </div>
        </div>
      )}

      {showBetYourOwn && (
        <div>
          <div>
            <p className="text-yellow-400 text-5xl my-5 flex justify-center">
              Bet Your Own Game Asset
            </p>
          </div>
          {/* //Need all the Assets that i have. */}
          <div className="flex flex-wrap gap-10  mx-5 my-5">
            <BoughtCard />
            <BoughtCard />
            <BoughtCard />
            <BoughtCard />
            <BoughtCard />
            <BoughtCard />
            <BoughtCard />
            <BoughtCard />
            <BoughtCard />
            <BoughtCard />
          </div>
        </div>
      )}

      {showSellAsset && (
        <div>
          <div className="flex justify-center">
            <p className="text-3xl text-yellow-400">
              Sell Your Own Gaming Assets
            </p>
          </div>
          <div className="flex gap-x-10 mx-5 my-5">
            <SellCard />
            <SellCard />
          </div>
        </div>
      )}

      {showPlayGame && (
        <div>
          <div className="inline-block w-1/2">
            <form className="grid bg-black px-20 py-10  col-start-1 col-end-3 rounded-xl">
              <div className="flex justify-center mb-2">
                <p className="text-[2rem] font-bold text-yellow-500 text-transparent">
                  Rock, Paper,Scissor Game
                </p>
              </div>
              <label className="grid col-start-1 col-end-1 ">
                Enter your choice
              </label>

              <select
                className="text-white w-full  p-5 rounded-md my-5 border-yellow-400 border-2 bg-transparent focus:border-yellow-400 focus:text-white focus:outline-none"
                required
                placeholder="Enter Your Choice"
                onChange={(e) => setPlayerChoice(e.target.value)}
              >
                <option value={0}>Rock</option>
                <option value={1}>Paper</option>
                <option value={2}>Scissor</option>
              </select>
            </form>
            <div className="flex justify-center">
              <button className="px-8 py-2 bg-yellow-400 rounded-xl text-black">
                Play
                <MdOutlineStart className="inline-block text-3xl m-2 text-black" />
              </button>
            </div>
          </div>

          <div className="inline-block w-1/2">
            <div className="flex justify-between">
              <p className="text-yellow-400 text-3xl">Your Choice</p>
              <p className="text-yellow-400 text-3xl">Computer Choice</p>
            </div>
            <div className="flex justify-between mx-5">
              <div className="flex justify-start">
                {playerChoice == 0 ? (
                  <FaHandRock className="text-[12rem] rotate-90" />
                ) : playerChoice == 1 ? (
                  <FaHandPaper className="text-[12rem] rotate-90" />
                ) : (
                  <FaHandScissors className="text-[12rem] rotate-180" />
                )}
              </div>
              <div className="flex justify-end">
                {computerChoice == 0 ? (
                  <FaHandRock className="text-[12rem] -rotate-90" />
                ) : computerChoice == 1 ? (
                  <FaHandPaper className="text-[12rem] -rotate-90" />
                ) : (
                  <FaHandScissors className="text-[12rem] rotate-180" />
                )}
              </div>
            </div>
            <div className=" flex justify-center">
              <p className="text-yellow-400 text-4xl ">You Win</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
