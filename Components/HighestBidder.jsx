"use client";

import { useState } from "react";
import DefiContractConnection from "@/app/Functionality/ContractConnection";

export default function HighestBidder({
  tokenID,
  seller,
  amount,
  address,
  time,
}) {
  const [showDropDown, setShowDropDown] = useState(false);

  const getHighestBidderDetails = async () => {
    const contractInstance = await DefiContractConnection();

    // contractInstance.
  };

  return (
    <div className="my-5 ">
      <div className="" onClick={() => setShowDropDown(!showDropDown)}>
        <div className="flex justify-between items-center my-2  border-b-2 border-yellow-100 hover:bg-gray-700">
          <div>
            <p
              className={`font-bold mr-2 text-white
                    `}
            >
              {tokenID ? tokenID : 0}
            </p>
          </div>

          <div>
            <p className="text-gray-600 font-extralight text-sm">
              {seller ? seller : "0x161aBA4657174De9a36C3Ee71bC8163118d88d43"}
            </p>
          </div>
          <div className="justify-end text-gray-400 ml-8 mr-8">
            <p className="text-white text-md">{time}</p>
          </div>
        </div>
      </div>

      {showDropDown && (
        <div className="">
          <div className="flex align-middle">
            <div>
              <p className="text-yellow-400 font-bold text-md ">{name}</p>
              <p className="text-gray-600  text-md">
                <span className="text-white">Address </span>:{address}
              </p>
              <p className="text-gray-600  text-md">
                <span className="text-white">amount </span>:
                {amount ? parseInt(amount) : "100xxx"}
              </p>
              <p className="text-yellow-400 font-bold text-md ">
                On: {time ? time : 32} sec
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
