import { useState, useEffect } from "react";
import { Button } from "@/utils/ui/button";
import { bet, getOddsRate } from "@/utils/lotteryWeb3";

interface NumberCardProps {
  num: number | null;
  index: number;
  answer: boolean;
  state: string;
}

export function NumberCard({ num, index, answer, state }: NumberCardProps) {
  const [flipped, setFlipped] = useState(true);
  const [bettingRate, setBettingRate] = useState<{
    true: number;
    false: number;
  }>({ true: 0, false: 0 });
  console.log("numbercard");

  useEffect(() => {
    setFlipped(state === "게임 종료" || num === 0 ? true : false);
  }, [state, num]);

  useEffect(() => {
    if (!num) return;
    if (state !== "게임 진행 중") return;

    getRate(num);

    return () => {};
  }, [num, state]);

  async function getRate(num: number) {
    const rate_true: BigInt = await getOddsRate(index, true);
    const rate_false: BigInt = await getOddsRate(index, false);
    setBettingRate({ true: Number(rate_true), false: Number(rate_false) });
  }

  return (
    <div
      className={`perspective-1000 w-[268px] h-[280px] max-w-md p-8 rounded-lg shadow-lg ${
        flipped && answer === true && "bg-green-500 dark:bg-green-600"
      } ${flipped && answer === false && "bg-red-600"}`}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="card-face absolute inset-0  w-full h-full backface-hidden">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="font-bold text-gray-900 text-8xl dark:text-gray-50">
              {num}
            </div>
            <div className="flex items-center justify-between w-full mt-6">
              <div className="flex flex-col items-center">
                <Button
                  className="w-full h-full py-[5px] text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:text-gray-50 dark:hover:bg-green-700"
                  size="sm"
                  variant="outline"
                  onClick={() => bet(index, true)}
                >
                  찬성
                </Button>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  베팅액: $100
                  <br />
                  배당율: {bettingRate.true / 100}배
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Button
                  className="w-full h-full py-[5px] text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:text-gray-50 dark:hover:bg-red-700"
                  size="sm"
                  variant="outline"
                  onClick={() => bet(index, false)}
                >
                  반대
                </Button>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  베팅액: $50
                  <br />
                  배당율: {bettingRate.false / 100}배
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`card-face absolute w-full h-full backface-hidden rotate-y-180`}
        >
          <div className={`flex flex-col items-center justify-center h-full`}>
            <div className="font-bold text-gray-900 text-3xl dark:text-gray-50">
              {num}
            </div>
            <div className="mt-2 text-m text-white dark:text-white">
              {String(answer)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
