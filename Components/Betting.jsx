import { BsCurrencyExchange } from "react-icons/bs";
export default function Betting({
  setName,
  setPerTokenAmount,
  addNewMarketPlace,
}) {
  return (
    <div className=" bg-black text-white grid grid-cols-2 m-5">
      <form className="grid bg-black px-20 py-10  col-start-1 col-end-3 rounded-xl">
        <div className="flex justify-center mb-2">
          <p className="text-[1rem] font-bold text-yellow-500 text-transparent">
            Bet Your Gaming Tokens
          </p>
        </div>
        <label className="grid col-start-1 col-end-1 ">
          Enter the amount of Tokens
        </label>
        <input
          type="number"
          className="text-white w-full  p-5 rounded-md my-5 border-yellow-400 border-2 bg-transparent focus:border-yellow-400 focus:text-white focus:outline-none"
          placeholder="Enter the token you want to bet"
        />
      </form>

      <div className="flex justify-center col-span-2 items-center py-5">
        <button className="bg-gradient-to-r from-rose-500 to-indigo-600 rounded-lg px-8 py-2">
          Bet Token
          <BsCurrencyExchange className="inline-block text-4xl m-2" />
        </button>
      </div>
    </div>
  );
}
