"use client";

import Image from "next/image";
import { CgGames } from "react-icons/cg";
import { SiRiotgames, SiAmazongames } from "react-icons/si";
import { GiWantedReward } from "react-icons/gi";
import { useState } from "react";
import AuctionCard from "@/Components/AuctionCard";
import Betting from "@/Components/Betting";
import HighestBidder from "@/Components/HighestBidder";
import BoughtCard from "@/Components/BoughtCard";
import SellCard from "@/Components/SellCard";

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

  return (
    <div className="bg-black mt-2">
      <div className="flex justify-center">
        <h1 className="text-4xl">Defi Kingdon Game</h1>
      </div>
      <div className="m-5 ">
        <div className="">
          <p>
            Your Account{" "}
            <span className="text-yellow-400">
              0x00000000000000000000000000000
            </span>
          </p>
          <div className=" ">
            {" "}
            <p>Your Balance : 0</p>
          </div>
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
      </div>

      {showAuction && (
        <div className="grid grid-cols-4 mt-24">
          <div className="col-span-3 m-5">
            <div>
              <p>
                Your Address :{" "}
                <span className="text-lg text-yellow-400">
                  {" "}
                  0x161aBA4657174De9a36C3Ee71bC8163118d88d43
                </span>
              </p>
            </div>
            <div>
              <p>Your Balance : 100</p>
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
              <AuctionCard />
            </div>
            <div>
              <HighestBidder />
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
          <div className="flex gap-x-10 mx-5 my-5">
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
          <div className="flex gap-x-10 mx-5 my-5">
            <SellCard />
            <SellCard />
          </div>
        </div>
      )}
    </div>
  );
}
